<template>
  <div>
    <div class="grid">
      <div class="flex col-12">
        <div class="card col-4">
          <div class="m-3">
            <label for="userNm">이름</label>
          </div>
          <div class="m-3">
            <InputText
              id="userNm"
              class="w-full"
              v-model="userNm"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div class="m-3">
            <label for="userId">아이디</label>
          </div>
          <div class="m-3">
            <InputText
              id="userId"
              class="w-full"
              v-model="userId"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div class="m-3 text-teal-300">
            <label for="userPw">PW 등록</label>
          </div>
          <div class="m-3 text-teal-300">
            <InputText
              id="userPw"
              class="w-full test"
              v-model="userPw"
              placeholder="신규 패스워드 등록"
              style=""
            />
          </div>
          <div>
            <hr />
          </div>
          <div class="flex justify-content-end align-items-end">
            <Button label="신규생성" @click="createUser" />
          </div>
        </div>
        <div class="col-4 ml-5 text-xl">
          <p>계정 등록/삭제는 누구나 가능 합니다.</p>
          <p>신규 계정 생성을 위해서는 좌측의 내용을 입력하세요</p>
          <p>신규생성을 누르면 자동으로 완성됩니다.</p>
        </div>
      </div>
    </div>

    <div class="grid">
      <!--1-->
      <div class="col-4" v-for="(data, idx) in userList" :key="idx">
        <div class="card">
          <div class="m-3">
            <span>이름</span>
          </div>
          <div class="m-3 font-bold">
            <span>{{ data.userNm }}</span>
          </div>
          <div class="m-3">
            <span>아이디</span>
          </div>
          <div class="m-3 font-bold">
            <span>{{ data.userId }}</span>
          </div>
          <div class="m-3 text-teal-300">
            <span>PW 변경</span>
          </div>
          <div class="m-3 text-teal-300">
            <InputText placeholder="변경할 패스워드 입력" class="w-full" />
          </div>
          <div>
            <hr />
          </div>
          <div class="flex justify-content-between">
            <Button
              class="flex justify-content-center align-items-center"
              label="기록확인"
            />
            <Button
              class="
                flex
                justify-content-center
                align-items-center
                p-button-outlined p-button-danger
              "
              label="계정삭제"
            />
            <Button
              class="
                flex
                justify-content-center
                align-items-center
                p-button-outlined p-button-success
              "
              label="변경"
            />
          </div>
        </div>
      </div>
      <!--1-->
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { addDoc, getDocs } from "firebase/firestore/lite";
import hospitalColRef from "@/service/firebase/firebase.js";
import constant from "@/common/constant";
export default {
  setup() {
    const userId = ref("");
    const userPw = ref("");
    const userNm = ref("");
    const userIdx = ref(0);
    const isNodata = ref(false);
    const addUserList = ref({});
    const userList = ref([]);
    onMounted(() => {
      getUserData();
    });

    const getUserData = async () => {
      const hospitalSnapshot = await getDocs(hospitalColRef);
      userList.value = hospitalSnapshot.docs.map((doc) => doc.data());
      let checkIdx = 0;
      userList.value.forEach((el) => {
        if (el.userIdx > checkIdx) {
          checkIdx = el.userIdx;
        }
      });
      userIdx.value = checkIdx + 1;
      console.log(userIdx.value);
    };

    const createUser = async () => {
      checkUserData();
      if (!isNodata.value) {
        const addedDoc = await addDoc(hospitalColRef, addUserList.value);
        console.log(addedDoc);
        getUserData();
      } else {
        console.log(addUserList.value);
      }
    };
    
    const checkUserData = () => {
      const han = constant.regExp.HANGUL;
      const engnum = constant.regExp.ENGNUM;
      if (userNm.value === "" || !han.test(userNm.value)) {
        isNodata.value = true;
        return;
      } else if (userId.value === "" || !engnum.test(userId.value)) {
        isNodata.value = true;
        return;
      } else if (userPw.value === "") {
        isNodata.value = true;
        return;
      }
      addUserList.value = {
        userIdx: userIdx.value,
        userId: userId.value,
        userNm: userNm.value,
        userPw: userPw.value,
      };
    };

    return {
      userList,
      userNm,
      userId,
      userPw,
      createUser,
    };
  },
};
</script>

<style>
</style>