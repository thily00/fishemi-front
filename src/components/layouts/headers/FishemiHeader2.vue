<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const redirecTo = (pagename: string) => {
  router.push(`/${pagename}`);
};
</script>
<template>
  <div
    class="w-full h-20 flex items-center justify-between p-8 md:p-12 bg-blue rounded-b-3xl mb-12"
  >
    <div
      class="flex items-center gap-2 cursor-pointer"
      @click="redirecTo('dashboard')"
    >
      <img src="/logo-alt.png" class="w-8 md:w-10" alt="logo" />
      <p class="text-base text-white">Fishemi.io</p>
    </div>

    <div class="flex justify-center items-center gap-4 cursor-pointer">
      <div class="text-right text-white sm:block hidden">
        <p class="mb-0 text-xl fishemi-text-color">Hetic</p>
        <p class="mb-0 text-md font-light">Administrateur</p>
      </div>
      <div
        class="w-8 md:w-10 h-8 md:h-10 bg-yellow-400 rounded-full flex justify-center items-center"
      >
        <p class="mb-0 font-normal text-xl">A</p>
      </div>
    </div>
  </div>
</template>
