<template>
    <button class="back" @click="goBack">Back</button>
    <h1>Edit Instructor</h1>
    <h3>Edit instructor details</h3>

    <div class="InstructorForm">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="Name" v-model="instructor.name" required>
        <label for="email">Email:</label>
        <input type="text" name="email" placeholder="Email" v-model="instructor.email">
        <label for="phone">Phone Number:</label>
        <input type="text" name="phoneNumber" placeholder="Phone Number" v-model="instructor.phone">
        <label for="isAdmin">Administrator:</label>
        <select name="isAdmin" v-model="instructor.isAdmin" required>
            <option value="false">No</option>
            <option value="true">Yes</option>
        </select>
        <button class="save" @click="editInstructor">Save</button>
    </div>
    <custom-alert v-if="showAlert" :title="alertTitle" :message="alertMessage" @close="showAlert = false" />
</template>
<script>
import { useRoute } from 'vue-router'
import CustomAlert from '../Alert.vue'

export default {
    name: 'InstructorsEdit',
    data: () => ({
        instructor: {
            id: '',
            name: '',
            email: '',
            phone: '',
            isAdmin: false
        },
        showAlert: false,
        alertTitle: '',
        alertMessage: '',
    }),

    components: {
        'custom-alert': CustomAlert,
    },

    mounted() {
        const route = useRoute()
        fetch(`http://localhost:3000/instructors/${route.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.instructor.id = route.params.id,
                    this.instructor.name = data.name,
                    this.instructor.email = data.email,
                    this.instructor.phone = data.phone,
                    this.instructor.isAdmin = data.admin
            })
    },

    methods: {
        editInstructor: function () {
            fetch(`http://localhost:3000/instructors/${this.instructor.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.instructor.name,
                    email: this.instructor.email,
                    phone: this.instructor.phone,
                    isAdmin: this.instructor.isAdmin
                })
            })
                .then(res => {
                    if (!/^[A-Za-z\s]+$/.test(this.instructor.name)) {
                        this.showAlert = true;
                        this.alertTitle = 'Invalid Name';
                        this.alertMessage = 'Name should contain only letters and spaces.';
                        return;
                    }

                    if (!/^\d+$/.test(this.instructor.phone)) {
                        this.showAlert = true;
                        this.alertTitle = 'Invalid Phone Number';
                        this.alertMessage = 'Phone Number should contain only numbers.';
                        return;
                    }

                    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(this.instructor.email)) {
                        this.showAlert = true;
                        this.alertTitle = 'Invalid Email';
                        this.alertMessage = 'Email should be in the format "example@example.com".';
                        return;
                    }
                    if (res.ok) {
                        this.showAlert = true
                        this.alertTitle = 'Success!'
                        this.alertMessage = `${this.instructor.name} has been updated successfully!`

                        setTimeout(() => {
                            this.$router.replace({ path: `/instructors` });
                        }, 2000);
                    }
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
    color: #ddb916;
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
    color: #ddb916;
}

button {
    cursor: pointer;
}

.InstructorForm {
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