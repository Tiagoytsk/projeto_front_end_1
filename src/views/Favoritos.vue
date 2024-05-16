<template>
  <div class="fav">
    <h1>Your Favorite Dog! </h1>
    <h2>{{ user.username }}</h2>
    <img :src="favorito" alt="Favorite">
  
  <footer class="footer-basic" style="align-items: flex-end; ">
      <div class="social">
        <a href="#"><i class="icon ion-social-instagram"></i></a>
        <a href="#"><i class="icon ion-social-snapchat"></i></a>
        <a href="#"><i class="icon ion-social-twitter"></i></a>
        <a href="#"><i class="icon ion-social-facebook"></i></a>
      </div>
      <p class="copyright">Tiago Pedra © 2024</p>
    </footer></div>
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
<style>
body, html {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0; /* Add this line */
  padding: 0;
}
 .fav{
  box-sizing: border-box;
  margin: 0; /* Add this line */
  padding: 0;
  width: 100%;
  height: 100%;
}
.footer-basic {
  position: fixed; /* Add this line */
  left: 0;
  bottom: 0; /* Add this line */
  width: 100%;
  padding: 40px;
  background-color: #000000;
  color: #4b4c4d;
  box-sizing: border-box;
}

.footer-basic ul {
  padding: 0;
  list-style: none;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
}

.footer-basic li {
  padding:0 10px;
}

.footer-basic ul a {
  color:inherit;
  text-decoration:none;
  opacity:0.8;
}

.footer-basic ul a:hover {
  opacity:1;
}

.footer-basic .social {
  text-align:center;
  padding-bottom:25px;
}

.footer-basic .social > a {
  font-size:24px;
  width:40px;
  height:40px;
  line-height:40px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
  border:1px solid #ccc;
  margin:0 8px;
  color:inherit;
  opacity:0.75;
}

.footer-basic .social > a:hover {
  opacity:0.9;
}

.footer-basic .copyright {
  margin-top:15px;
  text-align:center;
  font-size:13px;
  color:#aaa;
  margin-bottom:0;
}
</style>
