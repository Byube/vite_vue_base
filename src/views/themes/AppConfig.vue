<template>
  <div id="layout-config" :class="containerClass">
    <a
      href="#"
      class="layout-config-button"
      id="layout-config-button"
      @click="toggleConfigurator($event)"
    >
      <i class="pi pi-cog"></i>
    </a>
    <Button
      class="p-button-danger layout-config-close p-button-rounded p-button-text"
      icon="pi pi-times"
      @click="hideConfigurator"
      :style="{ 'z-index': 1 }"
    ></Button>

    <div class="layout-config-content">
      <p class="text-2xl mt-0">Component Scale</p>
      <div class="config-scale">
        <Button
          icon="pi pi-minus"
          @click="decrementScale()"
          class="p-button-text"
          :disabled="scale === scales[0]"
        />
        <i
          class="pi pi-circle-on"
          v-for="s of scales"
          :class="{ 'scale-active': s === scale }"
          :key="s"
        />
        <Button
          icon="pi pi-plus"
          @click="incrementScale()"
          class="p-button-text"
          :disabled="scale === scales[scales.length - 1]"
        />
      </div>

      <p class="text-3xl">Themes</p>

      <p class="text-lg m-2">Material Design Compact</p>
      <div class="grid free-themes grid-cols-2">
        <div class="m-5">
          <button
            class="p-link"
            type="button"
            @click="changeTheme($event, 'lara-light-indigo', false)"
          >
            <img
              class="block"
              src="@/assets/images/themes/lara-light-indigo.png"
              alt="Material Compact Light Indigo"
            />
          </button>
        </div>
        <div class="m-5">
          <button
            class="p-link"
            type="button"
            @click="changeTheme($event, 'lara-dark-indigo', true)"
          >
            <img
              class="block"
              src="@/assets/images/themes/lara-dark-indigo.png"
              alt="Material Dark Indigo"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  props: {
    layoutMode: {
      type: String,
      default: null,
    },
  },
  setup() {
    const { emit, proxy } = getCurrentInstance();
    const containerClass = computed(() => [
      "layout-config",
      { "layout-config-active": active.value },
    ]);
    const active = ref(false);
    const scale = ref(14);
    const scales = ref([12, 13, 14, 15, 16]);
    let outsideClickListener = null;
    const route = useRoute();

    watch(route, () => {
      if (active.value) {
        active.value = false;
        unbindOutsideClickListener();
      }
    });

    const changeLayout = (event, layoutMode) => {
      emit("layout-change", layoutMode);
      event.preventDefault();
    };

    const hideConfigurator = (event) => {
      active.value = false;
      unbindOutsideClickListener();
      event.preventDefault();
    };

    const toggleConfigurator = (event) => {
      active.value = !active.value;
      event.preventDefault();
      if (active.value) bindOutsideClickListener();
      else unbindOutsideClickListener();
    };

    const bindOutsideClickListener = () => {
      if (!outsideClickListener) {
        outsideClickListener = (event) => {
          if (active.value && isOutsideClicked(event)) {
            active.value = false;
          }
        };
        document.addEventListener("click", outsideClickListener);
      }
    };

    const unbindOutsideClickListener = () => {
      if (outsideClickListener) {
        document.removeEventListener("click", outsideClickListener);
        outsideClickListener = null;
      }
    };

    const isOutsideClicked = (event) => {
      let layConfig = document.getElementById("layout-config");
      //this.$el.isSamNode() //this.$el.contains() 아래와 같이 변경
      return !(
        layConfig.isSameNode(event.target) || layConfig.contains(event.target)
      );
    };

    const decrementScale = () => {
      scale.value--;
      applyScale();
    };

    const incrementScale = () => {
      scale.value++;
      applyScale();
    };

    const applyScale = () => {
      document.documentElement.style.fontSize = scale.value + "px";
    };

    const changeTheme = (event, theme, dark) => {
      const newValue = "/src/assets/themes/" + theme + "/theme.css";
      let themeElement = document.getElementById("dak-link");
      window.localStorage.setItem("theme", newValue);
      window.localStorage.setItem("dark", dark);
      themeElement.setAttribute("href", newValue);
      proxy.$appState.darkTheme = dark;
      proxy.$appState.theme = theme;
    };

    return {
      changeLayout,
      hideConfigurator,
      toggleConfigurator,
      decrementScale,
      incrementScale,
      changeTheme,
      active,
      scale,
      scales,
      containerClass,
    };
  },
};
</script>
