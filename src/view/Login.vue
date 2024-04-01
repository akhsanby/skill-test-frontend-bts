<script setup>
import { ref } from "vue";
import axiosClient from "../utils/axios";
import router from "../router";
import { toast } from "vue3-toastify";
import Cookie from "js-cookie";

const username = ref("");
const password = ref("");

async function handleLogin() {
  try {
    const result = await axiosClient.post("/login", {
      username: username.value,
      password: password.value,
    });
    const { data, message } = result.data;
    if (data) {
      toast.success(`${message}`);
      Cookie.set("isAuthenticated", "true");
      Cookie.set("token", data.token);
      router.push("/home");
    }
  } catch (error) {
    const { message, errorMessage } = error.response.data;
    toast.error(`${errorMessage}`);
  }
}
</script>
<template>
  <div class="card w-96 bg-base-100 shadow border">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-3 justify-center">Login</h2>
      <form class="space-y-3" @submit.prevent="handleLogin">
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" class="grow" placeholder="Username" :value="username" @change="(evt) => (username = evt.target.value)" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
          <input type="password" class="grow" placeholder="Password" :value="password" @change="(evt) => (password = evt.target.value)" />
        </label>
        <button class="btn btn-primary w-full">Sign In</button>
        <p>Don't have account? <a class="text-primary cursor-pointer" @click="router.push('/register')">Register</a></p>
      </form>
    </div>
  </div>
</template>
