<template>
  <div class="search">
    <h1>Search For a food</h1>
    <p>
      Food Name:
      <input
        v-model="searchquery"
        type="text"
        class="form-control"
        v-on:keyup.enter="search(searchquery)"
      />
    </p>
    <button v-on:click="search(searchquery)" class="btn btn-primary">
      Search
    </button>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <caption>
            {{
              this.$store.getters.resultCountProcessed
            }}
            results found for for "{{
              this.$store.getters.lastSearchQuery
            }}"
          </caption>
          <thead>
            <tr>
              <th scope="col" id="description">Description</th>
              <th scope="col" id="calories">Energy (KCal per 100g)</th>
              <th scope="col" id="protein">Protein (g per 100g)</th>
              <th scope="col" id="carbs">Carbohydrate (g per 100g)</th>
              <th scope="col" id="fats">Total Fat (g per 100g)</th>
              <th scope="col" id="addremove">Add/Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="food in getFoods" :key="food.id">
              <td headers="description">{{ food.description }}</td>
              <td headers="calories">{{ food.calories }}</td>
              <td headers="protein">{{ food.protein }}</td>
              <td headers="carbs">{{ food.carbs }}</td>
              <td headers="fats">{{ food.fats }}</td>
              <td headers="addremove">
                <button
                  v-if="food.isAdded === false"
                  type="button"
                  class="btn btn-success"
                  v-on:click="addFood(food.id)"
                >
                  Add
                </button>
                <button
                  v-if="food.isAdded === true"
                  type="button"
                  class="btn btn-danger"
                  v-on:click="removeFood(food.id)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div>
    <paginate
      :page-count="getTotalPageCount"
      :page-range="5"
      :margin-pages="1"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :active-class="'currentPage'"
    >
    </paginate>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
  name: "SearchFood",
  data() {
    return {
      searchquery: "",
      resultFoodList: "",
      msg: "",
      perPage: 10,
      currentPage: 1,
    };
  },
  components: {
    Paginate,
  },
  computed: {
    // returns the data according to the page number
    getFoods: function () {
      let current = this.currentPage * this.perPage;
      let start = current - this.perPage;
      let sliced = this.$store.getters.foodSearchResultsProcessed.slice(
        start,
        current
      );
      return sliced;
    },
    //returns total number of pages required according to the total rows of data
    getTotalPageCount: function () {
      return Math.ceil(
        this.$store.getters.foodSearchResultsProcessed.length / this.perPage
      );
    },
  },
  methods: {
    //removes a food from the recipe list
    removeFood: function (foodID) {
      this.$store.commit("removeRecipeFood", foodID);
    },
    //adds a food to the food list
    addFood: function (foodID) {
      this.$store.commit("addRecipeFood", foodID);
    },
    //sets the clicked page
    clickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
    },
    search: function (in_query) {
      this.$store.commit("addsearchQuery", this.searchquery);
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
          pageSize: "200",
          dataType: ["Foundation", "SR Legacy"], //add "Survey (FNDDS)" for more results (clutters things though)
        }),
      };

      fetch(postApiURL, requestOptions)
        .then((response) => {
          //turning the response into the usable data
          return response.json();
        })
        .then((data) => {
          //This is the data you wanted to get from url
          this.resultFoodList = data;
          this.$store.commit("addFoodSearchResults", data);
          self.msg =
            "Search Successful. " +
            this.$store.getters.resultCountProcessed +
            " results found.";
        })
        .catch((error) => {
          self.msg = "There was an error!" + error;
        });
    },
  },
};
</script>
<style>
.currentPage a {
  background-color: rgb(0, 60, 80);
}
</style>
