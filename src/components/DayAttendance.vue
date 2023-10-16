<template>
    <div>
        <p>Today's attendance</p>
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th @click="sortStudentsByName()" class="sorter" scope="col">Name</th>
                        <th @click="sortStudentsByRank()" class="sorter" scope="col">Rank</th>
                        <th @click="sortStudentsByCategory()" class="sorter" scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, index) in attendingStudents" :key="student._id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ student.name }}</td>
                        <td>{{ student.graduation }}</td>
                        <td>{{ getStudentCategory(student) }}</td>
                        <td v-if="student.sessionData">Session ID: {{ student.sessionData.id }}</td>
                        <td v-if="student.sessionData">Session Date: {{ student.sessionData.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div>
        <p>Today there are {{ attendingStudents.length }} students attending the session. <br>
          {{ seniorCount }} Seniors <br> {{ juniorCount }} Juniors </p>
      </div> -->
        <button @click="showFullTable">Check Attendance</button>
    </div>
</template>
  
<script>
import { useRoute } from 'vue-router'
import moment from 'moment'

export default {
    name: 'DayAttendance',
    data() {
        return {
            students: [
                {
                    id: '',
                    name: '',
                    dob: '',
                    graduation: '',
                }
            ],
            session: {
                id: '',
                date: '',
                attendance: [],
            },
        };
    },

    mounted() {
        const route = useRoute();
        fetch(`http://localhost:3000/session/${route.params._id}`)
            .then((res) => res.json())
            .then((data) => {
                this.session.id = route.params._id;
                this.session.date = moment(data.date).format('DD-MM-YYYY');
                this.session.attendance = data.attendance;
                this.fetchStudents();
            });
    },

    methods: {
        async fetchStudents() {
            try {
                const response = await fetch('http://localhost:3000/students/');
                if (response.ok) {
                    const data = await response.json();
                    this.students = data;
                    this.studentSessionData();
                } else {
                    this.students = []
                }
            } catch (error) {
                console.error('Error fetching student data:', error)
                this.students = []
            }
        },

        studentSessionData() {
            this.students.forEach((student) => {
                if (this.session.attendance.includes(student.id)) {
                    student.sessionData = {
                        id: this.session.id,
                        date: this.session.date,
                    };
                }
            });
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
        computed: {
            attendingStudents() {
                return this.students.filter(student => this.session.attendance.includes(student.id));
            },
            seniorCount() {
                return this.attendingStudents.filter(student => this.getStudentCategory(student) === 'Senior').length;
            },
            juniorCount() {
                return this.attendingStudents.filter(student => this.getStudentCategory(student) === 'Junior').length;
            },
        }
    }
}
</script>
