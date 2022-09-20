<template>
  <div class="flex justify-content-end align-items-end">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <SearchInput
        :id="searchId"
        :modelValue="keyword"
        :placeholderInfo="searchPlaceholder"
        @update:modelValue="changeKeyword($event)"
        @keyup="searchKeyword"
      />
    </span>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from "vue";
import SearchInput from "@/components/input/SearchInput.vue";
import constant from "@/common/constant";
export default {
  props: {
    which: {
      type: Number,
    },
  },
  emits: ["searchPhone", "searchName", "resetFilter"],
  setup(props) {
    const { emit } = getCurrentInstance();
    const keyword = ref("");
    const searchId = ref("searchKeyword" + props.which);
    const searchPlaceholder = ref("이름, 휴대폰 뒷자리");
    const changeKeyword = (v) => {
      keyword.value = v;
    };
    const searchKeyword = () => {
      const num = constant.regExp.NUMBER;
      const han = constant.regExp.HANGUL;
      if (num.test(keyword.value)) {
        if (keyword.value.length > 3) searchPhone();
      } else if (han.test(keyword.value)) {
        if (keyword.value.length > 1) searchName();
      } else if (keyword.value === ""){
        resetFilter();
      }
    };
    const searchPhone = () => {
      emit("searchPhone", {
        keyword: keyword.value,
      });
    };
    const searchName = () => {
      emit("searchName", {
        keyword: keyword.value,
      });
    };
    const resetFilter = () => {
      emit("resetFilter");
    };
    return {
      keyword,
      searchId,
      searchPlaceholder,
      changeKeyword,
      searchKeyword,
    };
  },
  components: { SearchInput },
};
</script>

<style>
</style>