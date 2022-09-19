<template>
  <InputText
    :id="id"
    :modelValue="modelValue"
    :placeholder="placeholderInfo"
    :class="[{ 'p-invalid': isError }]"
    @input="checkSelf($event.target.value)"
  />
</template>
<script>
import { getCurrentInstance, ref } from "vue";
import constant from "@/common/constant";
export default {
  props: {
    id: String,
    modelValue: {
      type: String,
      default: "",
    },
    placeholderInfo: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { emit } = getCurrentInstance();
    const isError = ref(false);
    const num = constant.regExp.NUMBER;
    const han = constant.regExp.HANGUL;
    const checkSelf = (v) => {
      if (num.test(v)) {
        if (v.length > 4) {
          resetInput();
        } else {
          emit("update:modelValue", v);
          isError.value = false;
        }
      } else {
        if (han.test(v)) {
          emit("update:modelValue", v);
          isError.value = false;
        } else {
          resetInput();
        }
      }
    };
    const resetInput = () => {
      document.getElementById(props.id).value = "";
      emit("update:modelValue", "");
      isError.value = true;
    };
    return {
      checkSelf,
      isError,
    };
  },
};
</script>
  
<style>
</style>