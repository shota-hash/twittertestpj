<template>
  <div class="container">
    <img  class="logo" src="~/assets/images/logo.png">
    <ul class="contents">
      <li><NuxtLink to="/register" class="new">新規登録</NuxtLink></li>
      <li><NuxtLink to="/login" class="normal">ログイン</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>
.contents {
  float: right;
}
.logo {
  width: 20%;
  height: 5%;
}
ul {
  list-style: none;
}
li {
  display: inline-block;

}
.new {
  margin: 10px;
  font-size: 15px;
  color: white;
}
.normal {
  margin: 10px;
  font-size: 15px;
  color: white;
}
.container {
  background-color: black;
  width: 100vw;
  height: 100vh;
}
</style>
