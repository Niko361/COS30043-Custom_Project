<template>
  <div class="search">
    <DisplayRecipe msg="" />
  </div>
</template>

<script>
// @ is an alias to /src
import DisplayRecipe from "@/components/DisplayRecipe.vue";

export default {
  name: "RecipeView",
  components: {
    DisplayRecipe,
  },
};
</script>
