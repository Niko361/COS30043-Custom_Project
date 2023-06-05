<template>
  <div class="displayrecipe row">
    <h2>Edit Recipe</h2>

    <label for="numserves">Set Total Number of Serves</label>
    <div class="col-lg-3 col-md-6 col-sm-9 col-12">
      <input
        v-model="this.$store.state.numberOfServes"
        type="number"
        class="form-control"
        name="numserves"
        id="numserves"
      />
    </div>
    <div class="row gx-0">
      <div class="table-responsive">
        <table class="table table-striped table-hover table-sm">
          <caption>
            Selected Ingredients
          </caption>
          <thead>
            <tr>
              <th scope="col" id="ingredientdescription">Desc</th>
              <th scope="col" id="ingredientcalories">
                Energy (KCal per 100g)
              </th>
              <th scope="col" id="ingredientprotein">Protein (g per 100g)</th>
              <th scope="col" id="ingredientcarbs">Carb (g per 100g)</th>
              <th scope="col" id="ingredientfats">Fat (g per 100g)</th>
              <th scope="col" id="ingredientqty">Set Weight (g)</th>
              <th scope="col" id="ingredientremove">Del</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="food in this.$store.getters.recipeFoodList"
              :key="food.id"
            >
              <td headers="ingredientdescription">{{ food.description }}</td>
              <td headers="ingredientcalories">{{ food.calories }}</td>
              <td headers="ingredientprotein">{{ food.protein }}</td>
              <td headers="ingredientcarbs">{{ food.carbs }}</td>
              <td headers="ingredientfats">{{ food.fats }}</td>
              <td headers="ingredientqty">
                <input
                  v-model="food.quantityAdded"
                  type="number"
                  class="form-control"
                  aria-label="set weight"
                />
              </td>
              <td headers="ingredientremove">
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="toggleFood(food.id)"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="nutrition row">
    <h2>Nutritional Information</h2>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <caption>
          Nutritional Information
        </caption>
        <thead>
          <tr>
            <th scope="col" id="recipemeasure">Measure</th>
            <th scope="col" id="perserve">Quantity Per Serve</th>
            <th scope="col" id="per100g">Quantity Per 100g / 100mL</th>
            <th scope="col" id="recipetotal">Recipe Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col" id="recipeenergy">Energy (KCal)</th>
            <td headers="perserve recipeenergy">
              {{ this.$store.getters.perServeCalories }}
            </td>
            <td headers="per100g recipeenergy">
              {{ this.$store.getters.perHundredGramsCalories }}
            </td>
            <td headers="recipetotal recipeenergy">
              {{ this.$store.getters.totalCalories }}
            </td>
          </tr>
          <tr>
            <th scope="col" id="recipeprotein">Protein (g)</th>
            <td headers="perserve recipeprotein">
              {{ this.$store.getters.perServeProtein }}
            </td>
            <td headers="per100g recipeprotein">
              {{ this.$store.getters.perHundredGramsProtein }}
            </td>
            <td headers="recipetotal recipeprotein">
              {{ this.$store.getters.totalProtein }}
            </td>
          </tr>
          <tr>
            <th scope="col" id="recipecarbs">Carbohydrate (g)</th>
            <td headers="perserve recipecarbs">
              {{ this.$store.getters.perServeCarbs }}
            </td>
            <td headers="per100g recipecarbs">
              {{ this.$store.getters.perHundredGramsCarbs }}
            </td>
            <td headers="recipetotal recipecarbs">
              {{ this.$store.getters.totalCarbs }}
            </td>
          </tr>
          <tr>
            <th scope="col" id="recipefats">Total Fat (g)</th>
            <td headers="perserve recipefats">
              {{ this.$store.getters.perServeFats }}
            </td>
            <td headers="per100g recipefats">
              {{ this.$store.getters.perHundredGramsFats }}
            </td>
            <td headers="recipetotal recipefats">
              {{ this.$store.getters.totalFats }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayRecipe",
  data() {
    return {};
  },
  methods: {
    //toggles whether a food is in the recipe list
    toggleFood: function (foodID) {
      this.$store.commit("toggleRecipeFood", foodID);
    },
  },
};
</script>
