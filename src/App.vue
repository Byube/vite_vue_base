<template>
  <div :class="containerClass" @click="onWrapperClick">
    <Header />

    <div class="layout-main-container">
      <router-view></router-view>
      <Footer />
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
  </div>
</template>

<script>
import AppConfig from "@/views/themes/AppConfig.vue";
import Header from "@/views/header/Header.vue";
import Footer from "@/views/footer/Footer.vue";
import { activeClassName } from "@/service/sideNavService";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    Header,
    AppConfig,
    Footer,
  },
  setup() {
    const onLayoutChange = (layoutMode) => {
      layoutMode.value = layoutMode;
    };
    const {
      changeMobileState,
      changeOverMenuState,
      layoutMode,
      staticMenuInactive,
      overlayMenuActive,
      mobileMenuActive,
      changeMobileMenuState,
      checkMenuOnclick,
      changeMenuOnclick,
    } = activeClassName();
    const onWrapperClick = () => {
      if (!checkMenuOnclick.value) {
        changeOverMenuState(false);
        changeMobileState(false);
      }
      changeMenuOnclick(false);
    };
    const containerClass = computed(() => {
      return [
        "layout-wrapper",
        {
          "layout-static": layoutMode.value === "static",
          "layout-overlay": layoutMode.value === "overlay",
          "layout-static-sidebar-inactive":
            staticMenuInactive.value && layoutMode.value === "static",
          "layout-overlay-sidebar-active":
            overlayMenuActive.value && layoutMode.value === "overlay",
          "layout-mobile-sidebar-active": mobileMenuActive.value,
          "p-input-filled": false,
          "p-ripple-disabled": false,
          "layout-theme-light": false,
        },
      ];
    });
    const showMain = () => {
      changeMobileMenuState();
    };
    return {
      onWrapperClick,
      containerClass,
      showMain,
      mobileMenuActive,
      onLayoutChange,
      layoutMode,
    };
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
