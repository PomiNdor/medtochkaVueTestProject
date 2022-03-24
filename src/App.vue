<template>
  <div id="app">
    <nav>
      <router-link to="/">Каталог</router-link>
      <router-link to="/favorites">Избранное</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
* {
  box-sizing: border-box;
  user-select: none;
}

a {
  text-decoration: none;
  &:visited, &:link { color: initial; }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  padding: 0;
  margin: 0;

  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 23.4px;
  color: #1C1C1C;
}

#app {
  display: flex;
  flex-direction: column;
  padding: 64px 0;

  min-height: 100vh;
  max-width: 744px;
  margin: 0 auto; 
}

nav {
  & a {
    display: inline-block;
    width: 50%;
    text-align: center;

    padding: 16px 32px;
    border-radius: 16px;
    &:hover,
    &.router-link-exact-active {
      background: #EDF9FF;
      color: #117DC1;
    }
  }
}

h1, h2 { margin: 0; }
h1 {
  font-weight: 500;
  font-size: 22px;
  line-height: 130%;
} 
h2 {
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
}
</style>