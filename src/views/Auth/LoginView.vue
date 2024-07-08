<script setup>
import FishemiContainer from "@/components/layouts/FishemiContainer.vue";
import AuthContent from "@/components/auth/AuthContent.vue";

</script>
<template>
    <div class="loginView"> 
        <FishemiContainer>
            <div class="auth-bg-frame hidden md:block"></div>
            <AuthContent type="login" />
        </FishemiContainer>
    </div>
    
</template>