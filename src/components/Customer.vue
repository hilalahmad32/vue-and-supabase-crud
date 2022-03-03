<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { supabase } from "../supabase";
import Head from "./Head.vue";

const customers = ref({});
const total = ref(0);
const getCustomers = async () => {
  const { data } = await supabase
    .from("customers")
    .select("id,name,email,balance");
  customers.value = data;
};

const getTotalCount = async () => {
  const { data } = await supabase
    .from("customers")
    .select("*", { count: "exact" });
  total.value = data.length;
};
const deleteCustomer = async (id) => {
  const { status } = await supabase.from("customers").delete().eq("id", id);
  if (status == 200) {
    alert("delete successfully");
    getCustomers();
  } else {
    alert("something Waring");
  }
};

onMounted(() => {
  getCustomers();
  getTotalCount();
});
</script>

<template>
  <div>
    <Head />
    <v-container>
      <v-card class="m-30">
        <div class="d-flex justify-space-between">
          <v-card-title>Customers ({{ total }})</v-card-title>
          <v-card-title>
            <v-btn>
              <router-link to="/create-customer">Add Customer</router-link>
            </v-btn>
          </v-card-title>
        </div>
      </v-card>
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
            <th>Balance</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody v-for="(customer, index) in customers" :key="customer.id">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.balance }}</td>
            <td>
              <router-link :to="'/update-customer/' + customer.id"
                ><v-btn flat color="secondary">Edit</v-btn></router-link
              >
            </td>
            <td>
              <v-btn flat color="error" @click="deleteCustomer(customer.id)"
                >Delete</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>


<style lang="css">
.container-fluid {
  background-color: #00c897;
}
.p-4 {
  padding: 40px;
}
.m-30 {
  margin: 30px 0px;
}
a {
  text-decoration: none !important;
}
</style>