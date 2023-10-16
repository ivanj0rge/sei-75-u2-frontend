import { createWebHistory, createRouter } from 'vue-router'
import LoginForm from '../components/Auth/Login.vue'
import HomePage from '../views/HomePage.vue'
import InstructorsPage from '../components/Instructors/Instructors.vue'
import InstructorsNew from '../components/Instructors/InstructorsNew.vue'
import InstructorsEdit from '../components/Instructors/InstructorsEdit.vue'
import StudentsPage from '../components/Students/Students.vue'
import StudentsNew from '../components/Students/StudentsNew.vue'
import StudentsEdit from '../components/Students/StudentsEdit.vue'
import StudentsDetails from '../components/Students/StudentsDetails.vue'
import AttndList from '../components/AttndList.vue'
import NotFound from '../components/NotFound.vue'
// import DayAttendance from '../components/DayAttendance.vue'

const routes = [

    {
        name: 'LoginForm',
        path: '/login',
        component: LoginForm,
        meta: { requiresAuth: false }
    },

    {
        name: 'HomePage',
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        name: 'InstructorsPage',
        path: '/instructors',
        component: InstructorsPage
    },
    {
        name: 'InstructorsNew',
        path: '/instructors/new',
        component: InstructorsNew,
        meta: { requiresAuth: true }
    },
    {
        name: 'InstructorsEdit',
        path: '/instructors/edit/:id',
        component: InstructorsEdit,
        meta: { requiresAuth: true }
    },
    {
        name: 'StudentsPage',
        path: '/students',
        component: StudentsPage
    },
    {
        name: 'StudentsNew',
        path: '/students/new',
        component: StudentsNew,
        meta: { requiresAuth: true }
    },
    {
        name: 'StudentsEdit',
        path: '/students/edit/:id',
        component: StudentsEdit,
        meta: { requiresAuth: true }
    },
    {
        name: 'StudentsDetails',
        path: '/Students/details/:id',
        component: StudentsDetails,
        meta: { requiresAuth: true }
    },
    {
        name: 'AttndList',
        path: '/attendance',
        component: AttndList
    },
    {
        name: 'NotFound',
        path: '/:catchAll(.*)',
        component: NotFound, 
        meta: { requiresAuth: false }
      }
    // {
    //     name: 'DayAttendance',
    //     path: '/attendance/:id',
    //     component: DayAttendance
    // }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
