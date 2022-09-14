<template>
  <div class="card">
    <LineChart 
      :xLabels="xLabels" 
      :dataSets="dataSets" 
      :monthData="monthData" 
    />
  </div>
</template>

<script>
import { ref } from "vue";
import LineChart from "@/components/chart/LineChart.vue";
import { getOneMonth, getMonthData } from "@/service/dateService.js";
export default {
  components: {
    LineChart,
  },
  setup() {
    const monthData = getMonthData();
    // console.log(monthData[0]);
    // console.log(monthData[1]);
    // console.log(monthData[0] === monthData[1]);
    const xLabels = ref(getOneMonth());
    const data = ref([]);
    for (let i = 0; i < 30; i++) {
      data.value.push(Math.floor(Math.random() * 10));
    }
    const dataSets = ref([
      {
        label: "신청수",
        data: data.value,
        fill: false,
        backgroundColor: "#42A5F5",
        borderColor: "#42A5F5",
        tension: 0,
      },
    ]);

    return {
      xLabels,
      dataSets,
      monthData,
    };
  },
};
</script>

<style>
</style>