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
              inputId="possible"
              name="possible"
              value="possible"
              v-model="status"
            />
            <label class="ml-3 text-xl font-bold" for="possible"
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
            <span class="text-xl font-bold">
              {{ numberFormat(data.documentPrice) }}
            </span>
          </div>
          <div class="m-3">
            <span class="text-teel"> 신청가능 설정 </span>
          </div>
          <div class="m-3">
            <RadioButton
              :inputId="'possible' + data.documentIdx"
              :name="data.documentStatus"
              :value="'possible' + data.documentIdx"
              v-model="dcs[idx]"
            />
            <label
              class="ml-3 text-xl font-bold"
              :for="'possible' + data.documentIdx"
              >신청가능</label
            >
          </div>
          <div class="m-3">
            <RadioButton
              :inputId="'impossible' + data.documentIdx"
              name="impossible"
              :value="'impossible' + data.documentIdx"
              v-model="dcs[idx]"
            />
            <label
              class="ml-3 text-xl font-bold"
              :for="'impossible' + data.documentIdx"
              >신청불가</label
            >
          </div>
          <div>
            <hr />
          </div>
          <div class="flex justify-content-end align-items-end">
            <Button label="삭제" class="p-button-danger p-button-text" />
            <Button
              label="변경"
              class="p-button-success p-button-text"
              @click="updateDocument(data.documentId, dcs[idx])"
            />
          </div>
        </div>
      </div>
    </div>
    <!--2-->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { db } from "@/service/firebase/firebase.js";
import {
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore/lite";
import { numberFormat } from "@/service/number/format.js";
export default {
  setup() {
    const documentColRef = collection(db, "document");
    const status = ref();
    const documentNm = ref("");
    const documentPrice = ref(0);
    const documentIdx = ref(0);
    const addDocumentList = ref({});
    const documentList = ref([]);
    const dcs = ref([]);

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
      status.value = "";
      getDocumentList();
    };

    const getDocumentList = async () => {
      dcs.value = [];
      documentList.value = [];
      try {
        const documentSnapshot = await getDocs(documentColRef);
        documentSnapshot.docs.map((doc) => {
          let setData = doc.data();
          setData = {
            ...setData,
            documentId:doc.id
          }
          documentList.value.push(setData);
        });
        console.log(documentList.value);
        let checkIdx = 0;
        documentList.value.forEach((el) => {
          if (el.documentIdx > checkIdx) {
            checkIdx = el.documentIdx;
          }
          dcs.value.push(el.documentStatus);
        });
        documentIdx.value = checkIdx + 1;
      } catch (error) {
        console.log(error);
      }
    };

    const updateDocument = async (idx, status) => {
      console.log(status);
      const documentDoc = doc(db, "document", idx);
      try {
        const res = await updateDoc(documentDoc, {
          documentStatus: status,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      // getDocumentList();
    };

    return {
      status,
      documentNm,
      documentPrice,
      documentList,
      dcs,
      createNewDocument,
      updateDocument,
      numberFormat,
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