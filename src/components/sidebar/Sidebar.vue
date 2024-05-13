<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  components: {
    SidebarLink
  },
  data() {
    return {
      collapsed: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<template>
    <div class="sidebar" :style="{width: sidebarWidth}">
        <h1>
            <span v-if="collapsed">
                <div>D</div>
            </span>
            <span v-else>Dog photos</span>
        </h1>
        <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
        <SidebarLink to="/catalogo" icon="fas fa-book">About</SidebarLink>
        <SidebarLink to="/favoritos" icon="fas fa-star">Favorito</SidebarLink>
        <SidebarLink to="/login" icon="fas fa-sign-in-alt"><h1>ola</h1>login</SidebarLink> 
        
        <span class="collapse-icons" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
            <i class="fas fa-angle-double-left"></i>
        </span>

    </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sedebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar{
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  
}

.colaapse-icon{
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180{
  transform: rotate(180deg);
  transition: 0.2s linear;
}

</style>