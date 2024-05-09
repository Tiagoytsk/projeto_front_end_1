<template>
  <div>
    <h1 v-if="user">{{ user.username }}</h1>
    <button class="btn btn-success" v-if="user" @click="logout">Logout</button>

    <div v-else>
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
  </div>
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
        loginError: false,
        mode: 'login',
        auth: getAuth(app),
        registerError: '',
      };
    },
    created() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          console.log("User is logged in with UID: ", user.uid);
        } else {
          this.user = null;
          console.log("No user is logged in");
        }
      });
    },
    methods: {
        toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
    },
      login() {
        // If a user is already logged in, return immediately
        if (this.user) {

          console.log("User is already logged in");
          this.loginError = true;
          return;
        }
  
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();
          for(let userId in data) {
            if(data[userId].username === this.username && data[userId].password === this.password) {
              console.log("User logged in");
              this.user = data[userId];
              console.log(this.user);
              const token = this.login();
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("user", JSON.stringify(this.user));
              this.$router.push({
                username:this.username
              })
              return;
            }
          }
          console.log("No user found or incorrect password");
        });
      },
      created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log("User is logged in with UID: ", user.uid);
        localStorage.setItem("isLoggedIn", true);
      } else {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
          const userData = localStorage.getItem("user");
          if (userData) {
            this.user = JSON.parse(userData);
            console.log("User is logged in with UID: ", this.user.uid);
          }
        } else {
          this.user = null;
          console.log("No user is logged in");
        }
      }
    });
},

      async register() {
  const usersRef = ref(db, 'users');
  let userExists = false;

  // Check if the user already exists
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
    this.registerError = ''; // Clear the register error if the registration is successful
  } catch (error) {
    console.error("Error adding user: ", error);
    this.registerError = 'An error occurred while registering.'; // Set the register error
  }
},
logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.user = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      console.log("User logged out");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  },
    }
  }

  </script>
  
  <style scoped>
    .error {
      color: red;
    }
  </style>