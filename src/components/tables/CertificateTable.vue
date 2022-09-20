<template>
  <DataTable
    :value="TableData"
    v-model:expandedRows="expandedRows"
    dataKey="id"
    responsiveLayout="scroll"
    :paginator="true"
    :rows="10"
    :loading="loading"
    v-model:filters="filters"
    @row-click="openUserData($event.data.id)"
  >
    <template #header>
      <TableHeader
        @searchPhone="searchPhone"
        @searchName="searchName"
        @resetFilter="resetFilter"
        :which="which"
      />
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
        <div class="card">
          <div class="grid">
            <!--1-->
            <div class="col-5">
              <div
                class="
                  flex
                  font-bold
                  text-2xl
                  align-items-center
                  justify-content-center
                "
              >
                제증명서 업로드
              </div>
              <div>
                <FileUpload
                  name="demo[]"
                  url="./upload.php"
                  accept="image/*"
                  chooseLabel="파일선택"
                  uploadLabel="업로드"
                  cancelLabel="취소"
                  :maxFileSize="1000000"
                  :multiple="true"
                  @upload="onUpload"
                >
                  <template #empty>
                    <p>파일을 여기로 옮기세요(Drag & Drop)</p>
                  </template>
                </FileUpload>
              </div>
            </div>
            <!--1-->
            <div class="col-2"></div>
            <!--2-->
            <div class="col-5">
              <div @click="noDatas">
                <p
                  class="
                    flex
                    font-bold
                    text-2xl
                    align-items-center
                    justify-content-center
                  "
                >
                  내역없음 처리
                </p>
                <div class="p-inputgroup cursor-pointer">
                  <Checkbox v-model="checked" :binary="true" :disabled="true" />
                  <p class="ml-2">진료내역이 없어 내역없음 처리 합니다.</p>
                </div>
                <div class="mt-3 cursor-pointer">
                  <p>진료 내역이 없습니다.</p>
                  <p>환자(고객)의 제증명서 신청을 반려 처리하며</p>
                  <p>결제를 취소 합니다.</p>
                </div>
              </div>
            </div>
            <!--2-->
          </div>
          <div>
            <Button label="완료" class="w-full" />
          </div>
        </div>
      </div>
    </template>
    <!--expansion datas-->
  </DataTable>
  <Dialog
    header="주의 하세요"
    v-model:visible="display"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '400px' }"
    :modal="true"
  >
    <div
      class="
        confirmation-content
        flex
        align-items-center
        justify-content-center
      "
    >
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>내역없음 처리시 고객의 신청 및 결제 내역이 취소 됩니다.</span>
    </div>
    <template #footer>
      <Button
        label="취소"
        icon="pi pi-times"
        @click="dialogAction(0)"
        class="p-button-text"
      />
      <Button
        label="진행"
        icon="pi pi-check"
        @click="dialogAction(1)"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import { onMounted, ref, toRefs } from "vue";
import TableHeader from "@/components/tables/header/TableHeader.vue";
import { FilterMatchMode } from "primevue/api";
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
    const loading = ref(true);
    const checked = ref(false);
    const display = ref(false);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      userNm: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      userPhone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    onMounted(() => {
      loading.value = false;
    });

    const closeUserData = (id) => {
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

    //검색 관련
    const searchName = (searchKey) => {
      filters.value.userNm.value = searchKey.keyword;
      filters.value.userPhone.value = null;
      // console.log("name >>>", filters.value);
    };
    const searchPhone = (searchKey) => {
      filters.value.userPhone.value = searchKey.keyword;
      filters.value.userNm.value = null;
      // console.log("phone >>>", filters.value);
    };
    const resetFilter = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        userNm: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        userPhone: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    };
    const onUpload = () => {
      console.log("file");
    };
    const noDatas = () => {
      console.log("no");
      display.value = true;
    };
    const dialogAction = (cnt) =>{
      if(cnt === 1){
        checked.value = true;
      } else {
        checked.value = false;
      }
      display.value = false;
    }
    return {
      TableData,
      which,
      expandedRows,
      loading,
      filters,
      checked,
      display,
      closeUserData,
      openUserData,
      checkStatus,
      searchName,
      searchPhone,
      resetFilter,
      onUpload,
      noDatas,
      dialogAction
    };
  },
};
</script>

<style>
</style>