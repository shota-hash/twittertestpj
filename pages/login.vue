<template>
  <div class="container">
    <img  class="logo" src="~/assets/images/logo.png">
    <ul class="contents">
      <li><NuxtLink to="/register" class="new">新規登録</NuxtLink></li>
      <li><NuxtLink to="/login" class="normal">ログイン</NuxtLink></li>
    </ul>
    <div class="login">
      <div class="wrapper">
        <p class="wrapper_content">ログイン</p>
        <br />
        <input v-model="email" type="email" placeholder="メールアドレス" class="wrapper_content_write" required
        />
        <br />
        <input v-model="password" type="password" placeholder="パスワード" class="wrapper_content_write" required />
        <button @click="login" class="button">ログイン</button>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/home')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>

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
.container{
  background-color: black;
  width: 100vw;
  height: 100vh;
}
.login {
  position: relative;
  height: 30%;
}
.wrapper {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  background-color: white;
  width: 200px;
  text-align: center;
  padding: 10px 20px 20px 20px;
  border-radius: 10px;
}
.button {
  background-color: purple;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
}
.wrapper_content {
  font-weight: bold;
  margin-bottom: -10px;
}
.wrapper_content_write {
  margin-top: 10px;
}
</style>