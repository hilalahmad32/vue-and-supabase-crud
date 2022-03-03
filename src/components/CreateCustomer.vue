<script setup>
import Head from "./Head.vue";
import { supabase } from "../supabase";
import { ref } from "@vue/runtime-core";
import router from "../router";

const isLoading = ref(false);
const name = ref("");
const email = ref("");
const balance = ref("");

const submit = async (e) => {
  e.preventDefault();
  if (!name.value || !email.value || !balance.value) {
    alert("Please fill the field");
  } else {
    const data = {
      name: name.value,
      email: email.value,
      balance: balance.value,
    };
    isLoading.value = true;
    const { status } = await supabase.from("customers").insert(data);
    if (status === 201) {
      alert("data add Successfully");
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
            <v-card-title> Create Customer </v-card-title>
            <v-card-subtitle>
              <form
                action=""
                @submit="submit"
                style="width: 100%; padding: 10px"
              >
                <v-text-field
                  v-model="name"
                  type="text"
                  style="width: 100%"
                  label="Enter your name"
                >
                </v-text-field>
                <v-text-field
                  v-model="email"
                  type="email"
                  style="width: 100%"
                  label="Enter your Email"
                >
                </v-text-field>
                <v-text-field
                  v-model="balance"
                  type="number"
                  style="width: 100%"
                  label="Enter your balance"
                >
                </v-text-field>
                <v-btn flat color="primary" type="submit">{{
                  isLoading ? "Save..." : "Save"
                }}</v-btn>
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