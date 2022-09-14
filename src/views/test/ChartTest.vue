<template>
  <div class="grid p-luid">
    <div class="col-12 card">
      <div class="grid">
        <div class="col">
          <div>오늘신청수</div>
          <div>5</div>
        </div>
        <div class="col">
          <div>이번달 신청수</div>
          <div>239</div>
        </div>
        <div class="col">
          <div>누적 신청수</div>
          <div>665</div>
        </div>
        <div class="col">신청통계</div>
      </div>
    </div>
    <div class="col-12 card">
      <LineChart
        :xLabels="xLabels"
        :dataSets="dataSets"
        :monthData="monthData"
      />
    </div>
    <div class="col-12">
      <div class="grid">
        <div class="col-8">
          <div class="card h-full"></div>
        </div>
        <div class="col-4">
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LineChart from "@/components/chart/LineChart.vue";
import { getOneMonth, getMonthData } from "@/service/dateService.js";
import chartData from "@/tmp/chart/chartData.json";
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
    // const data = ref(chartData);
    const dataSets = ref([
      {
        label: "신청수",
        data: chartData.resultData.monthData,
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