<template>
  <div class="grid p-fluid">
    <div class="col-12">
      <div class="card">
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
    </div>
    <div class="col-12">
      <div class="card h-28rem">
        <LineChart
          :xLabels="xLabels"
          :dataSets="dataSets"
          :monthData="monthData"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="grid h-30rem">
        <div class="col-8">
          <div class="card h-full">
            <div class="text-3xl m-2 font-bold">
              <span>제증명서 발급요청 (어제/오늘)</span>
            </div>
            <!--테이블 부분-->
            <div>
              <CertTable :TableData="products" :TableHeader="productHeaders" />
            </div>
            <!--테이블 부분-->
          </div>
        </div>
        <div class="col-4 h-full">
          <div class="card">
            <div>발급대기</div>
            <div>20명</div>
            <div>
              <Button label="바로가기" class="m-2" />
            </div>
          </div>
          <div class="card">
            <div>발급완료</div>
            <div>95,000명</div>
            <div>
              <Button label="OK" class="mr-2 mb-2" />
            </div>
          </div>
          <div class="card">
            <div>내역없음 처리</div>
            <div>20,008명</div>
            <div>
              <Button label="OK" class="mr-2 mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LineChart from "@/components/chart/LineChart.vue";
import { getOneMonth, getMonthData } from "@/service/date/dateService.js";
import chartData from "@/tmp/chart/chartData.json";

import constant from "@/common/constant";

import CertTable from "@/components/table/BasicTable.vue";
import CertificateData from "@/tmp/certificate/recentData.json";
export default {
  components: {
    LineChart,
    CertTable,
  },
  setup() {
    const monthData = getMonthData();
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

    let products = CertificateData.resultData;
    const productHeaders = ref(constant.data.home.TABLE_HEADER);

    return {
      xLabels,
      dataSets,
      monthData,
      products,
      productHeaders,
    };
  },
};
</script>

<style>
</style>