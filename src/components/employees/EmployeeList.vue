<script setup lang="ts">
import ListCard from '@/components/employees/ListCard.vue';
import { employees } from '@/utils/constants';

</script>
<template>
    <div class="w-full">
        <ul class="flex flex-col gap-4">
            <li v-for="employee in employees" :key="employee.id">
               <ListCard :name="employee.name" :email="employee.email" />
            </li>
        </ul>
    </div>
</template>