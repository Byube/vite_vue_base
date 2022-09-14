<template>
  <div class="layout-topbar">
    <div class="flex align-items-center justify-content-center w-3">
      <div class="flex w-full align-items-center justify-content-center">
        <router-link to="/">
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
    <!-- <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button> -->
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { emit } = getCurrentInstance();
    const onMenuToggle = (event) => {
      emit("menu-toggle", event);
    };
    return {
      onMenuToggle,
    };
  },
};
</script>