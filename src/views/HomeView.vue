<template>
    <div class="home-view">
      <h1 class="t1">Bem vindo ao dog photos</h1>
      <p>Neste website voce e capaz de pesquisar fotos de caes como esta.</p>
      <div class="t1" v-for="(item, index) in resultados" :key="index">
        <img :src="item" alt="Dog image">
      </div>
      <p></p>
      <p>O site conta tambem com uma pagina de favoritos para voce guardar a foto que gostou mais. Para ter acesso a estas funcoes todas basta fazer o seu login caso contrario ao clicar nas paginas de catalogo ou de favoritos sera riderecionado para a pagina do login.</p>
      <p>Para pesquisar e simples ecreva a raca do cao que deseaja ver fotos. Ao clicar no botao de pesquisa a pagina automaticamente ira mostrar uma foto do nome da raca que colocou na pesquisa.</p>
      <p>Para ver mais fotos da mesma raca basta clicar outravez no botao de pesquisa.</p>
      <p>Na aba dos favoritos voce encontra a foto que voce escolheu como foto favorita.</p>
      <p>Para ter acesso a estas funcionalidades e facil basta ir a aba do login e se nao for resgistado criar uma nova conta. Se ja tiver e so dar login e ja esta tudo a postos para disfrutar das suas fotos de caes.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        resultados: []
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
      this.carregaInfo('bulldog'); // Replace 'bulldog' with the breed you want
    }
  }
  </script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.t1 {
  text-align: center;
}
</style>
