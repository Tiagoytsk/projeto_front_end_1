<template>
  <div>
    <h1>Your Favorite Dog! </h1>
    <h2>{{ user.username }}</h2>
    <img :src="favorito" alt="Favorite">
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorito: localStorage.getItem('favorito'),
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
}
</script>