<template>
       <button class="back" @click="goBack">Back</button>
    <h1>Student Details</h1>
    <div>
    <table class="table">
        <tr>
        <th>Name:</th>
        <td>{{ student.name }}</td>
      </tr>
      <tr>
        <th>Email:</th>
        <td>{{ student.email }}</td>
      </tr>
      <tr>
        <th>Phone Number:</th>
        <td>{{ student.phone }}</td>
      </tr>
      <tr>
        <th>Date of Birth:</th>
        <td>{{ student.dob }}</td>
      </tr>
      <tr>
        <th>Ranking:</th>
        <td>{{ student.graduation }}</td>
      </tr>
      <tr>
        <th>Sessions Attended:</th>
        <td>{{ student.sessionsAttended.length }}</td>
      </tr>
      <!-- <tr>
        <th>Average Attendance:</th>
        <td>{{ calculateAverageSessionsAttended() }}</td>
      </tr> -->
    </table>
  </div>  
</template>

<script>
import { useRoute } from 'vue-router'
import moment from 'moment'
export default {
    name: 'StudentsDetails',
    data: () => ({
        student: {
            id: '',
            name: '',
            email: '',
            phone: '',
            dob: '',
            graduation: '',
            sessionsAttended: []
        },
        sessions: []
    }),

    mounted() {
        const route = useRoute()
        fetch(process.env.VUE_APP_BACKEND_API + `/students/${route.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.student.id = route.params.id,
                this.student.name = data.name,
                this.student.email = data.email,
                this.student.phone = data.phone,
                this.student.dob = moment(data.dob).format('DD-MM-YYYY'),
                this.student.graduation = data.graduation,
                this.student.sessionsAttended = data.sessionsAttended
            }),

            fetch(process.env.VUE_APP_BACKEND_API + '/sessions')
            .then(response => response.json())
            .then(result => {
                this.sessions = result
                console.log(this.sessions);
            })
    },

    methods: {
        goBack: function () {
            window.history.back();
        },

        calculateUniqueSessionsAttended: function () {
            const uniqueSessionIds = new Set();
  const seenSessionIds = new Set();

  this.student.sessionsAttended.forEach(session => {
    if (session && session.id && !seenSessionIds.has(session.id)) {
      uniqueSessionIds.add(session.id);
      seenSessionIds.add(session.id);
    }
  });

  return uniqueSessionIds.size;
},
        calculateAverageSessionsAttended: function () {
  if (this.sessions.length === 0 || this.sessions.length === null) {
    return 0;
  }
  const uniqueSessionIds = new Set();

  this.student.sessionsAttended.forEach(session => {
    if (session && session.id) {
      uniqueSessionIds.add(session.id);
    }
  });

  const average = (uniqueSessionIds.size / this.sessions.length).toFixed(2);
  return average;
},

}
}
</script>