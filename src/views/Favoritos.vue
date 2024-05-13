

<template>
  <div>
    <h1>Your Favorite Dog! </h1>
    <h2>{{ user.username }}</h2>
    <img v-for="(favorite, index) in favorites" :key="index" :src="favorite" alt="Favorite">
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  
  export default {
  data() {
    return {
      resultados: [],
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  async created() {
    const response = await axios.get(this.favorites);
    this.resultados = response.data;
  },
  computed: {
    filteredFavorites() {
      return this.favorites.filter(favorite => favorite.userId === this.user.id);
    }
  },
  created() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User:', user); // log the user

  if (user && user.favorito) {
    this.favorites = [user.favorito]; // Wrap the favorite in an array
    console.log('Favorites:', this.favorites); // log the favorites
  } else {
    console.log('No favorites found');
  }
}
  }
  </script>
  <style>
  .form{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  }
  </style>