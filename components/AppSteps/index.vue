<template>
  <div class="step-container">
    <div v-for="(step, index) in steps" :key="index" class="step-item">
      <div class="step-circle" :class="{ active: currentStep >= index + 1 }">
        {{ index + 1 }}
      </div>
      <div class="step-text">{{ step }}</div>
      <div v-if="index < steps.length - 1" 
           class="step-line lg:w-100px w-20px"
           :class="{ active: currentStep > index + 1 }" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => []
  },
  currentStep: {
    type: Number,
    default: 1
  }
})
</script>

<style scoped>
.step-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  position: relative;
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #E5E7EB;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.step-circle.active {
  background: linear-gradient(to bottom, #68A9FD 0%, #3A7BE1 100%);
  color: white;
}

.step-text {
  margin: 0 12px;
  font-size: 14px;
  color: #6B7280;
}

.step-line {
  height: 1px;
  background: #E5E7EB;
  margin: 0 4px;
}

.step-line.active {
  background: #3B82F6;
}
</style>
