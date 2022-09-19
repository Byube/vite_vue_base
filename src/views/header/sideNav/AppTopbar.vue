<template>
  <div class="layout-topbar">
    <div
      class="
        flex
        align-items-center
        justify-content-center
        xl:w-2
        lg:w-2
        md:w-3
        sm:w-4
      "
    >
      <div class="flex w-full align-items-center justify-content-center">
        <router-link to="/home">
          <div
            class="
              flex
              align-items-center
              justify-content-center
              font-bold
              text-2xl
            "
          >
            Medibloc
          </div>
          <div class="flex">제증명서발급 서비스</div>
        </router-link>
      </div>
      <div>
        <button
          class="p-link layout-menu-button layout-topbar-button"
          @click="onMenuToggle"
        >
          <i class="pi pi-bars"></i>
        </button>
      </div>
    </div>
    <div class="ml-4 font-bold text-xl">
      <span> {{ onMenu }} </span>
    </div>
    <div class="layout-topbar-menu hidden lg:flex origin-top">
      <Button label="Logout" class="p-button-secondary" />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { activeClassName } from "@/service/sideNav/sideNavService";
export default {
  setup() {
    const { onMenu } = activeClassName();
    const { emit } = getCurrentInstance();
    const onMenuToggle = (event) => {
      emit("menu-toggle", event);
    };
    return {
      onMenu,
      onMenuToggle,
    };
  },
};
</script>