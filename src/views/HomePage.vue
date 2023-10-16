<template>
    <div>
        <div>
            <transition name="fade" mode="out-in">
                <h1 v-if="showH1">Sawasdee Khru</h1>
                <h2 v-else>Hello {{ userName }}</h2>
            </transition>
            <p>Today is: {{ currentDate }}</p>
        </div>
        <div>
            <AttndList />
        </div>
    </div>
</template>
  
<script>
import AttndList from '@/components/AttndList.vue'
import { decodeCredential } from 'vue3-google-login'

export default {
    name: "HomePage",
    data() {
        return {
            sessions: [],
            currentDate: new Date().toDateString(),
            selectedStudents: [],
            students: [],
            isLoggedIn: false,
            userName: '',
            showH1: true
        };
    },
    mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name

            setTimeout(() => {
                this.showH1 = false;
            }, 2000);
        }
    },
    components: { AttndList }
};

</script>
  
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}</style>