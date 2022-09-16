<template>
  <div class="card">
    <TabView ref="tabview1">
      <TabPanel header="발급대기">
        <DataTable
          :value="products"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          responsiveLayout="scroll"
          @row-click="openUserData($event.data.id)"
        >
          <Column header="번호" field="id" bodyStyle="text-align: center">
            <!-- <template #body="slotProps">
          {{ slotProps.index }}
        </template> -->
          </Column>
          <Column
            field="userNm"
            header="환자명(휴대폰)"
            bodyStyle="text-align: center"
          ></Column>
          <Column header="완료/총신청수" bodyStyle="text-align: center">
            <template #body="slotProps">
              {{ checkStatus(slotProps.data.applicationCert) }} /
              {{ slotProps.data.applicationCert.length }}
            </template>
          </Column>
          <Column
            field="department"
            header="진료과"
            bodyStyle="text-align: center"
          ></Column>
          <Column
            field="medicalstaff"
            header="의료진"
            bodyStyle="text-align: center"
          ></Column>
          <Column
            field="diagnosisData"
            header="진료일"
            bodyStyle="text-align: center"
          >
          </Column>
          <Column field="purpose" header="용도" bodyStyle="text-align: center">
          </Column>
          <Column
            field="reqDate"
            header="신청일"
            bodyStyle="text-align: center"
          >
          </Column>
          <!--expansion datas-->
          <template #expansion="slotProps">
            <div class="orders-subtable">
              <div class="card">
                <div class="grid">
                  <!--1-->
                  <div class="col-5 font-bold text-xl">
                    <div>
                      생년월일: {{ slotProps.data.userBirth }} ({{
                        slotProps.data.userGender === "F" ? "여" : "나"
                      }})
                    </div>
                    <div>신청일: {{ slotProps.data.reqDate }}</div>
                    <div>진료일: {{ slotProps.data.diagnosisData }}</div>
                  </div>
                  <!--1-->
                  <!--2-->
                  <div class="col-6 font-bold text-xl">
                    <div>휴대폰: {{ slotProps.data.userPhone }}</div>
                    <div>
                      발급일/내역없음처리일:
                      {{
                        slotProps.data.resData === ""
                          ? "-"
                          : slotProps.data.resData
                      }}
                    </div>
                    <div>용도: {{ slotProps.data.purpose }}</div>
                  </div>
                  <!--2-->
                  <!--3-->
                  <div class="col-1">
                    <div class="flex align-items-end justify-content-end">
                      <Button
                        label="닫기"
                        @click="closeUserData(slotProps.data.id)"
                      ></Button>
                    </div>
                  </div>
                  <!--3-->
                </div>
              </div>
            </div>
          </template>
          <!--expansion datas-->
        </DataTable>
      </TabPanel>
      <TabPanel header="발급완료">
        <p>생성전</p>
      </TabPanel>
      <TabPanel header="내역없음">
        <p>생성전</p>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// import ProductService from "@/service/ProductService";

import certificateData from "@/tmp/certificate/waitingIssu.json";
export default {
  setup() {
    onMounted(() => {
      products.value = certificateData.resultData;
    });

    const products = ref([]);
    const expandedRows = ref([]);

    const closeUserData = (id) => {
      console.log("close", id);
      expandedRows.value = expandedRows.value.filter((p) => p.id !== id);
    };

    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };

    const openUserData = (idx) => {
      let nextData = products.value.filter((p) => p.id === idx);
      let firstData = expandedRows.value[0];
      if (firstData) {
        expandedRows.value = [...expandedRows.value, nextData[0]];
      } else {
        expandedRows.value = nextData;
      }
    };

    const checkStatus = (certStatus) => {
      let cnt = 0;
      for (let i = 0; i < certStatus.length; i++) {
        if (certStatus[i].status === "Y") cnt++;
      }
      return cnt;
    };

    return {
      products,
      expandedRows,
      closeUserData,
      formatCurrency,
      openUserData,
      checkStatus,
    };
  },
};
</script>

<style >
</style>