<template>
  <header>
    <nav>
      <div class="logo">
        <img alt="wtbc logo" src="../assets/wtbc-logo.png">
      </div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/instructors">Instructors</router-link></li>
        <li><router-link to="/students">Students</router-link></li>
        <div class="link" v-if="isLoggedIn"><router-link to="/login">
          <li @click="handleLogOut">Logout</li></router-link>
        </div>
        <div v-else>
          <router-link to="/login" custom v-slot="{ navigate }">
            <li class="link" @click="navigate" role="link">
              Login
            </li>
          </router-link>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { googleLogout } from 'vue3-google-login'
export default {
  name: 'NavBar',
  data: () => ({
    isLoggedIn: false
  }),
  mounted() {
    if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
        }
    },
  methods: {
    handleLogOut: function () {
            googleLogout()
            this.$cookies.remove('user_session')
            console.log('user logged out');
            this.isLoggedIn = false
            this.$router.push('/')
            this.$router.go()
        }
  }
}
</script>


<style scoped>
header {
  background-color: #222121;
  color: #fff;
  padding: 2px 0;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
}

.logo {
  margin: 10px;
  
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

nav li {
  margin: 0 10px;
}

a {
  text-decoration: none;
  color: #fff;
}
.link {
  text-decoration: none;
  color: #fff;
}

a:hover {
  font-size: larger;
}

.link:hover {
  font-size: larger;
  cursor: pointer;
}

</style>
