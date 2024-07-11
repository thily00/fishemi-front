<script setup lang="ts">
import { useRouter } from 'vue-router';
import InfoCard from "@/components/auth/InfoCard.vue";
import AuthForm from "@/components/auth/AuthForm.vue";

const router = useRouter(); 
const props = defineProps({
    type: {
        type: String,
        required: true
    }
});

const isLogin = props.type === 'login';

const redirectTo = (pagename: string) => {
    router.push(`/${pagename}`);
};
</script>
<template>
    <div class="auth-screen flex w-full h-screen justify-between items-center gap-4 relative z-10">
        <div class="w-full flex flex-col-reverse md:flex-row gap-10" :class="{'items-center': !isLogin}">
            <div class="flex-auto xl:w-[40%] lg:w-[48%] md:w-1/2 w-full flex items-stretch">
                <InfoCard :isLogin="isLogin" @redirect-to="redirectTo" />
            </div> 

            <div class="flex-auto xl:w-3/6 lg:w-3/6 md:w-1/2  w-full flex items-stretch">
                <AuthForm :isLogin="isLogin" @redirect-to="redirectTo" />
            </div> 
        </div>
    </div> 
</template>
