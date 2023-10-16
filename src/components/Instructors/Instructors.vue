<template>
    <div>
      <router-link to="/instructors/new"><button class="add">Add New</button></router-link>
      <h1>All Instructors</h1>
      <table class="table table-striped transparent-table">
        <thead>
          <tr>
            <th @click="sortInstructorsByName()" class="sorter" scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="instructor in instructors" :key="instructor._id">
            <td class="cell">{{ instructor.name }}</td>
            <td class="cell">{{ instructor.phone }}</td>
            <td class="cell">{{ instructor.email }}</td>
            <td class="cell">
              <router-link :to="`/instructors/edit/${instructor._id}`"><button @click="editInstructor(instructor)">Edit</button></router-link>
              <button @click="deleteInstructor(instructor)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script>
const API_URL = process.env.VUE_APP_BACKEND_API + '/instructors';

export default {
    name: 'InstructorsPage',
    data: () => ({
        error: '',
        instructors: {},
        isNameAscending: true
    }),
    mounted() {
        fetch(API_URL)
            .then(response => response.json())
            .then(result => {
                this.instructors = result.data
            })
    },
    methods: {
        toggleOptions(instructor) {
            instructor.showOptions = !instructor.showOptions;
        },
        editInstructor(instructor) {
            console.log('Editing instructor:', instructor);
        },
        sortInstructorsByName() {
      this.isNameAscending = !this.isNameAscending;

      this.instructors.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (this.isNameAscending) {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    },
        deleteInstructor(instructor) {
            if (!instructor || !instructor._id) {
                console.error('Invalid instructor data or _id missing.');
                return;
            }
            const confirmDelete = window.confirm(`You are about to delete "${instructor.name}" from the records. Do you wish to continue?`)

            if (confirmDelete) {
                fetch(`${API_URL}/${instructor._id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        alert(`${instructor.name} deleted from records`)
                        const index = this.instructors.indexOf(instructor)
                        if (index !== -1) {
                            this.instructors.splice(index, 1);
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
    color: #ddb916 ;
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