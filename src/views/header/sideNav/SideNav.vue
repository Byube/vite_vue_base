<template>
  <div class="layout-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-menu mt-3"
      :root="true"
      @menuitem-click="onMenuItemClick"
    />
  </div>
</template>

<script>
import AppSubmenu from "@/views/header/sideNav/AppSubmenu.vue";
import { computed, getCurrentInstance } from "vue";
export default {
  props: {
    model: Array,
  },
  components: {
    AppSubmenu,
  },
  setup() {
    const { emit, proxy } = getCurrentInstance();
    const onMenuItemClick = (event) => {
      emit("menuitem-click", event);
    };
    computed(() => proxy.$appState.darkTheme);
    return {
      onMenuItemClick,
    };
  },
};
</script>