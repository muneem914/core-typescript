import { defineConfig } from 'vitepress';

// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export default defineConfig({
  // vite: {
  //   resolve: {
  //     alias: {
  //       'monaco-editor': path.resolve(__dirname, '../../node_modules/monaco-editor')
  //     }
  //   }
  // },
  title: "Core-Typescript",

  description: "A typescript learning platform",
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg',
    },
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Guide', link: '/guide' },
      { text: 'Blog', link: '/blog' },
      { text: 'Compiler-testing', link: '/testing' },
      { text: 'About Us', link: '/about' },
      { text: 'Contact Us', link: '/contact' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Core-Typescript', link: '/guide/core-typescript' },
          { text: 'Get Started', link: '/guide/what-is-typescript' },
          { text: 'Installation', link: '/guide/install' }
        ]
      },
      {
        text: 'Basics',
        collapsed: false,
        items: [
          { text: 'Core Types', link: '/guide/basics/core-types' },
          { text: 'Type Annotations', link: '/guide/basics/type-annotations' },
          { text: 'Functions', link: '/guide/basics/functions' },
          { text: 'Interfaces and Types', link: '/guide/basics/interfaces-and-types' },
          { text: 'Classes', link: '/guide/basics/classes' },
          { text: 'Modules', link: '/guide/basics/modules' },
        ]
      },
      {
        text: 'Intermediate',
        collapsed: false,
        items: [
          { text: 'Advanced Types', link: '/guide/intermediate/advanced-types' },
          { text: 'Generics', base: '/guide/intermediate/generics/',
            items: [
              {text: "Generic Functions", link: 'generic-functions'},
              {text: "Generic Classes", link: 'generic-classes'},
              {text: "Generic Constraints", link: 'generic-constraints'},
            ]
           },
          { text: 'Type Manipulation', link: '/guide/intermediate/type-manipulation' },
          { text: 'Enums', link: '/guide/intermediate/enums' },
          { text: 'Namespaces', link: '/guide/intermediate/namespaces' },
          { text: 'Decorators', link: '/guide/intermediate/decorators' },
          { text: 'Configuration', link: '/guide/intermediate/configuration' },
        ]
      },
      {
        text: 'Advanced',
        collapsed: false,
        items: [
          { text: 'Advanced Type Features', base: '/guide/advanced/advanced-type-features/' ,
            items: [
              { text: "Recursive Types", link: 'recursive-types' },
              { text: "Types Assertions", link: 'types-assertions' },
              { text: "Utility Types", link: 'utility-types' },
            ]
          },
          { text: 'Classes', base: '/guide/advanced/advanced-classes/',
            items: [
              { text: "Abstract Classes", link: 'abstract-classes' },
              { text: "Static Members", link: 'static-members' },
              { text: "Method Overloading", link: 'method-overloading' },
            ]
           },
          { text: 'Asynchronous Programming', link: '/guide/advanced/asynchronous-programming' },
          { text: 'Modules and Dynamic Imports', link: '/guide/advanced/modules-and-dynamic-imports' },
          { text: 'Advanced Generics', link: '/guide/advanced/advanced-generics' },
          { text: 'Tooling and Ecosystem', link: '/guide/advanced/tooling-and-ecosystem' },
          { text: 'Typescript with Nodejs', link: '/guide/advanced/typescript-with-nodejs' },
          { text: 'Performance and Optimization', link: '/guide/advanced/performance-and-optimization' },
          { text: 'Testing', link: '/guide/advanced/testing' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/muneem914' },
      { icon: 'discord', link: 'https://discord.gg/wQvHMPYtEF' },
    ],


    footer: {
      message: 'Released under MIT LICENSE.',
      copyright: 'Copyright © 2024-present.'
    },
    editLink: {
      pattern: 'https://github.com/muneem914/core-typescript/blob/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    // carbonAds:{
    //   code: "CWYIC53U",
    //   placement: "core-typescript"
    // }
  },
  vite: {
    ssr: {
      noExternal: ['monaco-editor']
    }
  }
})
