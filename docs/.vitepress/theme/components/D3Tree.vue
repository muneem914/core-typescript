<template>
    <!-- Container for the SVG rendered by D3 -->
    <div ref="chart" class="tree-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import * as d3 from 'd3'
  
  // Sample hierarchical data (customize as needed)
  const data = {
    name: "Core-Typescript",
    children: [
      {
        name: "Basic",
        children: [
          { name: "Basic 1" },
          { name: "Basic 1" },
          { name: "Basic 1" },
          { name: "Basic 2" }
        ]
      },
      {
        name: "Intermediate",
        children: [
          { name: "Intermediate 3" },
          { name: "Intermediate 3" , 
            children: [
                { name: "gg inter 1"},
                { name: "gg inter 2"},
                { name: "gg inter 3"},
            ]
          },
          { name: "Intermediate 3" },
          { name: "Intermediate 3" },
        ]
      },
      {
        name: "Advanced",
        children: [
          { name: "Advanced 3" },
          { name: "Advanced 3" },
          { name: "Advanced 3" },
          { name: "Advanced 3" },
        ]
      }
    ]
  }
  
  const chart = ref(null)
  
  onMounted(() => {
    // Dimensions and margins for the diagram
    const margin = { top: 20, right: 90, bottom: 30, left: 150 },
          width = 650 - margin.left - margin.right,
          height = 700 - margin.top - margin.bottom
  
    // Append the SVG object to the chart container
    const svg = d3.select(chart.value)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
  
    let i = 0,
        duration = 750
  
    // Create a tree layout with specified size
    const treeLayout = d3.tree().size([height, width])
  
    // Assign data to a hierarchy using parent-child relationships
    let root = d3.hierarchy(data, d => d.children)
    root.x0 = height / 2
    root.y0 = 0
  
    // Collapse all children of the root's children (except root itself)
    // root.children.forEach(collapse)
  
    // Render the tree for the first time
    update(root)
  
    // Collapse the node and all its children
    function collapse(d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }
  
    // Updates the tree diagram given a source node.
    function update(source) {
      // Compute the new tree layout.
      const treeData = treeLayout(root)
      const nodes = treeData.descendants(),
            links = treeData.descendants().slice(1)
  
      // Normalize for fixed-depth.
      nodes.forEach(d => d.y = d.depth * 100)
  
      // ****************** Nodes section ***************************
  
      // Update the nodes…
      const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i))
  
      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          if (d.children) {
            d._children = d.children
            d.children = null
          } else {
            d.children = d._children
            d._children = null
          }
          update(d)
        })
  
      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", d => d._children ? "lightsteelblue" : "red")
  
      // Add labels for the nodes
      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", d => d.children || d._children ? -13 : 13)
        .attr("text-anchor", d => d.children || d._children ? "end" : "start")
        .text(d => d.data.name)
  
      // UPDATE
      const nodeUpdate = nodeEnter.merge(node)
  
      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", d => `translate(${d.y},${d.x})`)
  
      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", d => d._children ? "lightsteelblue" : "skyblue")
        .attr('cursor', 'pointer')
  
      // Remove any exiting nodes
      const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .remove()
  
      nodeExit.select('circle')
        .attr('r', 1e-6)
  
      nodeExit.select('text')
        .style('fill-opacity', 1e-6)
  
      // ****************** links section ***************************
  
      // Update the links…
      const link = svg.selectAll('path.link')
        .data(links, d => d.id)
  
      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', d => {
          const o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        })
  
      // UPDATE
      const linkUpdate = linkEnter.merge(link)
  
      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d, d.parent))
  
      // Remove any exiting links
      const linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', d => {
          const o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove()
  
      // Store the old positions for transition.
      nodes.forEach(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }
  
    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`
    }
  })
  </script>
  
  <style scoped>
 
  
  .tree-container {
    /* Ensure the container takes up sufficient space */
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  </style>
  