---
# aside: false
sidebar: false
editLink: false
prev: false
next: false
---


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/77167681?v=4',
    name: 'Muneem Hussain',
    title: 'Founder',
    org: "Core-Typescript",
    orgLink: "https://core-typescript.netlify.app/",
    desc: "Founder - CVL group",
    sponsor: "https://abirs-personal-portfolio.netlify.app/",
    actionText: "Visit Portfolio",
    links: [
      { icon: 'github', link: 'https://github.com/muneem914' },
      { icon: 'facebook', link: 'https://facebook.com/abir.914' },
      { icon: 'instagram', link: 'https://instagram.com/abir.914' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/muneem-hussain/' }
    ]
  },
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="medium" :members="members" />