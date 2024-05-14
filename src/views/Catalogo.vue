
<template>
  <div>
    <h1>Pesquise o nome da raca do cao que deseja ve fotos</h1>
    <input class="card text-bg-secundary mb-3" type="text" v-model="pesquisa">
    <button class="btn btn-success" @click="carregaInfo(pesquisa)">Pesquisar</button>
    <p></p>
    <div class="card mb-" style="width: auto;">
      <div class="row g-0">
        <div v-for="(item, index) in resultados" :key="index">
          <img :src="item" alt="Dog image" class="col-md-7">
          <button :disabled="!user" @click="addToFavorites(item)">Add to Favorites</button>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ pesquisa }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getDatabase,child, ref,get, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';



const firebaseConfig = {
    apiKey: "AIzaSyCfqU_Yea8s8pXAqXmY9dURzn2ZPvRRWPY",
    authDomain: "projeto-1-96d9e.firebaseapp",
    databaseURL: "https://projeto-1-96d9e-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "projeto-1-96d9e",
    storageBucket: "projeto-1-96d9e.appspot.com",
    messagingSenderId: "998227063312",
    appId: "1:998227063312:web:2be0969182327266b91095"
};

const app = initializeApp(firebaseConfig);


const db = getDatabase(app);// Import Firebase functions if you're using Firebase

export default {
  data() {
    return {
      resultados: "",
      pesquisa: "",
      user: null,
      db: getDatabase(),
      loading:true,

    }
  },
  methods: {
    carregaInfo(query) {
      query = query.toLowerCase();
      axios.get('https://dog.ceo/api/breed/' + query + '/images/random')
        .then(res => {
          this.resultados = [res.data.message] // Wrap the URL in an array
        })
        .catch(error => {
          console.log(error)
        })
    },
    addToFavorites(item) {
  if (!item || typeof item !== 'string') {
    console.log('Item is null, undefined, or not a string');
    return;
  }

  const userId = localStorage.getItem('token');
  if (!userId) {
    console.log('User id is null or undefined, delaying addToFavorites');
    setTimeout(() => this.addToFavorites(item), 100);
    return;
  }

  const path = 'users/' + userId;
  console.log('Adding item to path:', path);
  localStorage.setItem('favorito', item);

  const userRef = ref(this.db, path);
  const itemObject = { favorito: item };
  update(userRef, itemObject).then(() => {
    console.log('Item added to favorites');
    localStorage.setItem('favorito', item);
  }).catch((error) => {
    console.error('Error adding item to favorites:', error);
  });
},
},
created() {
    // Retrieve the user data from local storage
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user) {
      // Parse the user data and assign it to this.user
      this.user = JSON.parse(user);
    }
  },
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