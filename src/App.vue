<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#/foodsearch">RecipeCalc</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/foodsearch"
            >Add Ingredients</router-link
          >
          <router-link class="nav-link" to="/recipe">Edit Recipe</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<style>
nav a.router-link-active {
  color: white;
}
</style>
