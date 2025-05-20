<template>
  <el-header class="bg-white shadow-sm">
    <div class="flex items-center justify-between h-full px-4">
      <div class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
        <h1 class="text-xl font-bold text-gray-800">Konva Editor</h1>
      </div>
      <div class="flex space-x-4">
        <el-button type="primary" @click="$emit('save')" class="btn btn-primary">
          <el-icon class="mr-1"><Document /></el-icon>
          Save
        </el-button>
        <el-button type="success" @click="$emit('download')" class="btn btn-success">
          <el-icon class="mr-1"><Download /></el-icon>
          Download
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { Document, Download } from '@element-plus/icons-vue'

defineEmits(['save', 'download'])
</script>

<style scoped>
.editor-header {
  background-color: white;
  box-shadow: var(--shadow-sm);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--spacing-md);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo {
  height: 2rem;
  width: 2rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
}

.icon {
  margin-right: var(--spacing-xs);
}
</style> 