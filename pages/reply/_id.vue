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
    <div class="comment" v-for="item in messages" :key="item.id">
      <table>
        <tr>
          <th>コメント</th>
        </tr>
        <tr>
          <th>{{item.contact.name}}<img class="logo4" src="~/assets/images/heart.png" @click="counter(item.id)"><span>{{item.likeCount}}</span><img class="logo4" src="~/assets/images/cross.png" @click="deleteContact(item.id)"><p class="comment_content">{{item.news}}</p></th>
        </tr>
        <tr>
          <td>コメント</td>
        </tr>
        <tr v-for="reply in replys" :key="reply.id">
          <td>{{item.contact.name}}</td>
          <td>{{reply.reply}}</td>
        </tr>
      </table>
      <div class="name2">
          <textarea type="text" name="reply" id="reply" cols=64 v-model="newReply" />
          <button @click="insertReply" class="button">コメント</button>
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
      messages: [],
      replys:[],
      user_id: "",
      contact_id: "",
      newReply: "",
      message_id: "",
      ParamsId: '',
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
    setParams(){
      this.paramsId = this.$route.params.id || ''
    },
    async getGood() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/like"
      );
      this.likeCount = resData.data.data;
      console.log(likeCount);
    },
    async counter(id) {
      const sendData = {
        message_id: id,
        contact_id: this.user_id,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8000/api/like", sendData);
      this.getMessage();
    },
    async getMessage() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/message/"+this.$route.params.id
      );
      this.messages = [resData.data.data];
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
    async getReply() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/reply"+ this.$route.params.id
      );
      this.replys = resData.data.data;
      console.log(this.replys);
    },
    async insertReply() {
      const sendData = {
        reply: this.newReply,
        message_id: this.$route.params.id,
        contact_id: this.user_id,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8000/api/reply", sendData);
      this.getReply();
    },
    async getContent() {
      const resData = await this.$axios.request({
              method: 'get',
              url: 'http://127.0.0.1:8000/api/reply/' + this.paramsId,
              params: {id: this.paramsId, user_id: this.user_id},
            });
      this.contents = resData.data.data;
      console.log(contents);
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
    this.getGood();
    this.getReply();
    this.setParams();
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
</style>