<template>
  <div class="search">
    <h1>{{ msg }}</h1>
    <h1>Search For a food</h1>
    <p>
      Food Name:
      <input v-model="searchquery" type="text" />
    </p>
    <button v-on:click="search(searchquery)">Search</button>
    {{ resultFoodList }}
  </div>
</template>

<script>
export default {
  name: "SearchFood",
  data() {
    return {
      searchquery: "",
      resultFoodList: "",
      msg: "",
    };
  },
  methods: {
    search: function (in_query) {
      //define url for api
      var postApiURL =
        "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=XVSFOJABBqyE1Bv25GqIxUrXsYgMULMPSna92A75";

      var self = this;
      // POST request using fetch with error handling
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: in_query,
          pageSize: "25",
          dataType: ["Foundation"],
        }),
      };

      fetch(postApiURL, requestOptions)
        .then((response) => {
          //turning the response into the usable data
          return response.json();
        })
        .then((data) => {
          //This is the data you wanted to get from url
          self.msg = "Data Inserted Successfully.";
          this.resultFoodList = data.foods;
        })
        .catch((error) => {
          self.msg = "There was an error!" + error;
        });
    },
  },
};
</script>
