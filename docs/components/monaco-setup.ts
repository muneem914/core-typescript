
// This is a simpler approach that works with Vite and TypeScript
import * as monaco from 'monaco-editor';
import  loader  from '@monaco-editor/loader';

// Configure loader to use CDN or local files as needed
loader.config({ 
  paths: { 
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs' 
  } 
});

// Export the monaco namespace
export { monaco };

// You can also create a loader function
export const initMonaco = async (element: HTMLElement, options: any) => {
  const monaco = await loader.init();
  return monaco.editor.create(element, options);
};