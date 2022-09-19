<template>
  <DataTable
    :value="TableData"
    v-model:expandedRows="expandedRows"
    dataKey="id"
    responsiveLayout="scroll"
    :paginator="true"
    :rows="10"
    @row-click="openUserData($event.data.id)"
  >
    <template #header>
      <TableHeader @search="searchKeyword" />
    </template>
    <template #empty>No customers found.</template>
    <template #loading>Loading customers data. Please wait.</template>
    <Column header="번호" field="id" bodyStyle="text-align: center" />
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
    <Column field="department" header="진료과" bodyStyle="text-align: center" />
    <Column
      field="medicalstaff"
      header="의료진"
      bodyStyle="text-align: center"
    />
    <Column
      field="diagnosisData"
      header="진료일"
      bodyStyle="text-align: center"
    />

    <Column field="purpose" header="용도" bodyStyle="text-align: center" />
    <Column
      field="reqDate"
      header="신청일"
      bodyStyle="text-align: center"
      v-if="which === 1"
    />
    <Column
      field="reqDate"
      header="발급일"
      bodyStyle="text-align: center"
      v-else-if="which === 2"
    />
    <Column
      field="resData"
      header="처리일"
      bodyStyle="text-align: center"
      v-else
    />
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
                  slotProps.data.resData === "" ? "-" : slotProps.data.resData
                }}
              </div>
              <div>용도: {{ slotProps.data.purpose }}</div>
              <div>
                신청증명서:
                {{ slotProps.data.applicationCert[0].certificateNm }}
              </div>
              <div>
                그외 신청현황:
                {{ slotProps.data.applicationCert[0].certificateNm }}외
                {{ slotProps.data.applicationCert.length - 1 }}건
              </div>
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
</template>

<script>
import { ref, toRefs } from "vue";
import TableHeader from "@/components/tables/header/TableHeader.vue";
export default {
  components: {
    TableHeader,
  },
  props: {
    TableData: {
      type: Array,
      required: true,
    },
    which: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { TableData, which } = toRefs(props);
    const expandedRows = ref([]);
    const closeUserData = (id) => {
      console.log("close", id);
      expandedRows.value = expandedRows.value.filter((p) => p.id !== id);
    };
    const openUserData = (idx) => {
      let nextData = TableData.value.filter((p) => p.id === idx);
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
    const searchKeyword = (keyword) => {
        console.log(keyword);
    };
    return {
      TableData,
      which,
      expandedRows,
      closeUserData,
      openUserData,
      checkStatus,
      searchKeyword,
    };
  },
};
</script>

<style>
</style>