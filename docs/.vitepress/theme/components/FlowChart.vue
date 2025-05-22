<template>
  <div class="flowchart">
    <div class="step">TS Code</div>
    <div class="arrow">→</div>
    <div class="step">ESLint Checks</div>
    <div class="arrow">→</div>
    <div class="step">Prettier Formats</div>
    <div class="arrow">→</div>
    <div class="step">TS Compiler</div>
    <div class="arrow">→</div>
    <div class="step">Safe JS Output</div>
  </div>
</template>

<style>
.flowchart {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 1rem 0;
}

.step {
    border: 1px solid;
  padding: 12px 20px;
  border-radius: 7px;
  /* font-size: 1rem; */
  /* font-weight: 500; */
  text-align: center;
}

.arrow {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

/* Responsive layout for screens narrower than 768px */
@media (max-width: 768px) {
  .flowchart {
    flex-direction: column;
    align-items: center;
  }

  .arrow {
    transform: rotate(90deg); /* Rotates the arrow to point downwards */
  }
}
</style>
