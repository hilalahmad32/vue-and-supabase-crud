<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import router from "../router";
import { supabase } from "../supabase";
import Head from "./Head.vue";

const route = useRoute();
const name = ref("");
const email = ref("");
const balance = ref("");
const isLoading = ref(false);
const getCustomerById = async () => {
  const { data } = await supabase
    .from("customers")
    .select("*")
    .eq("id", route.params.id);
  name.value = data[0].name;
  email.value = data[0].email;
  balance.value = data[0].balance;
  console.log(name.value);
};

const update = async (e) => {
  e.preventDefault();

  if (!name.value || !email.value || !balance.value) {
    alert("Please Fill the field");
  } else {
    const data = {
      name: name.value,
      email: email.value,
      balance: balance.value,
    };
    isLoading.value = true;
    const { status } = await supabase
      .from("customers")
      .update(data)
      .eq("id", route.params.id);
    if (status === 200) {
      alert("data Update Successfully");
      name.value = "";
      email.value = "";
      balance.value = "";
      isLoading.value = false;
      router.push("/");
    } else {
      alert("Something Waring");
      isLoading.value = false;
    }
  }
};
onMounted(() => {
  getCustomerById();
});
</script>
<template>
  <div>
    <Head />
    <v-container>
      <v-row justify="center">
        <v-col xl="6" lg="6" md="6" sm="8">
          <router-link to="/" style="text-decoration: none">
            <v-btn color="warning" flat>Go Back</v-btn>
          </router-link>
          <v-card class="m-30">
            <v-card-title> Update Customer </v-card-title>
            <v-card-subtitle>
              <form
                action=""
                @submit="update"
                style="width: 100%; padding: 10px"
              >
                <v-text-field
                  type="text"
                  v-model="name"
                  style="width: 100%"
                  label="Enter your name"
                >
                </v-text-field>
                <v-text-field
                  type="email"
                  v-model="email"
                  style="width: 100%"
                  label="Enter your Email"
                >
                </v-text-field>
                <v-text-field
                  type="number"
                  v-model="balance"
                  style="width: 100%"
                  label="Enter your balance"
                >
                </v-text-field>
                <v-btn flat color="primary" type="submit">
                  {{ isLoading ? "Update..." : "Update" }}
                </v-btn>
              </form>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="">
</style>