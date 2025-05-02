<template>
  <!-- Fixed-size container: if the tree grows larger, scrollbars will appear -->
  <div ref="chartContainer" class="tree-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

// Hierarchical data for the tree.
const data = {
  name: "Core-Typescript",
  children: [
    {
      name: "Basic",
      children: [
        { name: "Core Types" },
        { name: "Type Annotations" },
        { name: "Functions" },
        { name: "Interfaces and Types" },
        { name: "Classes" },
        { name: "Modules" }
      ]
    },
    {
      name: "Intermediate",
      children: [
        { name: "Advanced Types" },
        {
          name: "Generics",
          children: [
            { name: "Generic Functions" },
            { name: "Generic Classes" },
            { name: "Generic Constraints" }
          ]
        },
        { name: "Type Manipulation" },
        { name: "Enums" },
        { name: "Namespaces" },
        { name: "Decorators" },
        { name: "Configuration" }
      ]
    },
    {
      name: "Advanced",
      children: [
        { name: "Advanced Type Features" ,
          children: [
            { name: "Recursive Types" },
            { name: "Types Assertions" },
            { name: "Utility Types" }
          ]},
        { name: "Classes" ,
          children: [
            { name: "Abstract Classes" },
            { name: "Static Members" },
            { name: "Method Overloading" }
          ]},
        { name: "Asynchronous Programming" },
        { name: "Modules and Dynamic Imports" },
        { name: "Advanced Generics" },
        { name: "Tooling and Ecosystem" },
        { name: "Typescript with Nodejs" },
        { name: "Performance and Optimization" },
        { name: "Testing" }
      ]
    }
  ]
}

const chartContainer = ref(null)

onMounted(() => {
  // Build the tree and append its SVG to the container.
  const svgNode = createCollapsibleTree(data)
  chartContainer.value.appendChild(svgNode)
})

/**
 * createCollapsibleTree builds a D3 tree with:
 * - Fixed overall dimensions (width: 928, height: 600)
 * - Scrollable content when the tree overflows.
 * - All nodes expanded by default.
 * - Increased spacing and node sizes for a "bigger" look.
 */
function createCollapsibleTree(data) {
  // Fixed SVG dimensions.
  const width = 700;
  const heightFixed = 600; // Fixed container height
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 10;
  const marginLeft = 112;

  // Build hierarchy.
  const root = d3.hierarchy(data);

  // Increase spacing for a bigger appearance.
  // dx: vertical spacing; dy: horizontal spacing based on tree height.
  const dx = 25; // Increased from 10
  const dy = (width - marginRight - marginLeft) / (1 + root.height);

  // Create the tree layout with the specified node size.
  const tree = d3.tree().nodeSize([dx, dy]);

  // Diagonal link generator (curved horizontal links).
  const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

  // Create the main SVG element with fixed dimensions and a responsive viewBox.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", heightFixed)
      .attr("viewBox", [-marginLeft, -marginTop, width, heightFixed])
      .attr("style", "max-width: 100%; height: auto; font: 16px sans-serif; user-select: none;");

  // Groups for links and nodes.
  const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#8b9ca7")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

  // Initialize positions.
  root.x0 = dx / 2;
  root.y0 = 0;
  let i = 0;

  // Store the original children for every node.
  // This ensures that if you collapse a node, its children are still available to be expanded.
  root.descendants().forEach(d => {
      d.id = ++i;
      d._children = d.children; // Store original children, so toggling works.
  });

  update(root);

  /**
   * update computes the new tree layout and transitions nodes/links.
   * It also adjusts the SVG viewBox to ensure the entire tree is visible.
   */
  function update(source) {
    // Compute new layout.
    tree(root);
    const nodes = root.descendants().reverse();
    nodes.forEach(d => d.y = d.depth * 150)
    const links = root.links();

    // Find the vertical extent of the tree.
    let left = root, right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });
    const height = right.x - left.x + marginTop + marginBottom;

    // Transition the SVG viewBox (height may exceed fixed height, then scrollbars appear).
    const transition = svg.transition().duration(250)
      .attr("viewBox", [-marginLeft, left.x - marginTop, width, Math.max(height, heightFixed)]);

    // ---- Nodes Section ----
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    const nodeEnter = node.enter().append("g")
      .attr("transform", () => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (event, d) => {
        // Toggle collapse/expand on click.
        d.children = d.children ? null : d._children;
        update(d);
      });

    // Append circles (bigger for improved visibility).
    nodeEnter.append("circle")
      .attr("r", 5) // Increased radius.
      .attr("fill", d => d._children ? "#3752AE" : "#5A86FF")
      .attr("stroke-width", 2);

    // Append labels.
    nodeEnter.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d._children ? -10 : 10) // Increased text offset.
      .attr("text-anchor", d => d._children ? "end" : "start")
      .text(d => d.data.name)
      .attr("fill", d => d.children || d._children ? "#8b9ca7" : "#5A86FF")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 5)
      .attr("stroke", "transparent")
      .attr("paint-order", "stroke");

    // Merge and transition nodes to their new positions.
    node.merge(nodeEnter).transition(transition)
      .attr("transform", d => `translate(${d.y},${d.x})`)
//       .attr("transform", d => {
//   const xOffset = (d.children || d._children) ? -20 : 20; // Parent: shift left, Child: shift right.
//   return `translate(${d.y + xOffset},${d.x})`;
// })
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // Transition exiting nodes.
    node.exit().transition(transition).remove()
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    // ---- Links Section ----
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    const linkEnter = link.enter().append("path")
      .attr("d", () => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    link.merge(linkEnter).transition(transition)
      .attr("d", diagonal);

    link.exit().transition(transition).remove()
      .attr("d", d => {
        const o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      });

    // Save the old positions for the next transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // Return the SVG DOM node.
  return svg.node();
}
</script>

<style scoped>
.tree-container {
  /* Fixed-size container; scrollbars will appear if content exceeds this size */
  margin-top: 40px;
  width: 100%;
  height: 100%;
  max-height: 600px;
  display: block;
  /* width: 700px;
    height: 600px;
    max-width: 100%; */
  /* margin: auto; */
  overflow: auto;
}
</style>
