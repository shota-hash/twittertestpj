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
        <tr>
          <th v-for="item in contactLists" :key="item.id">{{item.name}}<img class="logo4" src="~/assets/images/heart.png" @click="toggleBoolean"><p v-if="boolean">0</p><p v-else>1</p><img class="logo4" src="~/assets/images/cross.png" @click="deleteContact(item.id)"><img class="logo4" src="~/assets/images/detail.png"></th>
        </tr>
        <tr v-for="item in contactLists" :key="item.id">
        <td><textarea type="text" v-model="item.news" /></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
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
    data() {
    return {
      newNews: "",
      contactLists: [],
    };
    },
    props: ["name"],
    async getContact() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/contact/"
      );
      this.contactLists = resData.data.data;
    },
    async insertContact() {
      const sendData = {
        news: this.newNews,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/contact/", sendData);
      this.getContact();
    },
    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/contact/" + id);
      this.getContact();
    },
    data(){
        return{
          boolean: true
        }
      },
      methods: {
        async toggleBoolean(){
          this.boolean = !this.boolean;
        }
      },
  },

  created() {
    this.getContact();
  },
}
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
  border-color:purple;
  color: white;
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
table th, table td {
  border: solid 1px white;
  display: flex;
  align-items: center;
}
.logo4 {
  width: 4%;
  height: 4%;
}

</style>