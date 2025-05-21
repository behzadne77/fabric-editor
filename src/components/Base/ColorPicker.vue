<template>
  <div class="color-picker">
    <!-- Default Colors -->
    <div class="default-colors mb-3">
      <div class="grid grid-cols-6 gap-2">
        <div
          v-for="color in defaultColors"
          :key="color"
          class="color-item"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        />
      </div>
    </div>

    <!-- Custom Color Picker -->
    <div class="custom-color">
      <el-color-picker
        v-model="customColor"
        @change="selectColor"
      />
      <el-text class="mx-1">{{ customColor }}</el-text>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '#000000'
  }
})

const emit = defineEmits(['update:modelValue', "change"])

const defaultColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#0000FF', // Blue
  '#00FF00', // Green
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#808080', // Gray
  '#800000', // Maroon
  '#008000', // Dark Green
  '#000080'  // Navy
]

const customColor = ref(props.modelValue)

const selectColor = (color) => {
  emit('update:modelValue', color)
  emit("change", color)
  customColor.value = color
}
</script>

<style scoped>
.color-picker {
  width: 100%;
}

.default-colors {
  width: 100%;
}

.color-item {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s;
}

.color-item:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-color {
  margin-top: 8px;
  display: flex;
  justify-content: flex-start;
  border: 1px solid #00000020;
  border-radius: 6px;
  padding: 4px 6px;
}
</style> 