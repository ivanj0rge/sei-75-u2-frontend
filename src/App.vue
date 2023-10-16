<template>
  <div v-if="isLoggedIn">
    <header>
      <NavBar />
    </header>
    <main>
      <router-view :key="$route.path" />
    </main>
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { decodeCredential } from 'vue3-google-login'
import Login from '@/components/Auth/Login.vue'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      userName: '',
    }
  },

  mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
        }
      },
  components: { NavBar, Login }
  
}

</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  background-color: #ddb916;
  color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #259125;
  color: #FFFFFF;
  padding: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.7);
  border: 2px solid #FFA500
}

main {
  flex-grow: 1;
  padding: 20px;
  text-align: center;
}

.sorter {
  cursor: pointer;
}

.navbar {
  background-color: #FFA500;
  color: #f7f5f5;
  padding: 10px 0;
  text-align: center;
}

button {
  background-color: #eee;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.7);
}


button:hover {
  background-color: #259125;
  color: #ddb916;
}
</style>
