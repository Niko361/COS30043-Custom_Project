<template>
  <div class="search">
    <h1>This is the search for food page</h1>
    <SearchFood msg="werwe" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchFood from "@/components/SearchFood.vue";

export default {
  name: "SearchView",
  components: {
    SearchFood,
  },
};
</script>
