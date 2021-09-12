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
          <th>コメント</th>
        </tr>
        <tr v-for="item in contactLists" :key="item.id">
          <th>{{item.name}}<img class="logo4" src="~/assets/images/heart.png" @click="toggleBoolean"><span v-if="boolean">0</span><span v-else>1</span><img class="logo4" src="~/assets/images/cross.png" @click="deleteContact(item.id)"><NuxtLink to="/reply"><img class="logo5" src="~/assets/images/detail.png"></NuxtLink><p class="comment_content">{{item.news}}</p></th>
        </tr>
        <tr>
          <td>コメント</td>
        </tr>
        <tr>
          <td>{{name}}</td>
          <td>{{reply}}</td>
        </tr>
      </table>
      <div class="name2">
          <textarea type="text" name="reply" id="reply" v-model="newReply" />
          <button @click="insertContact" class="button">コメント</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      newNews: "",
      newReply:"",
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
      const sendData = {
        reply: this.newReply,
        name: this.contactLists.id
      };
      await this.$axios.post("http://127.0.0.1:8000/api/contact/response", sendData);
      this.getContact();
    },
    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/contact/" + id);
      this.getContact();
    },
    toggleBoolean(){
          this.boolean = !this.boolean;
    },
  },
    props: ["name"],
  created() {
    this.getContact();
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