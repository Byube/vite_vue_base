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
      <div class="card">
        <LineChart
          :xLabels="xLabels"
          :dataSets="dataSets"
          :monthData="monthData"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="grid">
        <div class="col-8">
          <div class="card h-full">
            <div class="text-3xl m-2 font-bold">
              <span>제증명서 발급요청 (어제/오늘)</span>
            </div>
            <div>
              <DataTable :value="products" responsiveLayout="scroll">
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
              </DataTable>
            </div>
          </div>
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
import { ref, onMounted } from "vue";
import LineChart from "@/components/chart/LineChart.vue";
import { getOneMonth, getMonthData } from "@/service/dateService.js";
import chartData from "@/tmp/chart/chartData.json";

import ProductService from '@/service/ProductService';
export default {
  components: {
    LineChart,
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

    //임시
    onMounted(() => {
            productService.value.getProductsSmall().then(data => products.value = data);
        })

        const products = ref();
        const productService = ref(new ProductService());


    return {
      xLabels,
      dataSets,
      monthData,
      products,
      productService
    };
  },
};
</script>

<style>
</style>