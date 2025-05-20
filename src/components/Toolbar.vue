<template>
  <div class="flex h-full">
    <!-- Main Menu -->
    <div class="w-32 bg-white shadow-sm border-r border-gray-200">
      <div class="flex flex-col items-center py-4 space-y-4 px-2">
        <el-button
          v-for="item in mainMenuItems" 
          :key="item.id"
          :type="activeMenu === item.id ? 'primary' : 'default'"
          text
          class="w-full h-12 !p-0 m-0"
          :class="[
            activeMenu === item.id 
              ? '!bg-blue-500 text-white' 
              : '!text-gray-500 hover:!text-blue-500'
          ]"
          @click="setActiveMenu(item.id)"
        >
          <Icon :icon="item.icon" class="text-xl" />
          <span class="text-sm">{{ item.label }}</span>
        </el-button>
      </div>
    </div>

    <!-- Submenu -->
    <div class="w-64 bg-white shadow-sm">
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">
          {{ getActiveMenuTitle }}
        </h2>

        <!-- Elements Submenu -->
        <div v-if="activeMenu === 'elements'">
          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-4">
            <button
              v-for="tab in elementTabs" 
              :key="tab.id"
              class="px-4 py-2 text-sm font-medium transition-colors duration-200"
              :class="[
                activeElementTab === tab.id 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-blue-500'
              ]"
              @click="setActiveElementTab(tab.id)"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <ShapesMenu
            v-if="activeElementTab === 'shapes'"
            :current-tool="currentTool"
            @tool-change="$emit('tool-change', $event)"
          />

          <LinesMenu
            v-if="activeElementTab === 'lines'"
            :current-tool="currentTool"
            @tool-change="$emit('tool-change', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ShapesMenu from './toolbar/ShapesMenu.vue'
import LinesMenu from './toolbar/LinesMenu.vue'

const props = defineProps({
  currentTool: {
    type: String,
    default: 'rectangle'
  }
})

const emit = defineEmits(['tool-change'])

const activeMenu = ref('elements')
const activeElementTab = ref('shapes')

const mainMenuItems = [
  { id: 'elements', icon: 'mdi:shape-outline', label: 'Elements' }
]

const elementTabs = [
  { id: 'shapes', label: 'Shapes' },
  { id: 'lines', label: 'Lines' }
]

const getActiveMenuTitle = computed(() => {
  return mainMenuItems.find(item => item.id === activeMenu.value)?.label
})

const setActiveMenu = (menuId) => {
  activeMenu.value = menuId
}

const setActiveElementTab = (tabId) => {
  activeElementTab.value = tabId
}
</script> 