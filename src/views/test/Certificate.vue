<template>
  <div class="card">
    <TabView ref="tabview1">
      <TabPanel header="발급대기">
        <CertificateTable :TableData="products" :which="1" />
      </TabPanel>
      <TabPanel header="발급완료">
        <CertificateTable :TableData="products" :which="2" />
      </TabPanel>
      <TabPanel header="내역없음">
        <CertificateTable :TableData="products" :which="3" />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import CertificateTable from "@/components/tables/CertificateTable.vue";
import TableHeader from "@/components/tables/header/TableHeader.vue";
import certificateData from "@/tmp/certificate/waitingIssu.json";
export default {
  components: {
    CertificateTable,
    TableHeader,
  },
  setup() {
    const products = certificateData.resultData;

    return {
      products,
    };
  },
};
</script>

<style >
</style>