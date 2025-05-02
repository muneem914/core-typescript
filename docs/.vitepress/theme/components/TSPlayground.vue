<template>
  <div class="playground-container">
    <div class="editor-section">
      <div class="toolbar">
        <button @click="executeCode" class="run-button">
          <span class="icon"><i class="pi pi-play"></i></span>Run <span class="d_sm_none">(Ctrl+Enter)</span>
        </button>
        <button @click="resetCode" class="reset-button">
          <span class="icon"><i class="pi pi-replay"></i></span> Reset
        </button>
        <div class="status-bar">
          <span v-if="!compilerLoaded" class="loader">
            Loading compiler...
          </span>
          <span class="ts-version">TypeScript {{ tsVersion }}</span>
        </div>
      </div>
      <div ref="editor" class="monaco-editor"></div>
    </div>

    <div class="output-section">
      <div class="output-header">
        <!-- <h3>Output Log</h3> -->
        <button @click="clearAll" class="clear-button">Clear All Logs</button>
      </div>
      <div class="fancy-logs">
        <div class="logs-column">
          <h4>Runtime Output</h4>
          <div
            v-for="(log, index) in logs"
            :key="index"
            class="log-entry"
            :class="log.type"
          >
            <span class="timestamp">{{ log.timestamp }}</span>
            <span class="log-content">{{ log.message }}</span>
          </div>
        </div>
        <div class="errors-column">
          <h4>Type Errors</h4>
          <div v-if="runErrors.length === 0" class="no-errors">
            No type errors
          </div>
          <div
            v-for="(err, index) in runErrors"
            :key="index"
            class="error-entry"
            @click="jumpToErrorPosition(err)"
          >
            <span class="timestamp">L{{ err.line }}:{{ err.character }}</span>
            <span class="error-content">{{ err.messageText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Module declaration for primeicons to suppress its CSS errors -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as monaco from "monaco-editor";
import * as ts from "typescript";


// --- Monaco Worker Fix ---
// @ts-ignore: import.meta is allowed with module ESNext.
if (typeof window !== "undefined") {
  self.MonacoEnvironment = {
    getWorker: function (workerId, label) {
      if (label === "json") {
        // @ts-ignore
        return new Worker(new URL("monaco-editor/esm/vs/language/json/json.worker", import.meta.url), { type: "module" });
      }
      if (label === "css" || label === "scss" || label === "less") {
        // @ts-ignore
        return new Worker(new URL("monaco-editor/esm/vs/language/css/css.worker", import.meta.url), { type: "module" });
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        // @ts-ignore
        return new Worker(new URL("monaco-editor/esm/vs/language/html/html.worker", import.meta.url), { type: "module" });
      }
      if (label === "typescript" || label === "javascript") {
        // @ts-ignore
        return new Worker(new URL("monaco-editor/esm/vs/language/typescript/ts.worker", import.meta.url), { type: "module" });
      }
      // @ts-ignore
      return new Worker(new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url), { type: "module" });
    },
  };
}
// --- End Monaco Worker Fix ---

// Default playground code.
const defaultCode = `// Core-TypeScript Playground
function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

greet('Core-Typescript');
`;

// Filter to ignore system errors from lib files etc.
const isRelevantError = (diagnostic: ts.Diagnostic) => {
  if (!diagnostic || !diagnostic.messageText) return false;
  const messageText =
    typeof diagnostic.messageText === "string"
      ? diagnostic.messageText
      : diagnostic.messageText.messageText;
  if (messageText.startsWith("Cannot find global type ")) return false;
  if (messageText.includes("Could not resolve") || messageText.includes("not found")) return false;
  if (
    messageText.includes("lib.d.ts") ||
    messageText.includes("lib-undefined") ||
    messageText.includes("node_modules") ||
    messageText.includes("Cannot find name 'console'") ||
    messageText.includes("Cannot find name 'document'") ||
    messageText.includes("Cannot find name 'window'")
  )
    return false;
  return true;
};

// Reactive state
const tsCode = ref(defaultCode);
const logs = ref<Array<{ type: string; message: string; timestamp: string }>>([]);
const typeErrors = ref<
  Array<{
    line: number;
    character: number;
    messageText: string;
    start: number;
    length: number;
    code: number;
  }>
>([]);
const runErrors = ref<typeof typeErrors.value>([]);
const editor = ref<HTMLElement | null>(null);
const compilerLoaded = ref(true);
const tsVersion = ref(ts.version);
let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
let model: monaco.editor.ITextModel | null = null;
let decorations: string[] = [];

// Complete library for type checking (ES2017 + React JSX)
// Added a simple definition for Extract.
const completeLib = `
declare type Extract<T, U> = T extends U ? T : never;

declare var Promise: {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  reject<T = never>(reason?: any): Promise<T>;
  all<T>(values: Array<T | PromiseLike<T>>): Promise<T[]>;
};

interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2>;
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): Promise<T | TResult>;
}

declare function setTimeout(handler: (...args: any[]) => void, timeout: number): number;
declare function clearTimeout(handle: number): void;

declare var Math: {
  random(): number;
  floor(x: number): number;
  ceil(x: number): number;
  round(x: number): number;
  max(...values: number[]): number;
  min(...values: number[]): number;
};

interface Error {
  name: string;
  message: string;
  stack?: string;
}
declare var Error: {
  new(message?: string): Error;
  (message?: string): Error;
  prototype: Error;
};

interface Array<T> {
  length: number;
  [n: number]: T;
  pop(): T | undefined;
  push(...items: T[]): number;
  shift(): T | undefined;
  unshift(...items: T[]): number;
  slice(start?: number, end?: number): T[];
  splice(start: number, deleteCount?: number): T[];
  find(predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined;
}

interface String {
  toUpperCase(): string;
  toLowerCase(): string;
}
`;

// onMounted: Set up Monaco editor and configuration.
onMounted(() => {
  // Set diagnostics and compiler options.
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2017,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    jsx: monaco.languages.typescript.JsxEmit.React,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    noEmit: true,
    lib: ["es2017", "dom", "dom.iterable", "esnext"],
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    skipLibCheck: true,
    allowJs: true,
  });

  // Add global definitions.
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
interface Console {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
}
declare const console: Console;

declare function setTimeout(callback: (...args: any[]) => void, ms: number): number;
declare function clearTimeout(timeoutId: number): void;

interface Math {
  random(): number;
  floor(x: number): number;
  ceil(x: number): number;
  round(x: number): number;
  max(...values: number[]): number;
  min(...values: number[]): number;
}
declare const Math: Math;

interface PromiseConstructor {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  reject<T = never>(reason?: any): Promise<T>;
  all<T>(values: Array<T | PromiseLike<T>>): Promise<T[]>;
}
declare const Promise: PromiseConstructor;
`,
    "global-apis.d.ts"
  );

  // Load saved code if available.
  const storedCode = localStorage.getItem("tsPlaygroundCode");
  tsCode.value = storedCode ? storedCode : defaultCode;

  // Create Monaco Editor.
  if (editor.value) {
    monacoEditor = monaco.editor.create(editor.value, {
      value: tsCode.value,
      language: "typescript",
      theme: "vs-dark",
      minimap: { enabled: true },
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: false,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
    });
    model = monacoEditor.getModel();

    // Shortcut: Ctrl+Enter to run code.
    monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, executeCode);

    // Save changes and check types.
    monacoEditor.onDidChangeModelContent(() => {
      localStorage.setItem("tsPlaygroundCode", monacoEditor!.getValue());
      checkTypeErrors();
    });

    // Initial type check.
    setTimeout(() => {
      checkTypeErrors();
    }, 500);
  }
});

// Helper: Format log arguments.
// If an argument is an object or array, output pretty-printed JSON.
function formatArgs(args: any[]): string {
  return args
    .map((arg) => {
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(" ");
}

function checkTypeErrors() {
  if (!monacoEditor || !model) return;
  const code = monacoEditor.getValue();
  const fileName = "file.ts";
  const compilerOptions: ts.CompilerOptions = {
    noEmit: true,
    target: ts.ScriptTarget.ES2017,
    module: ts.ModuleKind.ESNext,
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    skipLibCheck: true,
    allowJs: true,
  };

  // Custom compiler host using our complete lib.
  const compilerHost: ts.CompilerHost = {
    getSourceFile: (filename, languageVersion) => {
      if (filename === fileName) {
        return ts.createSourceFile(fileName, code, languageVersion);
      }
      if (filename === "lib.d.ts") {
        return ts.createSourceFile("lib.d.ts", completeLib, languageVersion);
      }
      return undefined;
    },
    writeFile: () => {},
    getDefaultLibFileName: () => "lib.d.ts",
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: (filename) => filename,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
    fileExists: (filePath) => filePath === fileName || filePath === "lib.d.ts",
    readFile: (filePath) => {
      if (filePath === fileName) return code;
      if (filePath === "lib.d.ts") return completeLib;
      return "";
    },
    directoryExists: () => true,
    getDirectories: () => [],
  };

  const program = ts.createProgram([fileName], compilerOptions, compilerHost);
  const emitResult = program.emit();
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  const relevantDiagnostics = allDiagnostics.filter(isRelevantError);

  typeErrors.value = relevantDiagnostics.map((diagnostic) => {
    if (diagnostic.file && diagnostic.start !== undefined) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      return {
        line: line + 1,
        character: character + 1,
        messageText:
          typeof diagnostic.messageText === "string"
            ? diagnostic.messageText
            : diagnostic.messageText.messageText,
        start: diagnostic.start,
        length: diagnostic.length || 0,
        code: diagnostic.code,
      };
    }
    return {
      line: 1,
      character: 1,
      messageText:
        typeof diagnostic.messageText === "string"
          ? diagnostic.messageText
          : diagnostic.messageText.messageText,
      start: 0,
      length: 0,
      code: diagnostic.code,
    };
  });

  updateDecorations();
}

function updateDecorations() {
  if (!monacoEditor || !model) return;
  decorations = monacoEditor.deltaDecorations(decorations, []);
  const newDecorations = typeErrors.value.map((error) => {
    const startPos = model!.getPositionAt(error.start);
    const endPos = model!.getPositionAt(error.start + error.length);
    return {
      range: new monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column),
      options: {
        className: "squiggly-error",
        hoverMessage: { value: error.messageText },
        inlineClassName: "type-error-highlight",
        overviewRuler: {
          color: "red",
          position: monaco.editor.OverviewRulerLane.Right,
        },
      },
    };
  });
  decorations = monacoEditor.deltaDecorations([], newDecorations);
}

function jumpToErrorPosition(error: { start: number }) {
  if (!monacoEditor || !model) return;
  const startPos = model.getPositionAt(error.start);
  monacoEditor.revealPositionInCenter(startPos);
  monacoEditor.setPosition(startPos);
  monacoEditor.focus();
}

function executeCode() {
  try {
    clearLogs();
    const code = monacoEditor!.getValue();
    checkTypeErrors();
    runErrors.value = [...typeErrors.value];

    const jsCode = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2017,
        jsx: ts.JsxEmit.React,
        noEmitOnError: false,
      },
    }).outputText;

    // Override console methods for formatted output.
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      addLog("log", formatArgs(args));
      originalLog(...args);
    };
    console.error = (...args: any[]) => {
      addLog("error", formatArgs(args));
      originalError(...args);
    };
    console.warn = (...args: any[]) => {
      addLog("warn", formatArgs(args));
      originalWarn(...args);
    };

    new Function(jsCode)();

    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  } catch (error: any) {
    addLog("error", error.message);
  }
}

function addLog(type: string, message: string) {
  logs.value.push({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
  setTimeout(() => {
    const container = document.querySelector(".logs-column");
    if (container) container.scrollTop = container.scrollHeight;
  }, 10);
}

function clearLogs() {
  logs.value = [];
}

function clearErrors() {
  runErrors.value = [];
  typeErrors.value = [];
  if (monacoEditor) {
    decorations = monacoEditor.deltaDecorations(decorations, []);
  }
}

function clearAll() {
  clearLogs();
  clearErrors();
}

function resetCode() {
  if (monacoEditor) {
    monacoEditor.setValue(defaultCode);
    localStorage.setItem("tsPlaygroundCode", defaultCode);
    clearAll();
    setTimeout(() => {
      checkTypeErrors();
    }, 100);
  }
}
</script>

<style>
/* Global styles for Monaco editor error decorations */
.squiggly-error {
  text-decoration: wavy underline red;
  text-decoration-skip-ink: none;
}
.type-error-highlight {
  background-color: rgba(255, 0, 0, 0.2);
}
</style>

<style scoped>
.playground-container {
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  /* height: 100vh; */
  /* border: 1px solid #2d2d2d; */
  /* border-radius: 8px; */
  /* background: #1e1e1e; */
  overflow-y: auto;
  padding: 1rem 0;
}
.editor-section {
  /* flex: 2; */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem;
  background: #323233;
  border-radius: 8px 8px 0 0;
  flex-shrink: 0;
}
button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}
.run-button {
  background: #3e63dd;
  color: white;
}
.reset-button {
  background: #9e9e9e;
  color: white;
}
.clear-button {
  background: #ff4444;
  color: white;
  z-index: 1;
}
button:hover {
  filter: brightness(1.1);
}
.monaco-editor {
  /* width: 100%; */
  border: none;
  padding: 1rem 0;
  height: 500px;
  overflow: auto;
}
.output-section {
  /* flex: 1; */
  background: #323233;
  /* border-top: 2px solid #333; */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  border-radius: 0 0 8px 8px;
}
.output-header {
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
  z-index: 1;
}
.fancy-logs {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-y: auto;
}
@media screen and (max-width: 420px) {
  .fancy-logs {
  display: block;
}
button{
  padding: 3px 5px;
  font-size: 12px;
}
.d_sm_none{
  display: none;
}
.monaco-editor{
  max-height: 300px;
}
.logs-column,
.errors-column {
  max-height: 150px;
}
}
.logs-column,
.errors-column {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  font-family: "Fira Code", monospace;
  font-size: 13px;
  border-right: 1px solid #9e9e9e;
  border-top: 1px solid #9e9e9e;
  height: 300px;
  overflow: auto;
}
.errors-column {
  border-right: none;
}
.logs-column > h4,
.errors-column > h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #fff;
  z-index: 0;
}
.log-entry,
.error-entry {
  padding: 4px;
  margin: 4px 0;
}
.log-entry {
  border-left: 3px solid #007acc;
}
.log-entry.error {
  border-left: 3px solid #ff4444;
}
.log-entry.warn {
  border-left: 3px solid #ffcc00;
}
.log-content {
  color: #e2e2e2;
}
.error-entry {
  border-left: 3px solid #ff4444;
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  cursor: pointer;
}
.error-entry:hover {
  background: rgba(255, 68, 68, 0.2);
}
.no-errors {
  color: #65b869;
  font-style: italic;
  padding: 4px;
}
.timestamp {
  color: #9e9e9e;
  margin-right: 1rem;
}

.status-bar {
  margin-left: auto;
  display: flex;
  gap: 1rem;
  color: #9e9e9e;
  font-size: 0.9em;
}
.loader {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #9e9e9e;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.icon {
  font-size: 1.1em;
}
</style>