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
        <tr v-for="item in messages" :key="item.id">
          <th>{{item.contact.name}}<img class="logo4" src="~/assets/images/heart.png"><img class="logo4" src="~/assets/images/cross.png" @click="deleteContact(item.id)"><NuxtLink to="/reply"><img class="logo5" src="~/assets/images/detail.png"></NuxtLink><p class="comment_content">{{item.news}}</p></th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      newNews: "",
      messages: [],
      user_id: "",
      contact_id: "",
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
    async getMessage() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/message"
      );
      this.messages = resData.data.data;
      console.log(this.messages);
    },
    async insertContact() {
      const sendData = {
        news: this.newNews,
        contact_id: this.user_id,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8000/api/message", sendData);
      this.getMessage();
    },
    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+ id);
      this.getMessage();
    },
  },
  created() {
    this.getMessage();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_id = user.uid;
        console.log(user);
      } else {
        alert('ログインできてません');
      }
    });
    this.getMessage();
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
  display: inline-block;
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

</style>