<template>
  <div class="card">
    <DataTable
      :value="products"
      v-model:expandedRows="expandedRows"
      dataKey="id"
      responsiveLayout="scroll"
      @row-click="openUserData($event.data.id)"
    >
      <Column header="번호" bodyStyle="text-align: center">
        <template #body="slotProps">
          {{ slotProps.index }}
        </template>
      </Column>
      <Column
        field="name"
        header="환자명(휴대폰)"
        bodyStyle="text-align: center"
      ></Column>
      <Column header="완료/총신청수" bodyStyle="text-align: center">
        <template #body="slotProps">
          <img
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            :alt="slotProps.data.image"
            class="product-image"
          />
        </template>
      </Column>
      <Column field="price" header="진료과" bodyStyle="text-align: center">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column
        field="category"
        header="의료진"
        bodyStyle="text-align: center"
      ></Column>
      <Column field="rating" header="진료일" bodyStyle="text-align: center">
        <template #body="slotProps">
          <Rating
            :modelValue="slotProps.data.rating"
            :readonly="true"
            :cancel="false"
          />
        </template>
      </Column>
      <Column
        field="inventoryStatus"
        header="용도"
        bodyStyle="text-align: center"
      >
        <template #body="slotProps">
          <span
            :class="
              'product-badge status-' +
              slotProps.data.inventoryStatus.toLowerCase()
            "
            >{{ slotProps.data.inventoryStatus }}</span
          >
        </template>
      </Column>
      <Column header="신청일" bodyStyle="text-align: center">
        <template #body="slotProps">
          {{
            slotProps.data.orders.length !== 0
              ? slotProps.data.orders[0].date
              : "2022-09-02"
          }}
        </template>
      </Column>
      <!--expansion datas-->
      <template #expansion="slotProps">
        <div class="orders-subtable">
          <div class="card">
            <Button label="닫기" @click="collapseAll"></Button>
            <div>생년월일 : 1990.03.23 (여)</div>
            <div>{{ slotProps.data.name }}</div>
            <div>{{ slotProps.data.description }}</div>
            <div>{{ slotProps.data.category }}</div>
          </div>
        </div>
      </template>
      <!--expansion datas-->
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ProductService from "@/service/ProductService";
import exp from "constants";

export default {
  setup() {
    onMounted(() => {
      productService.value
        .getProductsWithOrdersSmall()
        .then((data) => (products.value = data));
    });

    const products = ref([]);
    const productService = ref(new ProductService());
    const expandedRows = ref([]);

    const collapseAll = () => {
      expandedRows.value = [];
    };
    
    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };

    const openUserData = (id) => {
      let nextData = products.value.filter((p) => p.id === id);
      let firstData = expandedRows.value[0];
      if (firstData) {
        expandedRows.value = [
          ...expandedRows.value,
          nextData[0]
        ]
      } else {
        expandedRows.value = nextData;
      }
    };

    return {
      products,
      expandedRows,
      collapseAll,
      formatCurrency,
      openUserData,
    };
  },
};
</script>

<style >
</style>