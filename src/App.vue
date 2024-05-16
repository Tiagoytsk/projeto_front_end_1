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
  <div id="app">
    <Sidebar />
    <div class="content" style="margin-left: 100px">
      <RouterView />
    </div>
    
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0; /* Add this line */
  padding: 0;
  

}
body, html {
  height: 600px;
  display: flex;
  flex-direction: column;
  margin: 0; /* Add this line */
    margin: 0;
  padding: 0;
}

#app {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Add this line */
  margin: 0;
  padding: 0;

  
}
.main-content {
  flex: 1 0 auto;
}

</style>


