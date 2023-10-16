<template>
    <div class="container">
     <div class="logo">
        <img alt="wtbc logo" src="./wtbc-logo.png">
      </div>
    <h1>Welcome to the Walkden<br>Thai Boxing App</h1>
    <div v-show="!isLoggedIn">
    <h2>To have access please login</h2>
  </div>
  <div v-if="isLoggedIn">
    <h2>Hello {{ userName }}</h2>
    <button @click="handleLogOut">Log Out</button>
  </div>
  <div v-else>
    <GoogleLogin :callback="callback" />
  </div>
</div>
</template>

<script>
import { decodeCredential, googleLogout } from 'vue3-google-login'


export default {
    name: "LoginForm",
    data: () => ({
        isLoggedIn: false,
        userName: ''
    }),
    mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
        }
    },
    methods: {
        callback: function (response) {
            this.isLoggedIn = true
            const userData = decodeCredential(response.credential)
            console.log(userData);
            this.userName = userData.given_name
            this.$cookies.set('user_session', response.credential);
            fetch(process.env.VUE_APP_BACKEND_API + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json'
                },
                body: JSON.stringify({
                    email: userData.email
                })
            })
            .then(() => {
                console.log('session saved');
            })
            this.$router.push('/')
            this.$router.go()

        },
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

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}
</style>