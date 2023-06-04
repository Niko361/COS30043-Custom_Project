<template>
  <div class="search">
    <SearchFood msg="" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchFood from "@/components/SearchFood.vue";

export default {
  name: "AddIngredientView",
  components: {
    SearchFood,
  },
};
</script>
