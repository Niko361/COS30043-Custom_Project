<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">RecipeCalc</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Add Ingredients</router-link>
          <router-link class="nav-link" to="/recipe">Edit Recipe</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
        </div>
      </div>
    </div>
  </nav>
  <div class="container-lg">
    <div class="row">
      <router-view />
    </div>
  </div>
</template>
<style>
nav a.router-link-active {
  color: white;
}
</style>
