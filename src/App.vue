<script>
import { RouterLink, RouterView } from 'vue-router'
import { sidebarWidth } from '@/components/sidebar/state.js'
import Sidebar from '@/components/sidebar/Sidebar.vue'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
}
}
</script>

<template>
  <Sidebar />
  <div :style="{'margin-left':sidebarWidth}">
    <RouterView />
  </div>
  
</template>



