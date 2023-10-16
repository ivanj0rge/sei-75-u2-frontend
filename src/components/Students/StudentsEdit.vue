<template>
    <button class="back" @click="goBack">Back</button>
    <h1>Edit Student</h1>
    <h3>Edit student details</h3>

    <div class="StudentForm">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="Name" v-model="student.name" required>
        <label for="email">Email:</label>
        <input type="text" name="email" placeholder="Email" v-model="student.email">
        <label for="phone">Phone Number:</label>
        <input type="text" name="phoneNumber" placeholder="Phone Number" v-model="student.phone">
        <label for="dob">DOB:</label>
        <input type="date" name="DOB" placeholder="Date of Birth" v-model="student.dob" required>
        <label for="graduation">Ranking:</label>
        <select name="graduation" v-model="student.graduation">
            <option value="Newbie">Newbie</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Blue 1">Blue 1</option>
            <option value="Blue 2">Blue 2</option>
            <option value="Brown 1">Brown 1</option>
            <option value="Brown 2">Brown 2</option>
            <option value="Brown 3">Brown 3</option>
            <option value="Brown 4">Brown 4</option>
            <option value="Red">Red</option></select>
        <button class="save" @click="editStudent">Save</button>
    </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
    name: 'StudentsEdit',
    data: () => ({
        student: {
            id: '',
            name: '',
            email: '',
            phone: '',
            dob: '',
            graduation: ''
        }
    }),

    mounted() {
        const route = useRoute()
        fetch(`http://localhost:3000/students/${route.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.student.id = route.params.id,
                this.student.name = data.name,
                this.student.email = data.email,
                this.student.phone = data.phone,
                this.student.dob = data.dob,
                this.student.graduation = data.graduation
            })
    },

    methods: {
        editStudent: function () {
            fetch(`http://localhost:3000/students/${this.student.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.student.name,
                    email: this.student.email,
                    phone: this.student.phone,
                    dob: this.student.dob,
                    graduation: this.student.graduation
                })
            })
                .then(res => {
                    console.log(res.status)
                        alert(`Student ${this.student.name} has been updated successfully!`);
                        this.$router.replace({ path: `/students` })
                    })     
        },
        goBack: function () {
            window.history.back();
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 40px;
    color: #222121;
}

h3 {
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
}

input {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px rgba(248, 246, 246, 0.4);
}

select {
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px rgba(248, 246, 246, 0.4);
}

.save {
    background-color: #eee;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.save:hover {
    background-color: #259125;
    color: #ddb916 ;
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

.back:hover {
    background-color: #259125;
    color: #ddb916 ;
}

button {
    cursor: pointer;
}

.StudentForm {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    margin: 20px auto;
    width: 35vw;
    padding: 20px;
    color: #222121;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);

}
</style>