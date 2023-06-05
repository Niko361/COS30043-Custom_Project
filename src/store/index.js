import { createStore } from "vuex";

export default createStore({
  state: {
    foodSearchResultsUnprocessed: "",
    foodSearchResultsProcessed: [],
    singleFoodResult: "",
    resultCountRaw: 0,
    lastSearchQuery: "",
    recipeFoodList: [],
    singlefood: {
      id: "",
      description: "",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
      isAdded: false,
      quantityAdded: 0,
    },
    numberOfServes: 1,
  },
  getters: {
    resultCountProcessed: (state) => {
      return state.foodSearchResultsProcessed.length;
    },
    resultCountRaw: (state) => {
      return state.resultCountRaw;
    },
    singleFoodResult: (state) => {
      return state.singleFoodResult;
    },
    foodSearchResultsProcessed: (state) => {
      return state.foodSearchResultsProcessed;
    },
    lastSearchQuery: (state) => {
      return state.lastSearchQuery;
    },
    recipeFoodList: (state) => {
      return state.recipeFoodList;
    },
    totalRecipeMass: (state) => {
      var result = 0;
      for (var i in state.recipeFoodList) {
        result += state.recipeFoodList[i].quantityAdded;
      }
      return result;
    },
    totalCalories: (state) => {
      var result = 0;
      for (var i in state.recipeFoodList) {
        result +=
          (state.recipeFoodList[i].calories *
            state.recipeFoodList[i].quantityAdded) /
          100;
      }
      return result.toFixed(1);
    },
    totalProtein: (state) => {
      var result = 0;
      for (var i in state.recipeFoodList) {
        result +=
          (state.recipeFoodList[i].protein *
            state.recipeFoodList[i].quantityAdded) /
          100;
      }
      return result.toFixed(1);
    },
    totalCarbs: (state) => {
      var result = 0;
      for (var i in state.recipeFoodList) {
        result +=
          (state.recipeFoodList[i].carbs *
            state.recipeFoodList[i].quantityAdded) /
          100;
      }
      return result.toFixed(1);
    },
    totalFats: (state) => {
      var result = 0;
      for (var i in state.recipeFoodList) {
        result +=
          (state.recipeFoodList[i].fats *
            state.recipeFoodList[i].quantityAdded) /
          100;
      }
      return result.toFixed(1);
    },
    perServeCalories: (state, getters) => {
      return (getters.totalCalories / state.numberOfServes).toFixed(1);
    },
    perServeProtein: (state, getters) => {
      return (getters.totalProtein / state.numberOfServes).toFixed(1);
    },
    perServeCarbs: (state, getters) => {
      return (getters.totalCarbs / state.numberOfServes).toFixed(1);
    },
    perServeFats: (state, getters) => {
      return (getters.totalFats / state.numberOfServes).toFixed(1);
    },
    perHundredGramsCalories: (state, getters) => {
      return (getters.totalCalories / (getters.totalRecipeMass / 100)).toFixed(
        1
      );
    },
    perHundredGramsProtein: (state, getters) => {
      return (getters.totalProtein / (getters.totalRecipeMass / 100)).toFixed(
        1
      );
    },
    perHundredGramsCarbs: (state, getters) => {
      return (getters.totalCarbs / (getters.totalRecipeMass / 100)).toFixed(1);
    },
    perHundredGramsFats: (state, getters) => {
      return (getters.totalFats / (getters.totalRecipeMass / 100)).toFixed(1);
    },
  },
  mutations: {
    toggleRecipeFood(state, foodID) {
      for (var j in state.recipeFoodList) {
        if (state.recipeFoodList[j].id == foodID) {
          state.recipeFoodList.splice(j, 1);
        }
      }
      for (var i in state.foodSearchResultsProcessed) {
        if (state.foodSearchResultsProcessed[i].id == foodID) {
          if (!state.foodSearchResultsProcessed[i].isAdded)
            state.recipeFoodList.push(state.foodSearchResultsProcessed[i]);
          state.foodSearchResultsProcessed[i].isAdded =
            !state.foodSearchResultsProcessed[i].isAdded;
        }
      }
    },
    addsearchQuery(state, query) {
      state.lastSearchQuery = query;
    },
    addFoodSearchResults(state, results) {
      state.foodSearchResultsUnprocessed = results;
      state.resultCountRaw = results.totalHits;
      state.foodSearchResultsProcessed = [];
      state.singleFoodResult = results.foods[0];
      for (var i in results.foods) {
        var singlefood = { ...this.state.singlefood };
        for (var j in results.foods[i].foodNutrients) {
          singlefood.description = results.foods[i].description;
          singlefood.id = results.foods[i].fdcId;
          switch (results.foods[i].foodNutrients[j].nutrientName) {
            case "Energy":
              //only add kcal energy, results may also be in KJ which messes up the results.
              if (results.foods[i].foodNutrients[j].unitName == "KCAL")
                singlefood.calories = results.foods[i].foodNutrients[j].value;
              break;
            case "Protein":
              singlefood.protein = results.foods[i].foodNutrients[j].value;
              break;
            case "Carbohydrate, by difference":
              singlefood.carbs = results.foods[i].foodNutrients[j].value;
              break;
            case "Total lipid (fat)":
              singlefood.fats = results.foods[i].foodNutrients[j].value;
              break;
          }
        }
        //only add food to the list if it contains all nutritional information
        if (
          !(
            singlefood.calories == "" ||
            singlefood.protein == "" ||
            singlefood.carbs == "" ||
            singlefood.fats == ""
          )
        ) {
          state.foodSearchResultsProcessed.push(singlefood);
        }
      }
    },
  },
  actions: {},
  modules: {},
});
