<template>
    <div v-if="!isLoggedIn">
      <h1>{{ mode === 'login' ? 'Login' : 'Register' }}</h1>
      <form @submit.prevent="mode === 'login' ? login() : register()">
        <label for="username">Username:</label>
        <p></p>
        <input class="card text-bg-secundary mb-3" type="text" id="username" v-model="username" required>
        <p></p>
        <label for="password">Password:</label>
        <p></p>
        <input class="card text-bg-secundary mb-3" type="password" id="password" v-model="password" required>
        <p></p>
        <button type="submit" class="btn btn-success">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
        <p></p>
      </form>
      <button @click="toggleMode" class="btn btn-success">{{ mode === 'login' ? 'Switch to Register' : 'Switch to Login' }}</button>
      <p v-if="loginError" class="error">You are already logged in.</p>
      <p v-if="registerError" class="error">{{ registerError }}</p>
    </div>
    <div v-else>
      <h1>Welcome, {{ user.username }}</h1>
      <button @click="logout" class="btn btn-success">Logout</button>
  </div>
  <footer class="footer-basic" style="align-items: flex-end; ">
      <div class="social">
        <a href="#"><i class="icon ion-social-instagram"></i></a>
        <a href="#"><i class="icon ion-social-snapchat"></i></a>
        <a href="#"><i class="icon ion-social-twitter"></i></a>
        <a href="#"><i class="icon ion-social-facebook"></i></a>
      </div>
      <p class="copyright">Tiago Pedra © 2024</p>
    </footer>
</template>

  
  <script>
  import { initializeApp, getApps } from 'firebase/app';
  import { getDatabase,get, ref, push, set, onValue } from 'firebase/database';
  import { getAuth, setPersistence, browserSessionPersistence, onAuthStateChanged, signOut ,createUserWithEmailAndPassword } from 'firebase/auth';
  import { resolveTypeElements } from 'vue/compiler-sfc';
  
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
  const db = getDatabase(app);
  
  export default {
    name: 'LoginRegister',
    data() {
      return {
        username: '',
        password: '',
        user: null,
        isLoggedIn:false,
        loginError: false,
        mode: 'login',
        auth: getAuth(app),
        registerError: '',
      };
    },
    created() {
  const usercheck = JSON.parse(localStorage.getItem("user"));
  if (usercheck) {
    this.isLoggedIn = true;
    this.user = usercheck;
    console.log("User is already logged in");
  } else {
    this.login();
  }
},
   
    methods: {
      checkLoginStatusAndLogin() {
   
        if (!this.isLoggedIn) {
      this.login();
    }
    },
        toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
    },
    async login() {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  const data = snapshot.val();
  
  for(let userId in data) {
    if(data[userId].username === this.username && data[userId].password === this.password) {
      console.log("User logged in with ID: ", userId);
      this.user = data[userId];
      console.log(this.user);
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(this.user));
      const user = JSON.parse(localStorage.getItem('user'));
      const favorito = user ? user.favorito : null;
      localStorage.setItem('favorito', favorito)
      localStorage.setItem("token", userId);
      this.$router.push({
        username:this.username
      })
      return;
    }
  }
  console.log("No user found or incorrect password");
},


  async register() {
      const usersRef = ref(db, 'users');
        let userExists = false;
        const snapshot = await get(usersRef);
        const data = snapshot.val();
        for(let userId in data) {
          if(data[userId].username === this.username) {
            userExists = true;
            break;
          }
        }

        if(userExists) {
          console.log("User already exists");
          this.registerError = 'A user with this username already exists.'; // Set the register error
          return;
        }

        // Create a new user
        try {
          const newUserRef = push(usersRef);
          await set(newUserRef, {
            username: this.username,
            password: this.password
          });
          console.log("User registered with ID: ", newUserRef.key);
          this.registerError = '';
        } catch (error) {
          console.error("Error adding user: ", error);
          this.registerError = 'An error occurred while registering.';
        }
},
  logout() {
    this.user = null;
    this.isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem('token')
    this.$router.push({ name: 'Login' });
  },
},
watch: {

  isLoggedIn: function(newVal, oldVal) {
    if (!newVal) {
      this.user = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    }
  }
}
    }

  </script>
  
  <style scoped>
    .error {
      color: red;
    }
  </style>