<template>
  <div class="github-login">
    <div class="text">{{ tip }}</div>
  </div>
</template>

<script>
import { GetInfo } from "@/api/github";

export default {
  name: "GithubLogin",
  data() {
    return {
      tip: "登录中..."
    };
  },
  created() {
    // this.getUserData(this.$route.query.code)
    console.log(window);
    let code = window.location.search.split("=")[1];
    console.log(code);
    GetInfo({ code })
      .then(res => {
        console.log(res);
        const data = res.data.resData.info;
        window.localStorage.setItem(
          "_login",
          JSON.stringify({
            date: new Date(),
            data
          })
        );
        // this.$store.dispatch("updateIsLogin", true);
        // this.$store.dispatch("updateUserInfo", data);
        this.tip = data.login + "，欢迎!";
        setTimeout(function() {
          window.close();
        }, 3000);
      })
      .catch(err => {
        this.tip = "github网络不稳定，登录不成功，请尝试重新登录！！！";
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
.github-login {
  text-align: center;
  .text {
    margin: 40px;
    font-size: $font-size-sm;
    color: $color-main;
  }
}
</style>
