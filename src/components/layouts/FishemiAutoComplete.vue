<script setup lang="ts">
import { ref, type Ref, defineEmits, defineProps } from "vue";
import AutoComplete from "primevue/autocomplete";

const emit = defineEmits(["onItemSelected"]);
const props = defineProps<{
  dataSource: Array<{ [key: string]: any }>;
  placeholder: string;
  searchBy: string;
  id: string;
}>();

const loading = ref(false);
const selected = ref(null);
const results: Ref<any[]> = ref([]);

const search = (event: any) => {
  loading.value = true;
  setTimeout(async () => {
    if (!event.query.trim().length) {
      results.value = props.dataSource;
    } else {
      results.value = props.dataSource.filter((item) => {
        loading.value = false;
        return item[props.searchBy]
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const selectItem = (selected: any) => {
  if (props.id && selected && selected[props.id]) {
    emit("onItemSelected", selected[props.id]);
  } else {
    emit("onItemSelected", selected);
  }
};
</script>

<template>
  <div class="w-fit relative">
    <AutoComplete
      v-model="selected"
      optionLabel="name"
      @complete="search"
      :suggestions="results"
      :placeholder="props.placeholder || 'Rechercher...'"
      :pt="{
        root: 'w-full w-96',
        input:
          'bg-background p-4 rounded-md w-full focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50',
        panel: 'bg-background shadow-xl',
      }"
    >
      <template #option="slotProps">
        <div
          class="flex items-center text-white"
          @click="selectItem(slotProps.option)"
        >
          <div>
            {{ slotProps.option.name }}
          </div>
        </div>
      </template>
    </AutoComplete>
    <span
      v-if="!loading"
      class="pi pi-search absolute top-4 right-3 text-white/60"
    ></span>
  </div>
</template>
