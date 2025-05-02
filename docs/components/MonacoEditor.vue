<template>
    <div class="monaco-editor-container">
      <div class="editor-header">
        <h3>TypeScript Editor</h3>
      </div>
      <div class="editor-layout">
        <div ref="editorContainer" class="editor-container"></div>
        <div class="output-container">
          <div class="output-header">
            <div class="tabs">
              <button 
                class="tab-button" 
                :class="{ active: activeTab === 'output' }" 
                @click="activeTab = 'output'"
              >
                Output
              </button>
              <button 
                class="tab-button" 
                :class="{ active: activeTab === 'errors', 'has-errors': errors.length > 0 }" 
                @click="activeTab = 'errors'"
              >
                Errors <span v-if="errors.length > 0">({{ errors.length }})</span>
              </button>
            </div>
            <button class="run-button" @click="runCode">Run</button>
          </div>
          <div class="content-area">
            <div v-if="activeTab === 'output'" class="output">
              <pre>{{ output }}</pre>
            </div>
            <div v-else-if="activeTab === 'errors'" class="errors">
              <div v-if="errors.length === 0" class="no-errors">No errors</div>
              <div v-else class="error-list">
                <div v-for="(error, index) in errors" :key="index" class="error-item">
                  <div class="error-location">Line {{ error.lineNumber }}, Column {{ error.column }}</div>
                  <div class="error-message">{{ error.message }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import * as monaco from 'monaco-editor';
  import * as ts from 'typescript';
  
  export default defineComponent({
    name: 'MonacoEditor',
    props: {
      initialCode: {
        type: String,
        default: `// Type your TypeScript code here
  function greet(name: string): string {
    return \`Hello, \${name}!\`;
  }
  
  const message = greet("World");
  console.log(message);
  `
      }
    },
    setup(props) {
      const editorContainer = ref<HTMLElement | null>(null);
      const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null);
      const output = ref('');
      const errors = ref<{ lineNumber: number; column: number; message: string }[]>([]);
      const activeTab = ref('output');
      const editorInitialized = ref(false);
      
      const customConsole = {
        log: (...args: any[]) => {
          output.value += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\n';
        },
        error: (...args: any[]) => {
          output.value += '🛑 ' + args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\n';
        },
        warn: (...args: any[]) => {
          output.value += '⚠️ ' + args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\n';
        },
        info: (...args: any[]) => {
          output.value += 'ℹ️ ' + args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\n';
        },
        clear: () => {
          output.value = '';
        }
      };
  
      const safeTranspileTS = (code: string): ts.TranspileOutput => {
        try {
          return ts.transpileModule(code, {
            compilerOptions: {
              module: ts.ModuleKind.CommonJS,
              target: ts.ScriptTarget.ES2020,
              strict: true,
            },
            reportDiagnostics: true
          });
        } catch (err) {
          return {
            outputText: '',
            diagnostics: [{
              category: ts.DiagnosticCategory.Error,
              code: 9999,
              file: undefined,
              start: undefined,
              length: undefined,
              messageText: `Transpilation error: ${err instanceof Error ? err.message : String(err)}`
            }]
          };
        }
      };
  
      const transpileAndRunTS = (code: string) => {
        output.value = '';
        errors.value = [];
        
        const result = safeTranspileTS(code);
        output.value = '// Starting execution...\n';
  
        if (result.diagnostics?.length) {
          const hasErrors = result.diagnostics.some(d => d.category === ts.DiagnosticCategory.Error);
          if (hasErrors) {
            result.diagnostics.forEach(diagnostic => {
              if (diagnostic.category === ts.DiagnosticCategory.Error) {
                const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                if (diagnostic.file && diagnostic.start !== undefined) {
                  const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                  errors.value.push({
                    lineNumber: line + 1,
                    column: character + 1,
                    message
                  });
                } else {
                  errors.value.push({
                    lineNumber: 1,
                    column: 1,
                    message
                  });
                }
              }
            });
            activeTab.value = 'errors';
            return;
          }
        }
  
        if (!result.outputText?.trim()) {
          output.value += '// No code to execute.\n';
          return;
        }
  
        const originalConsole = window.console;
        try {
          (window as any).console = customConsole;
          const functionBody = `"use strict";\n${result.outputText}`;
          new Function(functionBody)();
        } catch (error: any) {
          output.value += `\n// Execution error: ${error.message}\n`;
        } finally {
          (window as any).console = originalConsole;
        }
      };
  
      const runCode = () => {
        if (editor.value) {
          transpileAndRunTS(editor.value.getValue());
        }
      };
  
      onMounted(async () => {
        if (editorInitialized.value || !editorContainer.value) return;
        
        await nextTick();
        
        try {
          editor.value = monaco.editor.create(editorContainer.value, {
            value: props.initialCode,
            language: 'typescript',
            theme: 'vs-dark',
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            tabSize: 2,
            lineNumbers: 'on'
          });
  
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            strict: true
          });
  
          editor.value.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
          output.value = '// Editor ready. Click "Run" to execute code.';
          editorInitialized.value = true;
        } catch (err) {
          output.value = `Editor init error: ${err instanceof Error ? err.message : String(err)}`;
        }
      });
  
      onBeforeUnmount(() => {
        if (editor.value) {
          editor.value.dispose();
        }
      });
  
      return {
        editorContainer,
        output,
        errors,
        activeTab,
        runCode
      };
    }
  });
  </script>

  
  <style scoped>
  .monaco-editor-container {
    border: 1px solid #ccc;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 600px;
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  .editor-header {
    background-color: #333;
    color: white;
    padding: 8px 12px;
    border-bottom: 1px solid #555;
  }
  
  .editor-header h3 {
    margin: 0;
    font-size: 1rem;
  }
  
  .editor-layout {
    display: flex;
    flex-direction: row;
    height: calc(100% - 40px);
  }
  
  .editor-container {
    flex: 6;
    height: 100%;
    min-height: 300px;
    overflow: hidden;
  }
  
  .output-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #555;
    background-color: #1e1e1e;
    height: 100%;
  }
  
  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #252525;
    border-bottom: 1px solid #555;
    padding: 4px;
  }
  
  .tabs {
    display: flex;
    gap: 4px;
  }
  
  .tab-button {
    background-color: transparent;
    border: none;
    padding: 6px 12px;
    color: #aaa;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .tab-button.active {
    background-color: #333;
    color: white;
  }
  
  .tab-button.has-errors {
    color: #f88;
  }
  
  .run-button {
    background-color: #0d6efd;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .run-button:hover {
    background-color: #0b5ed7;
  }
  
  .content-area {
    flex: 1;
    overflow: auto;
    padding: 10px;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  .output,
  .errors {
    color: #ccc;
    height: 100%;
  }
  
  pre {
    margin: 0;
    white-space: pre-wrap;
  }
  
  .no-errors {
    color: #8f8;
    font-style: italic;
  }
  
  .error-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .error-item {
    background-color: rgba(255, 0, 0, 0.1);
    border-left: 3px solid #f55;
    padding: 8px;
    border-radius: 2px;
  }
  
  .error-location {
    font-weight: bold;
    color: #f77;
    margin-bottom: 4px;
    font-size: 0.85rem;
  }
  
  .error-message {
    white-space: pre-wrap;
  }
  </style>
  