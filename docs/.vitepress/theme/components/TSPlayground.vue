<template>
  <div class="playground-container">
    <div class="editor-section">
      <div class="toolbar">
        <button @click="executeCode">Run ▶</button>
        <button @click="resetCode">Reset ↺</button>
        <span v-if="!compilerLoaded" class="loader">Loading compiler...</span>
      </div>

      <div class="editor-wrapper">
        <pre class="prism-highlight language-ts" v-html="highlightedCode"></pre>
        <textarea
          ref="editor"
          v-model="tsCode"
          @input="highlightCode"
          @scroll="syncScroll"
          spellcheck="false"
        ></textarea>
      </div>
    </div>

    <div class="logSection">
      <div class="outputLog">
      <h4>Output Log:</h4>
      <pre ref="output">{{ logs.join('\n') }}</pre>
    </div>
    <div class="errorLog">
      <h4>Error History:</h4>
      <pre style="color: orangered;" >Working on this, stay tuned !</pre>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

const tsCode = ref(`// TypeScript Playground
function greet(name: string) {
  console.log(\`Hello, \${name}!\`)
}

greet('Core-Typescript')
`)

const logs = ref([])
const editor = ref(null)
const output = ref(null)
const compilerLoaded = ref(false)
const highlightedCode = ref('')

// Load TypeScript compiler
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/typescript@5.0.4/lib/typescript.js'
  script.onload = () => {
    compilerLoaded.value = true
    console.log('TypeScript compiler loaded')
  }
  script.onerror = () => {
    logs.value.push('Failed to load TypeScript compiler')
  }
  document.head.appendChild(script)

  highlightCode()
})

function executeCode() {
  try {
    if (!window.ts) {
      logs.value.push('Compiler not loaded yet')
      return
    }

    logs.value = []

    const jsCode = window.ts.transpileModule(tsCode.value, {
      compilerOptions: {
        module: window.ts.ModuleKind.ESNext,
        target: window.ts.ScriptTarget.ESNext
      }
    }).outputText

    const originalLog = console.log
    console.log = (...args) => {
      logs.value.push(args.join(' '))
      output.value.scrollTop = output.value.scrollHeight
    }

    new Function(jsCode)()
    console.log = originalLog
  } catch (error) {
    logs.value.push(`Error: ${error.message}`)
  }
}

function resetCode() {
  tsCode.value = `// TypeScript Playground
function greet(name: string) {
  console.log(\`Hello, \${name}!\`)
}

greet('Core-Typescript')
`
  logs.value = []
  highlightCode()
}

function highlightCode() {
  let code = tsCode.value
  if (code.endsWith('\n')) {
    code += ' '
  }
  highlightedCode.value = Prism.highlight(code, Prism.languages.typescript, 'typescript')
}

function syncScroll(e) {
  const pre = e.target.previousElementSibling
  pre.scrollTop = e.target.scrollTop
  pre.scrollLeft = e.target.scrollLeft
}

watch(tsCode, highlightCode)
</script>

<style scoped>
.playground-container {
  border: 1px solid gray;
  border-radius: 8px;
}

.editor-section {
  position: relative;
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 8px 8px 0 0;
}

.toolbar {
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background: #3178c6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* transition: background 0.2s; */
}

button:hover {
  background: #255c99;
}

.editor-wrapper {
  position: relative;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  height: 400px;
}

.editor-wrapper pre.prism-highlight {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 1rem;
  pointer-events: none;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: auto;
  color: white;
  background: transparent;
  z-index: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.editor-wrapper textarea {
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: transparent;
  color: transparent;
  caret-color: white;
  border: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  resize: none;
  position: relative;
  z-index: 1;
  white-space: pre-wrap;
  overflow: auto;
}

.logSection{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-top: 1px solid gray;
}
@media (max-width: 768px) {
  .logSection{
    grid-template-columns: 1fr;
  }
  .outputLog{
    border-right: none;
    border-bottom: 1px solid gray;
  }
}
.outputLog {
  padding: 1rem;
  /* background: #f8f8f8; */
  /* border-radius: 0 0 8px 8px; */
  border-right: 1px solid gray;
}
.errorLog{
  padding: 1rem;
}

pre {
  /* height: 150px; */
  overflow-y: auto;
  /* background: white; */
  padding: 1rem;
  /* border: 1px solid #e5e7eb; */
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>
