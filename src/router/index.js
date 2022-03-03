import { createRouter, createWebHashHistory } from 'vue-router';
import Customer from '../components/Customer.vue'
import CreateCustomer from '../components/CreateCustomer.vue'
import UpdateCustomer from '../components/UpdateCustomer.vue'
const routes = [
    {
        path: '', component: Customer
    },
    {
        path: '/create-customer', component: CreateCustomer
    },
    {
        path: '/update-customer/:id', component: UpdateCustomer
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;