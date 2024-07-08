<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const redirecTo = (pagename) => {
  router.push(`/${pagename}`);
};

</script>
<template>
  <div class="w-full h-20 flex items-center justify-between py-12 px-12 bg-blue rounded-b-3xl mb-12">
    <div class="flex items-center gap-2 cursor-pointer" @click="redirecTo('dashboard')">
      <img src="/logo-alt.png" class="w-10" alt="logo" />
      <p class="text-base text-white">Fishemi.io</p>
    </div>

    <div class="flex justify-center items-center gap-4 cursor-pointer">
        <div class="text-right text-white">
            <p class="mb-0 text-xl fishemi-text-color">Hetic</p>
            <p class="mb-0 text-md font-light">Administrateur</p>
        </div>
        <div class="w-10 h-10 bg-yellow-400 rounded-full flex justify-center items-center">
            <p class="mb-0 font-normal text-xl">A</p>
        </div>
    </div>
  </div>
</template>
