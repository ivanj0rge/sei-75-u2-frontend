<template>
  <div>
    <button v-if="!currentSession || currentSession.length === 0" @click="createNewSession">Create New Session</button>
    <div v-else>

      <div v-if="!showAttendanceView">
        <p>Please check today's attendance</p>
        <table class="table table-striped" id="ckecking-attendance">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th @click="sortStudentsByName()" class="sorter" scope="col">Name</th>
              <th @click="sortStudentsByRank()" class="sorter" scope="col">Rank</th>
              <th @click="sortStudentsByCategory()" class="sorter" scope="col">Category</th>
              <th scope="col">Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" :key="student._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ student.name }}</td>
              <td>{{ student.graduation }}</td>
              <td>{{ getStudentCategory(student) }}</td>
              <td><input type="checkbox" v-model="student.attendance"></td>
            </tr>
          </tbody>
        </table>

        <button @click="saveRecords">Save</button>
      </div>

      <div v-else>
        <p>Today's attendance</p>
        <table class="table table-striped" id="session-attendance">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th @click="sortStudentsByName()" class="sorter" scope="col">Name</th>
              <th @click="sortStudentsByRank()" class="sorter" scope="col">Rank</th>
              <th @click="sortStudentsByCategory()" class="sorter" scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in attendingStudentsData" :key="student.id">
              <th scope="row">{{ index + 1 }}</th>
              <td class="normal"><router-link :to="`/students/details/${student.id}`">{{ student.name }}</router-link></td>
              <td>{{ student.graduation }}</td>
              <td>{{ getStudentCategory(student) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="">
          <p>Today there are {{ attendingStudents.length }} students attending the session. <br>
            {{ seniorCount }} Seniors <br> {{ juniorCount }} Juniors </p>
        </div>
        <button @click="showFullTable">Check Attendance</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AttndList',
  data() {
    return {
      students: [
        {
          id: '',
          name: '',
          dob: '',
          graduation: '',
          attendance: false,
          sessionsAttended: []
        }
      ],
      sessions: [],
      attendingStudentsData: [],
      currentSession: [
        {
          id: '',
          date: '',
          attendance: []
        }
      ],
      isNameAscending: true,
      isCategoryAscending: true,
      isRankAscending: true,
      showAttendanceView: true
    };
  },

  async mounted() {
    this.loadSessionAttendanceData();
    this.fetchStudents();
    this.fetchSessions();
    

  },

  methods: {
    async fetchStudents() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_API + '/students/');
        if (response.ok) {
          const data = await response.json();
          this.students = data;
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    },

    async fetchSessions() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const today = `${year}-${month}-${day}`;
  try {
    const response = await fetch(process.env.VUE_APP_BACKEND_API + '/sessions');
    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data)) {
        const todaySessions = data.filter(session => session.date === today);

        if (todaySessions.length === 0) {
          this.currentSession = [];
        } else {
          this.currentSession = todaySessions;
        }
      } else {
        console.error('Data received from the API is not an array.');
      }
    } else {
      console.error('Failed to fetch session data. Status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching session data:', error);
  }
},

    async createNewSession() {
      const currentDate = new Date()
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1
      const day = currentDate.getDate();
      const today = `${year}-${month}-${day}`;

      if (this.sessions.some(session => session.date === today)) {
        if (confirm("A session for today already exists. Do you want to create another?")) {
          this.createNewSessionRecord(today);
        }
      } else {
        await this.createNewSessionRecord(today);
      }
    },

    async createNewSessionRecord() {
      const currentDate = new Date()
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1
      const day = currentDate.getDate();
      const today = `${year}-${month}-${day}`;
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_API + '/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: today,
            attendance: []
          }),
        });
        if (response.ok) {
          const data = await response.json();
          this.sessions.push(data);
          this.currentSession = data;
        } else {
          console.error('Error creating a new session:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating a new session:', error);
      }
      this.saveSessionAttendanceData()
    },

    checkStudentAttendance(student) {
      student.attendance = !student.attendance;
    },
    loadSessionAttendanceData() {
      const storedData = localStorage.getItem('sessionAttendanceData');
      if (storedData) {
        this.currentSession = JSON.parse(storedData)
      }
    },

    saveSessionAttendanceData() {
      localStorage.setItem('sessionAttendanceData', JSON.stringify(this.currentSession));
    },

    async saveRecords() {
      if (this.currentSession[0]) {
        const sessionID = this.currentSession[0]._id
        const attendedStudentIds = new Set()

        this.students.forEach(async student => {
          if (student.attendance) {
            if (student.id) {
              student.sessionsAttended = [...new Set(student.sessionsAttended)]
              student.sessionsAttended.push(sessionID)
            }

            try {
              const response = await fetch(process.env.VUE_APP_BACKEND_API + `/students/${student.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: student.name,
                  email: student.email,
                  phone: student.phone,
                  dob: student.dob,
                  graduation: student.graduation,
                  sessionsAttended: student.sessionsAttended
                }),
              });
              if (!response.ok) {
                console.error('Error updating student attendance:', response.statusText);
              }
            } catch (error) {
              console.error('Error updating student attendance:', error);
            }
            attendedStudentIds.add(student.id)
          }
          this.currentSession[0].attendance = Array.from(attendedStudentIds)
          try {
            await fetch(process.env.VUE_APP_BACKEND_API + `/sessions/${sessionID}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                date: this.currentSession[0].date,
                attendance: this.currentSession[0].attendance
              }),
            });
          } catch (error) {
            console.error('Error updating session attendance:', error);
          }
        })

        await this.fetchAttendanceForCurrentSession()

        this.showAttendanceView = true

        this.saveSessionAttendanceData()
      }
    },

    async fetchAttendingStudentsData() {
    if (this.currentSession[0].attendance.length > 0) {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_API + '/students');
        if (response.ok) {
          const studentsData = await response.json();

          this.attendingStudentsData = studentsData.filter(student => this.currentSession[0].attendance.includes(student.id));
        }
      } catch (error) {
        console.error('Error fetching attending students data:', error);
      }
    } else {
      this.attendingStudentsData = []
    }
  },

    async fetchAttendanceForCurrentSession() {
  if (this.currentSession[0]) {
    const sessionID = this.currentSession[0]._id;
    try {
      const response = await fetch(process.env.VUE_APP_BACKEND_API + `/sessions/${sessionID}`);
      if (response.ok) {
        const data = await response.json();
        this.currentSession[0].attendance = data.attendance;
        console.log(data.attendance);

        await this.fetchAttendingStudentsData();
      }
    } catch (error) {
      console.error('Error fetching attendance data for the current session:', error);
    }
  }
},


    showFullTable() {
      this.showAttendanceView = false
    },

    getStudentCategory(student) {
      const dob = new Date(student.dob);
      const currentYear = new Date().getFullYear();
      const age = currentYear - dob.getFullYear();

      if (age > 15) {
        return 'Senior';
      } else {
        return 'Junior';
      }
    },

    sortStudentsByName() {
      this.isNameAscending = !this.isNameAscending;

      this.students.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (this.isNameAscending) {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    },

    sortStudentsByCategory() {
      this.isCategoryAscending = !this.isCategoryAscending;

      this.students.sort((a, b) => {
        const categoryA = this.getStudentCategory(a);
        const categoryB = this.getStudentCategory(b);

        if (this.isCategoryAscending) {
          return categoryA.localeCompare(categoryB);
        } else {
          return categoryB.localeCompare(categoryA);
        }
      })
    },

    sortStudentsByRank() {
      this.isRankAscending = !this.isRankAscending;

      this.students.sort((a, b) => {
        const rankA = a.graduation.toUpperCase();
        const rankB = b.graduation.toUpperCase();

        if (this.isRankAscending) {
          return rankA.localeCompare(rankB);
        } else {
          return rankB.localeCompare(rankA);
        }
      });
    },
     
  },
  computed: {
    attendingStudents() {
      return this.students.filter(student => student.attendance);
    },
    seniorCount() {
      return this.attendingStudents.filter(student => this.getStudentCategory(student) === 'Senior').length;
    },
    juniorCount() {
      return this.attendingStudents.filter(student => this.getStudentCategory(student) === 'Junior').length;
    },
  }
};
</script>

<style>
td.normal{
  text-decoration: none;
  cursor: pointer;
  color: black;
}

.back {
    background-color: #eee;
    color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px;
    display: flex;
    align-items: flex-end;
}
</style>