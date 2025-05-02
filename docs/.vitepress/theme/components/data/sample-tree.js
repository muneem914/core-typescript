export const sampleData = {
    id: 'root',
    name: 'CEO',
    children: [
      {
        id: 'c1',
        name: 'CTO',
        children: [
          { id: 'c1-1', name: 'Backend Team' },
          { id: 'c1-2', name: 'DevOps Team' }
        ]
      },
      {
        id: 'c2',
        name: 'CFO',
        children: [
          { id: 'c2-1', name: 'Accounting' },
          { id: 'c2-2', name: 'Investors' }
        ]
      }
    ]
  }