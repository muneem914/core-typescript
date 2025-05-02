<template>
    <div ref="chartContainer" class="tree-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import * as d3 from 'd3'
  
  // Hierarchical data remains the same as in your updated code
  const data = {
    name: "Core-Typescript",
    children: [
      {
        name: "Basic",
        children: [
          { name: 'Core Types', link: '/guide/basics/core-types' },
          { name: 'Type Annotations', link: '/guide/basics/type-annotations' },
          { name: 'Functions', link: '/guide/basics/functions' },
          { name: 'Interfaces and Types', link: '/guide/basics/interfaces-and-types' },
          { name: 'Classes', link: '/guide/basics/classes' },
          { name: 'Modules', link: '/guide/basics/modules' },
        ]
      },
      {
        name: "Intermediate",
        children: [
          { name: 'Advanced Types', link: '/guide/intermediate/advanced-types' },
          {
            name: "Generics",
            children: [
              {name: "Generic Functions", link: '/guide/intermediate/generics/generic-functions'},
              {name: "Generic Classes", link: '/guide/intermediate/generics/generic-classes'},
              {name: "Generic Constraints", link: '/guide/intermediate/generics/generic-constraints'},
            ]
          },
          { name: 'Type Manipulation', link: '/guide/intermediate/type-manipulation' },
          { name: 'Enums', link: '/guide/intermediate/enums' },
          { name: 'Namespaces', link: '/guide/intermediate/namespaces' },
          { name: 'Decorators', link: '/guide/intermediate/decorators' },
          { name: 'Configuration', link: '/guide/intermediate/configuration' },
        ]
      },
      {
        name: "Advanced",
        children: [
          { 
            name: "Advanced Type Features",
            children: [
              { name: "Recursive Types", link: '/guide/advanced/advanced-type-features/recursive-types' },
              { name: "Types Assertions", link: '/guide/advanced/advanced-type-features/types-assertions' },
              { name: "Utility Types", link: '/guide/advanced/advanced-type-features/utility-types' },
            ]
          },
          { 
            name: "Classes",
            children: [
              { name: "Abstract Classes", link: '/guide/advanced/advanced-classes/abstract-classes' },
              { name: "Static Members", link: '/guide/advanced/advanced-classes/static-members' },
              { name: "Method Overloading", link: '/guide/advanced/advanced-classes/method-overloading' },
            ]
          },
          { name: 'Asynchronous Programming', link: '/guide/advanced/asynchronous-programming' },
          { name: 'Modules and Dynamic Imports', link: '/guide/advanced/modules-and-dynamic-imports' },
          { name: 'Advanced Generics', link: '/guide/advanced/advanced-generics' },
          { name: 'Tooling and Ecosystem', link: '/guide/advanced/tooling-and-ecosystem' },
          { name: 'Typescript with Nodejs', link: '/guide/advanced/typescript-with-nodejs' },
          { name: 'Performance and Optimization', link: '/guide/advanced/performance-and-optimization' },
          { name: 'Testing', link: '/guide/advanced/testing' },
        ]
      }
    ]
  }
  
  const chartContainer = ref(null)
  
  onMounted(() => {
    const svgNode = createCollapsibleTree(data)
    chartContainer.value.appendChild(svgNode)
  })
  
  function createCollapsibleTree(data) {
  // Increased dimensions and more flexible spacing
  const width = 1405; // Wider width
  const initialHeight = 1500; // Initial height
  const marginTop = 20;
  const marginBottom = 20;
  const marginLeft = 185; // Increased left margin

  // Build hierarchy
  const root = d3.hierarchy(data);

  // Improved spacing calculations
  const dx = 50; // Vertical spacing between nodes
  const dy = 260; // Horizontal spacing between levels

  // Create the tree layout with custom spacing
  const tree = d3.tree()
    .nodeSize([dx, dy])
    .separation((a, b) => {
      // Increase separation between nodes, especially for siblings
      return a.parent === b.parent ? 1 : 2;
    });

  // Diagonal link generator with more curve
  const diagonal = d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x);

  // Create the main SVG element
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", initialHeight)
    .attr("viewBox", [-marginLeft, -marginTop, width, initialHeight])
    .attr("style", "max-width: 100%; height: auto; font: 24px sans-serif; user-select: none;");

  // Groups for links and nodes
  const gLink = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#8b9ca7")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

  const gNode = svg.append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");

  // Initialize positions
  root.x0 = dx / 2;
  root.y0 = 0;
  let i = 0;

  // Store the original children for every node
  root.descendants().forEach(d => {
    d.id = ++i;
    d._children = d.children; // Store original children for toggling
  });

  update(root);

  function update(source) {
    // Compute new layout
    tree(root);
    const nodes = root.descendants().reverse();
    
    // Manually adjust horizontal positioning to create more space
    nodes.forEach(d => {
      d.y = d.depth * 330; // Increased horizontal spacing between levels
    });

    const links = root.links();

    // Dynamically calculate the exact tree dimensions
    let left = root, right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });
    const height = right.x - left.x + marginTop + marginBottom;

    // Dynamically adjust SVG height and viewBox
    svg.transition().duration(250)
      .attr("height", height)
      .attr("viewBox", [-marginLeft, left.x - marginTop, width, height]);

    // Nodes Section
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    const nodeEnter = node.enter().append("g")
      .attr("class", d => d.data.link && !d.children && !d._children ? "link-node" : null)
      .attr("transform", () => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (event, d) => {
        if (d.data.link && !d.children && !d._children) {
          window.location.href = d.data.link;
        } else {
          d.children = d.children ? null : d._children;
          update(d);
        }
      });

    // Append circles
    nodeEnter.append("circle")
      .attr("r", 5)
      .attr("fill", d => d._children ? "#3752AE" : "#5A86FF")
      .attr("stroke-width", 2);

    // Append labels
    nodeEnter.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d._children ? -15 : 15)
      .attr("text-anchor", d => d._children ? "end" : "start")
      .text(d => d.data.name)
      .attr("fill", d => d.data.link && !d.children && !d._children ? "#5A86FF" : "#8b9ca7")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 5)
      .attr("stroke", "transparent")
      .attr("paint-order", "stroke");

    // Merge and transition nodes
    const nodeUpdate = node.merge(nodeEnter).transition()
      .duration(250)
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // Transition exiting nodes
    const nodeExit = node.exit().transition()
      .duration(250)
      .remove()
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    // Links Section
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    const linkEnter = link.enter().append("path")
      .attr("d", () => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    // Merge and transition links
    link.merge(linkEnter).transition()
      .duration(250)
      .attr("d", diagonal);

    // Transition exiting links
    link.exit().transition()
      .duration(250)
      .remove()
      .attr("d", d => {
        const o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      });

    // Save the old positions for the next transition
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // Return the SVG DOM node
  return svg.node();
}
</script>

<style scoped>
.tree-container {
  margin-top: 40px;
  width: 100%;
  height: 100%;
  display: block;
  overflow: auto;
  /* border: 1px solid gray; */
}

.link-node:hover text {
  fill: red !important;
  text-decoration: underline;
}
</style>