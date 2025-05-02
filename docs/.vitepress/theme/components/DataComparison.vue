<template>
  <div class="comparison-container">
    <div class="column">
      <h3>JavaScript Usage</h3>
      <div class="usage-list">
        <div v-for="item in jsData" :key="item.category" class="usage-item">
          <span class="category">{{ item.category }}</span>
          <div class="percentage-bar">
            <div
              class="bar-fill js-fill"
              :style="{ width: item.percentage + '%' }"
            ></div>
            <span class="percentage">{{ item.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="column">
      <h3>TypeScript Usage</h3>
      <div class="usage-list">
        <div v-for="item in tsData" :key="item.category" class="usage-item">
          <span class="category">{{ item.category }}</span>
          <div class="percentage-bar">
            <div
              class="bar-fill ts-fill"
              :style="{ width: item.percentage + '%' }"
            ></div>
            <span class="percentage">{{ item.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jsData = [
  { category: "Frontend development", percentage: 86 },
  { category: "Backend development", percentage: 34 },
  { category: "Mobile apps", percentage: 17 },
  { category: "Desktop apps", percentage: 11 },
  { category: "Data visualization", percentage: 9 },
  { category: "Graphics and animation", percentage: 8 },
  { category: "Data analysis", percentage: 3 },
  { category: "Embedded apps", percentage: 3 },
  { category: "Game development", percentage: 3 },
  { category: "Machine learning", percentage: 1 },
  { category: "Other", percentage: 1 },
  { category: "For personal projects", percentage: 7 },
];

const tsData = [
  { category: "Frontend development", percentage: 89 },
  { category: "Backend development", percentage: 43 },
  { category: "Mobile apps", percentage: 16 },
  { category: "Desktop apps", percentage: 9 },
  { category: "Data visualization", percentage: 6 },
  { category: "Graphics and animation", percentage: 3 },
  { category: "Data analysis", percentage: 1 },
  { category: "Game development", percentage: 1 },
  { category: "Embedded apps", percentage: 1 },
  { category: "Other", percentage: 2 },
  { category: "For personal projects", percentage: 5 },
];
</script>

<style scoped>
.comparison-container {
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  margin: 2rem auto;
  /* padding: 1rem; */
}

.column {
  flex: 1;
  background: #f6f6f7;
  padding: 1rem;
  border-radius: 8px;
}

:root.dark .column {
  background: #202127;
}

h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  /* color: ; */
}

.usage-item {
  margin-bottom: 1rem;
}

.category {
  display: block;
  font-size: 0.9rem;
  /* color: blue; */
  margin-bottom: 0.3rem;
}

.percentage-bar {
  display: flex;
  align-items: center;
  background: white;
  height: 10px;
  border-radius: 4px;
  position: relative;
}
:root.dark .percentage-bar {
  background: #1b1b1f;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
}

.js-fill {
  background: #f0db4f; /* JS yellow */
}

.ts-fill {
  background: #3178c6; /* TS blue */
}

.percentage {
  position: absolute;
  right: 1px;
  font-size: 0.7rem;
  /* color: red; */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .comparison-container {
    flex-direction: column;
  }
}
</style>
