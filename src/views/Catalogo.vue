
<template>
  <div>
    <h1>Pesquise o nome da raca do cao que deseja ve fotos</h1>
    <input class="card text-bg-secundary mb-3" type="text" v-model="pesquisa">
    <button class="btn btn-success" @click="carregaInfo(pesquisa)">Pesquisar</button>
    <p></p>
  </div>
  <div class="card mb-" style="width: auto;">
  <div class="row g-0">
    <div v-for="(item, index) in resultados" :key="index">
      <img :src="item" alt="Dog image" class="col-md-7">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ pesquisa }}</h5>
      </div>
    </div>
  </div>
</div>
<h1>{{ this.user }}</h1>
<!--- <div class="card text-bg-dark">
  <div v-for="(item, index) in resultados" :key="index">
      <img :src="item" alt="Dog image">
    </div>
  <div class="card-img-overlay">
    <h5 class="card-title">{{ pesquisa }}</h5>
  </div>
</div>-->

</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      resultados: "",
      pesquisa: ""
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
    }
  },
  created() {
    // Code to run when the Vue instance is created goes here
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
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