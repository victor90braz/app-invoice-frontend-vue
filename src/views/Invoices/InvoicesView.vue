<script setup>
import { onMounted } from 'vue'
import { useInvoiceStore } from '@/stores/invoiceStore'

const invoiceStore = useInvoiceStore()

onMounted(() => {
  invoiceStore.fetchInvoices()
})
</script>

<template>
  <div>
    <h1>Invoices</h1>
    <ul v-if="invoiceStore.invoices.length">
      <li v-for="invoice in invoiceStore.invoices" :key="invoice.id">
        {{ invoice.number }} - {{ invoice.supplier }} - ${{ invoice.amount }}
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>
