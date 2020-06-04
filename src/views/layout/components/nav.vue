<template>
  <div class="nav-bar " :class="{ navShow: isNavShow }">
    <img class="nav-logo" src="@/assets/logo.svg" />
    <div>
      <template v-for="item in routes">
        <navItem v-if="!item.hidden" :key="item.path" :nav="item" />
      </template>
    </div>

    <div class="nav-menu " @click.stop="showNav">
      <img
        v-if="isNavShow"
        class="nav-menu-img"
        src="@/assets/bird-active.png"
        alt=""
      />
      <img v-else class="nav-menu-img" src="@/assets/bird.png" />
    </div>
  </div>
</template>

<script>
import navItem from "./navItem";
import { childRoutes } from "@/router";

export default {
  name: "UserNav",
  components: {
    navItem
  },
  data() {
    return {
      routes: childRoutes
    };
  },
  computed: {
    isNavShow() {
      return this.$store.state.isNavShow;
    }
  },
  methods: {
    showNav() {
      this.$store.dispatch("updateIsNavShow", !this.isNavShow);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: -$side-width;
  padding: 40px 0;
  width: $side-width;
  height: 100%;
  background: rgba(240, 240, 240, 0.6);
  &.navShow {
    right: 0;
  }

  .nav-logo {
    display: block;
    margin: 0 auto 40px;
    width: 40px;
  }

  .nav-menu {
    cursor: pointer;
    position: absolute;
    top: 20px;
    left: -50px;
    width: 50px;
    height: 40px;
    line-height: 36px;
    border-bottom: 2px solid #141818; /*no*/
    .nav-menu-img {
      height: 100%;
      margin-top: 4px;
    }
  }
}
</style>
