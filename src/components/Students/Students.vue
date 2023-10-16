<template>
    <div>
        <router-link to="/students/new"><button class="add">Add New</button></router-link>
        <h1>All Students</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th @click="sortStudentsByName()" class="sorter" scope="col">Name</th>
                    <th @click="sortStudentsByRank()" class="sorter" scope="col">Ranking</th>
                    <th @click="sortStudentsByCategory()" class="sorter" scope="col">Category</th>
                    <th scope="col">Details</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student._id">
                    <td class="cell">{{ student.name }}</td>
                    <td class="cell">{{ student.graduation }}</td>
                    <td class="cell">{{ getStudentCategory(student) }}</td>
                    <td class="cell">
                        <router-link :to="`/students/details/${student.id}`"><button @click="seeDetails(student)">Details</button></router-link>
                        <div v-if="student.showOptions">
                            Phone Number: {{ student.phone }} <br>
                            Email: {{ student.email }} <br>
                            DOB: {{ student.dob }}
                        </div>
                    </td>
                    <td class="cell">
                        <router-link :to="`/students/edit/${student.id}`"><button class="edit"
                                @click="editStudent(student)">Edit</button> </router-link>
                        <button class="delete" @click="deleteStudent(student)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  

<script>
const API_URL = 'http://localhost:3000/students';
export default {
    name: 'StudentsPage',
    data: () => ({
        error: '',
        students: {},
        isNameAscending: true,
        isCategoryAscending: true,
        isRankAscending: true
    }),
    mounted() {
        fetch(API_URL)
            .then(response => response.json())
            .then(result => {
                this.students = result
                console.log(this.students);
            })
    },
    methods: {
        seeDetails(student) {
            console.log('Checking student details:', student);
        },
        editStudent(student) {
            console.log('Editing student:', student);
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
                const categoryA = this.getStudentCategory(a); // Get the string category
                const categoryB = this.getStudentCategory(b);

                if (this.isCategoryAscending) {
                    return categoryA.localeCompare(categoryB); // Ascending order
                } else {
                    return categoryB.localeCompare(categoryA); // Descending order
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
        deleteStudent(student) {
            if (!student || !student.id) {
                console.error('Invalid student data or _id missing.');
                return;
            }
            const confirmDelete = window.confirm(`You are about to delete "${student.name}" from the records. Do you wish to continue?`)

            if (confirmDelete) {
                fetch(`${API_URL}/${student.id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        alert(`${student.name} deleted from records`)
                        const index = this.students.indexOf(student)
                        if (index !== -1) {
                            this.students.splice(index, 1);
                        }
                    });
            }
        }
    }
}
</script>

<style scoped>
.cell {
    text-align: center;
    vertical-align: middle;
}

h1 {
    font-size: 40px;
    color: #222121;
}

.add {
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
    text-decoration: none;
}

.add:hover {
    background-color: #259125;
    color: #ddb916;
}

button {
    cursor: pointer;
}

.table {
    margin: 20px auto;
    padding: 20px;
    color: #222121;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);

}
</style>