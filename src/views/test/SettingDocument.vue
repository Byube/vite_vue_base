<template>
  <div>
    <!--1-->
    <div class="grid">
      <div class="flex col-12">
        <div class="card col-4">
          <div class="m-3">
            <label for="documentNm">문서명</label>
          </div>
          <div class="m-3">
            <InputText
              id="documentNm"
              class="w-full text-xl"
              v-model="documentNm"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div class="m-3">
            <label for="documentNm">가격(원)</label>
          </div>
          <div class="m-3">
            <InputNumber
              inputId="documentPrice"
              placeholder="숫자만 입력"
              class="w-full text-xl"
              v-model="documentPrice"
            />
            <span class="text-red">무료 발급문서는 숫자 0 입력</span>
          </div>
          <div class="m-3">
            <span class="text-teel"> 신청가능 설정 </span>
          </div>
          <div class="m-3">
            <RadioButton
              inputId="possible1"
              name="possible1"
              value="possible"
              v-model="status"
            />
            <label class="ml-3 text-xl font-bold" for="possible1"
              >신청가능</label
            >
          </div>
          <div class="m-3">
            <RadioButton
              inputId="impossible"
              name="impossible"
              value="impossible"
              v-model="status"
            />
            <label class="ml-3 text-xl font-bold" for="impossible"
              >신청불가</label
            >
          </div>
          <div>
            <hr />
          </div>
          <div class="flex justify-content-end align-items-end">
            <Button
              label="신규생성"
              class="p-button-success p-button-text"
              @click="createNewDocument"
            />
          </div>
        </div>
        <div class="col-4 ml-5 text-xl">
          <p>메디패스 서비스를 통해 발급가능한</p>
          <p>제증명서를 설정하세요</p>
          <br />
          <p>유료 제증명서는 설정한 금액외</p>
          <p>결제수수료가 추가 됩니다.</p>
        </div>
      </div>
    </div>
    <!--1-->
    <!--2-->
    <div class="grid">
      <div class="col-4" v-for="(data, idx) in documentList" :key="idx">
        <div class="card">
          <div class="m-3">
            <label for="documentNm">문서명</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> {{ data.documentNm }} </span>
          </div>
          <div class="m-3">
            <label for="documentNm">가격(원)</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> {{ data.documentPrice }} </span>
          </div>
          <div class="m-3">
            <span class="text-teel"> 신청가능 설정 </span>
          </div>
          <div class="m-3">
            <RadioButton
              inputId="possible0001"
              name="possible"
              value="possible0001"
            />
            <label class="ml-3 text-xl font-bold" for="possible0001"
              >신청가능</label
            >
          </div>
          <div class="m-3">
            <RadioButton
              inputId="impossible"
              name="impossible"
              value="impossible"
              v-model="status"
            />
            <label class="ml-3 text-xl font-bold" for="impossible"
              >신청불가</label
            >
          </div>
          <div>
            <hr />
          </div>
          <div class="flex justify-content-end align-items-end">
            <Button label="삭제" class="p-button-danger p-button-text" />
            <Button label="변경" class="p-button-success p-button-text" />
          </div>
        </div>
      </div>
    </div>
    <!--2-->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import documentColRef from "@/service/firebase/firebaseDocument.js";
import { addDoc, getDocs } from "firebase/firestore/lite";
export default {
  setup() {
    const status = ref();
    const documentNm = ref("");
    const documentPrice = ref(0);
    const documentIdx = ref(0);
    const addDocumentList = ref({});
    const documentList = ref([]);

    onMounted(() => {
      getDocumentList();
    });

    const createNewDocument = async () => {
      let documentStatus = status.value + documentIdx.value;
      addDocumentList.value = {
        documentIdx: documentIdx.value,
        documentNm: documentNm.value,
        documentPrice: documentPrice.value,
        documentStatus: documentStatus,
      };
      const addedDoc = await addDoc(documentColRef, addDocumentList.value);
      console.log(addedDoc);
      console.log(addDocumentList.value);
    };

    const getDocumentList = async () => {
      const documentSnapshot = await getDocs(documentColRef);
      documentList.value = documentSnapshot.docs.map((doc) => doc.data());
      let checkIdx = 0;

      documentList.value.forEach((el) => {
        if (el.documentIdx > checkIdx) {
          checkIdx = el.documentIdx;
        }
      });

      documentIdx.value = checkIdx + 1;

      console.log(documentIdx.value);
      console.log(documentList.value);
    };

    return {
      status,
      documentNm,
      documentPrice,
      documentList,
      createNewDocument,
    };
  },
};
</script>

<style>
.text-red {
  color: #ff4032;
}
.text-teel {
  color: rgb(74, 190, 202);
}
</style>