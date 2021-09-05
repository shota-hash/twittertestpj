<template>
  <div class="container">
    <img src="~/assets/images/logo.png">
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
}