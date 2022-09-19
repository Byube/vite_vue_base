<template>
  <DataTable :value="TableData" :rowHover="true" showGridlines>
    <Column
      v-for="col of columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="{width:'200px'}"
      headerClass="justify-content-center align-items-center"
      bodyStyle="text-align: center"
    ></Column>
  </DataTable>
</template>

<script>
import { toRefs } from "@vue/reactivity";
export default {
  props: {
    TableData: {
      type: Array,
      required: true,
    },
    TableHeader: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    let { TableData,TableHeader } = toRefs(props);
    let columns = [];
    const keys = Object.keys(TableData.value[0]);
    for (let i = 1; i < keys.length; i++) {
      columns.push({
        field: keys[i],
        header: TableHeader.value[i - 1],
      });
    }
    return {
      TableData,
      columns,
    };
  },
};
</script>

<style scoped>
  .p-datatable{
    text-align: center;
  }
</style>
