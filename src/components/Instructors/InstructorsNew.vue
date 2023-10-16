<template>
    <button class="back" @click="goBack">Back</button>
    <h1>New Instructor</h1>
    <h3>Add a new instructor</h3>

    <div class="newInstructorForm">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="Name" v-model="instructor.name" pattern="[A-Za-z ]+" required>
        <label for="email">Email:</label>
        <input type="email" name="email" placeholder="example@example.com" v-model="instructor.email" required>
        <label for="phone">Phone Number:</label>
        <input type="tel" name="phoneNumber" placeholder="Phone Number" v-model="instructor.phone" pattern="[0-9]*"
            required>
        <label for="isAdmin">Administrator:</label>
        <select name="isAdmin" v-model="instructor.isAdmin" required>
            <option value="false">No</option>
            <option value="true">Yes</option>
        </select>
        <button class="addnew" @click="addNew">Add</button>
    </div>
    <custom-alert v-if="showAlert" :title="alertTitle" :message="alertMessage" @close="showAlert = false" />
</template>
<script>
import CustomAlert from '../Alert.vue'
export default {
    name: 'InstructorsNew',
    data: () => ({
        instructor: {
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

    methods: {
        addNew: function () {
            this.alertTitle = ''
            this.alertMessage = ''

            if (!this.instructor.name) {
                this.showAlert = true
                this.alertTitle = 'Instructor not created!';
                this.alertMessage = `Please make sure the "Name" field is filled properly!'`
                return
            }
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

            this.instructor.isAdmin = this.instructor.isAdmin === "true"

            fetch('http://localhost:3000/instructors', {
                method: "POST",
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
                    if (res.status === 200) {
                        this.showAlert = true
                        this.alertTitle = 'Success'
                        this.alertMessage = `${this.instructor.name} has been added as a new instructor!`;

                        this.instructor.name = '',
                            this.instructor.email = '',
                            this.instructor.phone = '',
                            this.instructor.isAdmin = false
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

.newInstructorForm {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: #222121;
    justify-content: center;
    margin: 20px auto;
    width: 30vw;
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

.addnew {
    background-color: #eee;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.addnew:hover {
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
}</style>
