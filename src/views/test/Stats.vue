<template>
  <div>
    <!--1-->
    <div class="flex justify-content-between">
      <div class="flex justify-content-center align-items-center text-2xl">
        <p>사용현황</p>
      </div>
      <div class="flex justify-content-end">
        <Button
          label="일간"
          class="flex align-items-center justify-content-center m-2"
        />
        <Button
          label="주간"
          class="flex align-items-center justify-content-center m-2"
        />
        <Button
          label="월간"
          class="flex align-items-center justify-content-center m-2"
        />
      </div>
    </div>
    <!--1-->
    <!--2-->
    <div class="grid mt-3">
      <!--2_1-->
      <div class="col-12">
        <div class="card grid">
          <div class="col-4">
            <div class="text-2xl font-bold">
              <span>오늘신청수</span>
            </div>
            <div class="text-xl font-medium">
              <span>47</span>
            </div>
          </div>
          <div class="col-4">
            <div class="text-2xl font-bold">
              <span>이번달 신청수</span>
            </div>
            <div class="text-xl font-medium">
              <span>196</span>
            </div>
          </div>
          <div class="col-4">
            <div class="text-2xl font-bold">
              <span>누적 신청수</span>
            </div>
            <div class="text-xl font-medium">
              <span>115,008</span>
            </div>
          </div>
        </div>
        <div class="card h-28rem">
          <LineChart
            :xLabels="xLabels"
            :dataSets="dataSets"
            :monthData="monthData"
          />
        </div>
      </div>
      <!--2_1-->
      <!--2_2-->
      <div class="col-3" v-for="(data, idx) in statsData" :key="idx">
        <div class="card">
          <div class="m-3 text-xl font-bold">
            <span>
              {{ data.statsNm }}
            </span>
          </div>
          <div class="m-3">
            <span> 당일: </span>
            <span>
              {{ data.statsTotal }}
            </span>
            <span> 건 </span>
          </div>
          <div class="m-3">
            <span> 누적 </span>
            <span>
              {{ data.statsAccumulate }}
            </span>
          </div>
        </div>
      </div>
      <!--2_2-->
    </div>
    <!--2-->
  </div>
</template>

<script>
import { ref } from "vue";
import { getOneMonth, getMonthData } from "@/service/date/dateService.js";
import LineChart from "@/components/chart/LineChart.vue";
import chartData from "@/tmp/chart/chartData.json";
import statsData from "@/tmp/stats/statsData.json";
export default {
  components: {
    LineChart,
  },
  setup() {
    const xLabels = ref(getOneMonth());
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
    const monthData = getMonthData();
    return {
      xLabels,
      dataSets,
      monthData,
      statsData: statsData.resultData,
    };
  },
};
</script>

<style>
</style>