---
editLink: false
---

# Core-Typescript
Welcome to Core-Typescript, your comprehensive resource for mastering TypeScript, designed to cater to learners from all backgrounds, whether you're starting from scratch or aiming to deepen your existing programming knowledge.

## Why TypeScript ?

TypeScript has emerged as the fastest growing programming language in recent years. Here are the key points regarding its usage and developer interest:
- **Rapid Growth**: Over the past five years, TypeScript usage has increased dramatically—from 12% in 2017 to 34% in 2022—making it the fastest growing language in that period.
- **Enterprise Appeal**: Its rise is largely driven by large-scale JavaScript developers who favor TypeScript for its enhanced project scalability, improved collaboration, and better code maintainability.
- **Complementary Role**: While JavaScript remains the most popular language (with about 65% of developers using it according to the JetBrains State of Developer Ecosystem 2022 report), TypeScript serves as an appealing, type-safe alternative that addresses some of JavaScript's limitations.
- **Market Interest**: The strong interest in TypeScript reflects a broader trend where developers and organizations are increasingly prioritizing code quality and long-term maintainability, which static typing and modern tooling provided by TypeScript facilitate.

<DataComparison />

JavaScript remains the dominant language in web development, widely used for frontend (86%) and backend (34%). While TypeScript users are fewer, its adoption is growing rapidly, with backend usage surpassing JavaScript (43%). TypeScript's popularity is rising due to its type safety and scalability, making it a preferred choice for enterprise applications. Though JavaScript still leads in areas like mobile apps and graphics, the shift toward TypeScript indicates a strong future for structured, large-scale development.

***Source:*** [JetBrains Blog](https://blog.jetbrains.com/webstorm/2024/02/js-and-ts-trends-2024/), [Cloud Data Insights](https://www.clouddatainsights.com/typescript-fastest-growing-programming-language-javascript-most-popular/)

## Overview of the whole learning path
Our structured curriculum guides you through the multifaceted world of TypeScript:
- **Foundational Concepts**: Begin with the basics, understanding TypeScript's syntax, types, and core principles.
- **Intermediate Topics**: Progress to interfaces, classes, and modules, building upon your foundational knowledge.
- **Advanced Techniques**: Delve into generics, decorators, and asynchronous programming to harness TypeScript's full potential.
- **Practical Applications**: Engage with real-world projects and scenarios, bridging the gap between theory and practice.

<D3Tree2 />

Each module is enriched with hands-on examples and real-world analogies, ensuring concepts are not only learned but also retained.

## How to use this platform
To maximize your learning experience:
1. **Sequential Learning**: Follow the modules in order, as each builds upon the previous, ensuring a solid understanding.
2. **Interactive Examples**: Engage actively with the provided code examples. Modify and experiment with them to observe different outcomes.
3. **Real-World Analogies**: Leverage the analogies to relate TypeScript concepts to everyday experiences, enhancing comprehension and recall.
4. **Community Engagement**: Participate in discussions, ask questions, and share insights. The collaborative nature of our platform fosters a deeper understanding.

## Behind the Scene
The inception of Core-Typescript stemmed from a collective desire to simplify and demystify TypeScript education. Recognizing the challenges posed by existing documentation, our team envisioned a platform that emphasizes clarity, practicality, and accessibility. By integrating real-world analogies and actionable examples, we've created a learning environment where concepts resonate and learners thrive.

**Mission**: To provide an inclusive, comprehensive, and engaging platform for learning TypeScript, empowering individuals worldwide to enhance their programming skills.

**Vision**: To be the leading open-source resource for TypeScript education, fostering a global community of learners and contributors dedicated to continuous growth and knowledge sharing.

## Keep Learning and Growing
Embarking on a learning journey requires curiosity, dedication, and the right resources. At Core-Typescript, we're committed to supporting you every step of the way. Dive in, explore, and transform your understanding of TypeScript. Here's to your success and the exciting path ahead!

## About Us in Brief

Core-Typescript is an open-source initiative driven by a passionate community of developers and educators. Our collaborative approach ensures that the platform remains dynamic, up-to-date, and reflective of diverse insights. We welcome contributions and encourage learners to become part of our growing community, collectively advancing TypeScript education for all.

## Our beloved Founding Members
​At Core-Typescript, our foundation is strengthened by a dedicated team committed to delivering an exceptional TypeScript learning experience.
<VPTeamMembers size="small" :members="members" />
Together, we are committed to providing a comprehensive and engaging learning journey for all aspiring TypeScript developers.

<script setup>
import D3Tree2 from '../.vitepress/theme/components/D3Tree2.vue'
import DataComparison from '../.vitepress/theme/components/DataComparison.vue'
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/77167681?v=4',
    name: 'Muneem Hussain',
    title: 'Founder',
    org: "Core-Typescript",
    orgLink: "https://core-typescript.netlify.app/",
    desc: "Developer",
    // sponsor: "https://abirs-personal-portfolio.netlify.app/",
    // actionText: "Visit Portfolio",
    links: [
      { icon: 'github', link: 'https://github.com/muneem914' },
    //   { icon: 'facebook', link: 'https://facebook.com/abir.914' },
    //   { icon: 'instagram', link: 'https://instagram.com/abir.914' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/muneem-hussain/' }
    ]
  },
  {
    avatar: '/sir.jpeg',
    name: 'Khaza Shahriar',
    title: 'Co-Founder',
    org: "Core-Typescript",
    orgLink: "https://core-typescript.netlify.app/",
    desc: "Code Reviewer",
    // sponsor: "https://abirs-personal-portfolio.netlify.app/",
    // actionText: "Visit Portfolio",
    links: [
      { icon: 'github', link: 'https://github.com/' },
    //   { icon: 'facebook', link: 'https://facebook.com/abir.914' },
    //   { icon: 'instagram', link: 'https://instagram.com/abir.914' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/khaza-shahriar-a289291b3/' }
    ]
  },
]
</script>

