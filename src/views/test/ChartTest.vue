<template>
  <div class="card">
    <h5>Linear Chart</h5>
    <!-- <Chart type="line" :data="lineData" /> -->
    <Chart type="line" :data="lineData" :options="lineOptions" />
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
} from "@vue/runtime-core";
import EventBus from "@/AppEventBus";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const lineData = ref({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: "#2f4860",
          borderColor: "#2f4860",
          tension: 0.4,
        },
        {
          label: "Second Dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: "#00bb7e",
          borderColor: "#00bb7e",
          tension: 0.4,
        },
      ],
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