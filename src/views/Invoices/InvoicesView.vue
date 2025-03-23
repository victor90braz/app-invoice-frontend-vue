<script setup>
import { onMounted } from 'vue'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { storeToRefs } from 'pinia'

const store = useInvoiceStore()
const { invoices, loading, error, source } = storeToRefs(store)

onMounted(() => {
  store.fetchInvoices()
})
</script>

<template>
  <div>
    <h1>Invoices</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <p><strong>Source:</strong> {{ source }}</p>
      <ul v-if="invoices.length">
        <li v-for="invoice in invoices" :key="invoice.id">
          {{ invoice.number }} - {{ invoice.supplier }} - ${{ invoice.amount }}
        </li>
      </ul>
      <p v-else>No invoices found.</p>
    </div>
  </div>
</template>
