<template>
  <div class="search row">
    <h2>Search For an ingredient</h2>
    <div class="row">
      <label for="search">Ingredient Name: </label>

      <div class="col-lg-11 col-md-10 col-sm-9 col-7">
        <input
          name="search"
          id="search"
          v-model="searchquery"
          type="text"
          class="form-control"
          v-on:keyup.enter="search(searchquery)"
        />
      </div>
      <div class="col-lg-1 col-md-2 col-sm-3 col-5">
        <div class="row">
          <button v-on:click="search(searchquery)" class="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="row gx-0">
      <div class="table-responsive">
        <table class="table table-striped table-hover table-sm">
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
              <th scope="col" id="description">Desc</th>
              <th scope="col" id="calories">Energy (KCal per 100g)</th>
              <th scope="col" id="protein">Protein (g per 100g)</th>
              <th scope="col" id="carbs">Carb (g per 100g)</th>
              <th scope="col" id="fats">Total Fat (g per 100g)</th>
              <th scope="col" id="addremove">Add / Remove</th>
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
                  v-changeButtonDirective="food.isAdded"
                  type="button"
                  v-on:click="toggleFood(food.id)"
                ></button>
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

function changeButton(el, binding) {
  if (binding.value == true) {
    el.className = "btn btn-danger";
    el.setAttribute("v-on:click", "removeFood(food.id)");
    el.textContent = "Del";
  } else {
    el.className = "btn btn-success";
    el.setAttribute("v-on:click", "addFood(food.id)");
    el.textContent = "Add";
  }
}

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
  directives: {
    changeButtonDirective: {
      created(el, binding) {
        changeButton(el, binding);
      },
      updated(el, binding) {
        changeButton(el, binding);
      },
    },
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
    //toggles whether a food to the food list
    toggleFood: function (foodID) {
      this.$store.commit("toggleRecipeFood", foodID);
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
