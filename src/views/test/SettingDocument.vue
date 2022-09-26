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
              placeholder="이름을 입력하세요"
            />
          </div>
          <div class="m-3">
            <label for="documentNm">가격(원)</label>
          </div>
          <div class="m-3">
            <InputText
              id="documentNm"
              class="w-full text-xl"
              placeholder="숫자만 입력"
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
            <Button label="신규생성" class="p-button-success p-button-text" />
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
      <div class="col-4">
        <div class="card">
          <div class="m-3">
            <label for="documentNm">문서명</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> 소견서 </span>
          </div>
          <div class="m-3">
            <label for="documentNm">가격(원)</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> 10,000 </span>
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
            <Button label="삭제" class="p-button-danger p-button-text" />
            <Button label="변경" class="p-button-success p-button-text" />
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="m-3">
            <label for="documentNm">문서명</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> 소견서 </span>
          </div>
          <div class="m-3">
            <label for="documentNm">가격(원)</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> 10,000 </span>
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
            <Button label="삭제" class="p-button-danger p-button-text" />
            <Button label="변경" class="p-button-success p-button-text" />
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="m-3">
            <label for="documentNm">문서명</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> 소견서 </span>
          </div>
          <div class="m-3">
            <label for="documentNm">가격(원)</label>
          </div>
          <div class="m-3">
            <span class="text-xl font-bold"> 10,000 </span>
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
import { ref } from "vue";
export default {
  setup() {
    const status = ref();
    return {
      status,
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