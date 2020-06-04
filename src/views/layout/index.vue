<template>
  <div class="wrap">
    <Cloud />
    <div ref="userBase" class="userBase ts" :class="{ navShow: isNavShow }">
      <transition name="fade-header">
        <Header v-if="showHeader" />
      </transition>
      <div class="userBase-content ts" @click="contentClick">
        <transition name="fade-transform" mode="out-in">
          <keep-alive v-if="$route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </transition>
        <div class="footer">
          <Footer />
          <backTop />
        </div>
      </div>
      <navBar />
    </div>
  </div>
</template>

<script>
import navBar from "./components/nav";
import Header from "./components/header";
import Footer from "./components/footer";
import backTop from "./components/backTop";
import Cloud from "@/components/Cloud/index";

export default {
  name: "UserBase",
  components: {
    navBar,
    Header,
    Footer,
    backTop,
    Cloud
  },
  data() {
    return {
      isSmallScreen: ""
    };
  },
  computed: {
    isNavShow() {
      return this.$store.state.isNavShow;
    },
    showHeader() {
      return this.$route.meta.showHeader;
    }
  },
  watch: {
    isSmallScreen: {
      handler(newVal) {
        this.$store.dispatch("updateIsNavShow", !newVal);
        this.$store.dispatch("updateIsSmallScreen", newVal);
      }
    }
  },
  mounted() {
    this.checkInnerWidth();
    window.addEventListener("resize", this.checkInnerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkInnerWidth);
  },
  methods: {
    checkInnerWidth() {
      const innerWidth = window.innerWidth;
      this.isSmallScreen = innerWidth < 992;
    },
    contentClick() {
      this.isSmallScreen && this.$store.dispatch("updateIsNavShow", false);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.wrap {
  height: 100%;
}
.userBase {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  &.navShow {
    padding-right: $side-width;
  }
}
.userBase-content {
  margin: 0 auto;
  padding: 20px 30px;
  position: relative;
  max-width: $content-max-Width;
  min-height: 100%;
  padding-bottom: $footer-height;
  // overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
