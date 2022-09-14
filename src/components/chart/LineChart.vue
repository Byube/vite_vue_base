<template>
  <div>
    <h5>Linear Chart</h5>
    <Chart type="line" :data="lineData" :options="lineOptions" />
    <div class="">
        <h6>8m</h6>
        <h6>9m</h6>
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
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const { xLabels, dataSets } = toRefs(props);
    const lineData = ref({
      labels: xLabels.value,
      datasets: dataSets.value,
    });
    let themeChangeListener = null;
    const lineOptions = ref(null);

    onMounted(() => {
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
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
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
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      };
    };

    const isDarkTheme = () => {
      console.log(proxy.$appState.darkTheme === true);
      return proxy.$appState.darkTheme === true;
    };

    return {
      lineData,
      lineOptions,
    };
  },
};
</script>
  
  <style>
</style>