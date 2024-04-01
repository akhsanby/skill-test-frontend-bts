<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "../utils/axios";
import router from "../router";
import { toast } from "vue3-toastify";
import Cookie from "js-cookie";

const list = ref([]);
const newChecklist = ref("");

async function handleLogout() {
  Cookie.remove("token");
  Cookie.remove("isAuthenticated");
  router.push("/");
}

async function createChecklist() {
  try {
    const token = Cookie.get("token");
    const result = await axiosClient.post(
      "/checklist",
      {
        name: newChecklist.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = result.data;
    if (data) {
      getChecklist();
      newChecklist.value = "";
    }
  } catch (error) {
    console.error(error);
  }
}

async function getChecklist() {
  try {
    const token = Cookie.get("token");
    const result = await axiosClient.get("/checklist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = result.data;
    list.value = data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getChecklist();
});
</script>
<template>
  <div class="card w-96 bg-base-100 shadow border">
    <div class="flex justify-between items-center p-3">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1 btn-primary text-white">create</div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <input type="text" placeholder="Type here" @keyup.enter="createChecklist" :value="newChecklist" @change="(evt) => (newChecklist = evt.target.value)" class="input input-bordered w-full max-w-xs" />
        </ul>
      </div>
      <button class="btn btn-error" @click="handleLogout">logout</button>
    </div>
    <div class="card-body pt-0">
      <h2 class="card-title mb-4 justify-center">Checklist App</h2>
      <div v-for="data in list" class="dropdown dropdown-bottom">
        <div :tabindex="data.id" role="button" class="btn justify-start m-1 w-full">
          <p>{{ data.name }}</p>
          <input type="checkbox" class="checkbox" :value="data.checklistCompletionStatus" />
        </div>
        <ul :tabindex="data.id" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
          <li v-for="item in data.items" :key="item.id" class="flex flex-row justify-center items-center">
            <p>{{ item.name }}</p>
            <input type="checkbox" class="checkbox" :value="item.itemCompletionStatus" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
