<script setup lang="ts">
import FishemiContainer from "@/components/layouts/FishemiContainer.vue";
import AuthContent from "@/components/auth/AuthContent.vue";

</script>
<template>
    <div class="registerView"> 
        <FishemiContainer>
            <div class="auth-bg-frame hidden md:block"></div>
            <AuthContent type="register" />
        </FishemiContainer>
    </div>
    
</template>