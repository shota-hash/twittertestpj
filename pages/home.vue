<template>
  <div class="container">
    <div class="container_content">
      <img  class="logo" src="~/assets/images/logo.png">
      <p class="contents">
        <NuxtLink to="/home"><img class="logo2" src="~/assets/images/home.png"></NuxtLink>
        <span>ホーム</span>
        <br />
      </p>
      <p class="contents">
        <NuxtLink to="/index"><img class="logo2" src="~/assets/images/logout.png" @click="logout"></NuxtLink>
        <span>ログアウト</span>
      </p>
      <div class="name">
          <label for="name">シェア</label>
          <textarea type="text" name="news" id="news" v-model="newNews" rows="5" />
          <button @click="insertContact" class="button">シェアする</button>
      </div>
    </div>
    <div class="comment">
      <table>
        <tr>
          <th>ホーム</th>
        </tr>
        <tr v-for="item in contactLists" :key="item.id">
          <th>{{item.name}}<img class="logo4" src="~/assets/images/heart.png" @click="toggleBoolean"><span v-if="boolean">0</span><span v-else>1</span><img class="logo4" src="~/assets/images/cross.png" @click="deleteContact(item.id)"><NuxtLink to="/reply"><img class="logo5" src="~/assets/images/detail.png"></NuxtLink><p class="comment_content">{{item.news}}</p></th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { email } from 'vee-validate/dist/rules';
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      newNews: "",
      contactLists: [],
      boolean: true
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/')
        })
    },
    async getContact() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/contact/"
      );
      this.contactLists = resData.data.data;
    },
    async insertContact() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      function currentUser() {
        // [START auth_current_user]
        const user = firebase.auth().currentUser;

            if (user !== null) {
              // The user object has basic properties such as display name, email, etc.
              const displayName = user.displayName;
              const email = user.email;
              const photoURL = user.photoURL;
              const emailVerified = user.emailVerified;
                // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
              const uid = user.uid;
            }
      }
      const sendData = {
        news: this.newNews,
        name: currentUser.displayName,
        email: currentUser.email
      };
      await this.$axios.post("http://127.0.0.1:8000/api/contact/", sendData);
      this.getContact();
    },
    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/contact/" + id);
      this.getContact();
    },
    toggleBoolean(){
          this.boolean = !this.boolean;
    },
    props: ["name"],
    created() {
    this.getContact();
    },
  },
};
</script>

<style scoped>
.contents img {
  vertical-align: middle;
  display: inline-block;
}
.contents span {
  display: inline-block;
}

.logo {
  width: 40%;
  height: 5%;
  display: block;
}
.logo2, logo3 {
  display: block;
  width: 10%;
}

.container{
  display: flex;
  justify-content: space-between;
  background-color: black;
  width: 100vw;
  height: 100vh;
}
.container_content {
  width: 30vw;
  display: block;
}
span, p {
  color: white;
}
.name {
  color: white;
  width: 100%;
}
textarea {
  display: block;
  background-color: black;
  border-color: white;
  color: white;
  border-radius: 10px;
}
.button {
  background-color: purple;
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 80px;
}
.comment {
  width: 70%;
  display: inline;
}
table {
  color: white;
  border-collapse: collapse;
}
.logo4 {
  width: 4%;
  height: 4%;
  margin-left: 2%;
}
.logo5 {
  width: 10%;
  height: 40%;
  margin-left: 10%;
}
table tr {
  border: solid 1px white;
}
table th {
  display: flex;
}
.comment_content {
  margin-left: -36%;
}
</style>