<template>
  <div v-if="visible" class="absolute top-0 left-0 w-full flex justify-center items-center bg-white rounded-lg shadow-lg p-2 z-50">
    <el-button-group>
      <el-button 
        type="primary" 
        size="small"
        @click="bringToFront"
        class="!px-3"
      >
        <el-icon class="mr-1"><Top /></el-icon>
        Front
      </el-button>
      <el-button 
        type="primary" 
        size="small"
        @click="sendToBack"
        class="!px-3"
      >
        <el-icon class="mr-1"><Bottom /></el-icon>
        Back
      </el-button>
      <el-button 
        type="danger" 
        size="small"
        @click="deleteSelectedObject"
        class="!px-3"
      >
        <el-icon class="mr-1"><Delete /></el-icon>
        Delete
      </el-button>
    </el-button-group>
  </div>
</template>

<script setup>
import { Top, Bottom, Delete } from '@element-plus/icons-vue'
import { deleteSelectedObject, bringToFront, sendToBack } from '@/utils/canvasFunctions'

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.el-button-group {
  display: flex;
  gap: 4px;
}
</style> 