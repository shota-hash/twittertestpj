<template>
  <div class="container">
    <img  class="logo" src="~/assets/images/logo.png">
    <ul class="contents">
      <li><NuxtLink to="/register" class="new">新規登録</NuxtLink></li>
      <li><NuxtLink to="/login" class="normal">ログイン</NuxtLink></li>
    </ul>
    <div class="register">
      <div class="wrapper">
        <p class="wrapper_content">新規登録</p>
          <input v-model="name" type="name" name="ユーザーネーム" placeholder="ユーザーネーム" class="wrapper_content_write" required/>
        <br />
        <input v-model="email" type="email" placeholder="メールアドレス" class="wrapper_content_write" required
        />
        <br />
        <input v-model="password" type="password" placeholder="パスワード" class="wrapper_content_write" required />
        <button @click="register" class="button">新規登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    async register() {
      if (!this.name || !this.email || !this.password) {
        alert('ユーザーネームまたはメールアドレスまたはパスワードが入力されていません。')
        return
      }
      if (this.name.length>20) {
        alert('ユーザーネームは20文字以内で入力してください')
        return
      }
      if(this.password.length<6) {
        alert('パスワードは6文字以上で入力してください')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            const sendData = {
            id: data.user.uid,
            name: this.name,
            email: this.email,
            };
          this.$axios.post("http://127.0.0.1:8000/api/contact", sendData);
          this.$router.replace("/login");
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
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
.register {
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
  margin-top: 10px;
}
.wrapper_content {
  font-weight: bold;
}
.wrapper_content_write {
  margin-top: 10px;
}
</style>
