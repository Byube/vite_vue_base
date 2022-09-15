<template>
  <div>
    <h5>Linear Chart</h5>
    <Chart type="line" :data="lineData" :options="lineOptions" :height="50" />
  </div>
  <div class="flex justify-content-between flex-wrap" v-if="isAgo">
    <div class="flex aligin-items-center justify-content-center font-bold m-2">
      {{ lastMonth }}
    </div>
    <div class="flex aligin-items-center justify-content-center font-bold m-2">
      {{ thisMonth }}
    </div>
  </div>
  <div class="flex justify-content-end flex-wrap" v-else>
    <div class="flex aligin-items-center justify-content-center font-bold m-2">
      {{ thisMonth }}
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  toRefs,
} from "@vue/runtime-core";
import EventBus from "@/AppEventBus";
export default {
  props: {
    xLabels: {
      type: Array,
      required: true,
    },
    dataSets: {
      type: Array,
      required: true,
    },
    monthData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const { xLabels, dataSets, monthData } = toRefs(props);
    const lineData = ref({
      labels: xLabels.value,
      datasets: dataSets.value,
    });
    let themeChangeListener = null;
    const lineOptions = ref(null);
    const lightColor = ref({
      labels: "#495057",
      x_ticks: "#495057",
      y_ticks: "#495057",
      x_grid: "#ebedef",
      y_grid: "#ebedef",
    });
    const darkColor = ref({
      labels: "#ebedef",
      x_ticks: "#ebedef",
      y_ticks: "#ebedef",
      x_grid: "rgba(160, 167, 181, .3)",
      y_grid: "rgba(160, 167, 181, .3)",
    });
    const isAgo = ref(true);
    const lastMonth = ref("");
    const thisMonth = ref("");
    const checkAgo = () => {
      if (monthData.value[0] === monthData.value[1]) {
        isAgo.value = false;
        thisMonth.value = monthData.value[0];
      } else {
        isAgo.value = true;
        thisMonth.value = monthData.value[0];
        lastMonth.value = monthData.value[1];
      }
    };

    onMounted(() => {
      checkAgo();
      themeChangeListener = (event) => {
        console.log(event);
        if (event.dark) {
          applyDarkTheme();
        } else {
          applyLightThem();
        }
      };

      EventBus.on("change-theme", themeChangeListener);

      if (isDarkTheme()) {
        applyDarkTheme();
      } else {
        applyLightThem();
      }
    });

    onBeforeUnmount(() => {
      EventBus.off("change-theme", themeChangeListener);
    });

    const applyDarkTheme = () => {
      lineOptions.value = {
        plugins: {
          legend: {
            labels: {
              color: darkColor.value.labels,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: darkColor.value.x_ticks,
            },
            grid: {
              color: darkColor.value.x_grid,
            },
          },
          y: {
            ticks: {
              color: darkColor.value.y_ticks,
            },
            grid: {
              color: darkColor.value.y_grid,
            },
          },
        },
      };
    };

    const applyLightThem = () => {
      lineOptions.value = {
        plugins: {
          legend: {
            labels: {
              color: lightColor.value.labels,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: lightColor.value.x_ticks,
            },
            grid: {
              color: lightColor.value.x_grid,
            },
          },
          y: {
            ticks: {
              color: lightColor.value.y_ticks,
            },
            grid: {
              color: lightColor.value.y_grid,
            },
          },
        },
      };
    };

    const isDarkTheme = () => {
      return proxy.$appState.darkTheme === true;
    };

    return {
      lineData,
      lineOptions,
      isAgo,
      lastMonth,
      thisMonth,
    };
  },
};
</script>
  
  <style>
</style>