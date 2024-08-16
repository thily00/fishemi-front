<script setup lang="ts">
const emit = defineEmits(['redirect-to'])

const redirectTo = (pagename: string) => {
    emit('redirect-to', pagename);
}
</script>
<template>
    <div class="flex flex-col gap-6 items-center bg-blue rounded-xl p-10">
        <div class="flex gap-2 items-center mb-3 cursor-pointer" @click="redirectTo('home')">
            <img src="/logo-alt.png" class="w-10 h-10" alt="logo">
            <span class="text-white text-2xl">Fishemi</span>
        </div>

        <div class="flex flex-col gap-4 md:gap-6 text-white">
            <div class="flex items-center gap-2">
                <img src="/icons/check.svg" alt="check_icon" class="w-6 h-6">
                <p class="xl:text-xl lg:text-lg"> Accéder à une interface de gestion intuitive</p>
            </div>

            <div class="flex items-center gap-2">
                <img src="/icons/check.svg" alt="check_icon" class="w-6 h-6">
                <p class="xl:text-xl lg:text-lg"> Commencez à intégrer vos employés gratuitetement par imporrt de fichier .CSV</p>
            </div>

            <div class="flex items-center gap-2">
                <img src="/icons/check.svg" alt="check_icon" class="w-6 h-6">
                <p class="xl:text-xl lg:text-lg"> Profitez d'un support 100% francçais présent 7j/7 de 9h à 20h (heure Paris)</p>
            </div>
        </div>
    </div>
</template>
