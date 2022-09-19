<template>
  <div class="flex justify-content-end align-items-end">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <SearchInput
        :id="searchId"
        :modelValue="keyword"
        :placeholderInfo="searchPlaceholder"
        @update:modelValue="searchKeyword($event)"
      />
      <!-- @update:modelValue="keyword = $event" -->
    </span>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from "vue";
import SearchInput from "@/components/input/SearchInput.vue";
export default {
  emits: ["search"],
  setup() {
    const { emit } = getCurrentInstance();
    const keyword = ref("");
    const searchId = ref("searchKeyword");
    const searchPlaceholder = ref("이름, 휴대폰 뒷자리");
    const searchKeyword = (v) => {
      keyword.value = v;
      emit("search", {
        keywords: keyword.value,
      });
    };
    return {
      keyword,
      searchId,
      searchPlaceholder,
      searchKeyword,
    };
  },
  components: { SearchInput },
};
</script>

<style>
</style>