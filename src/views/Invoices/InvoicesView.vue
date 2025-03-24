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
  <div class="invoices-container">
    <h1>Invoices</h1>

    <p v-if="loading">Loading invoices...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else>
      <span class="span">Source Code: {{ source }}</span>
      <table v-if="invoices.length" class="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice Number</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.number }}</td>
            <td>{{ invoice.supplier }}</td>
            <td>{{ invoice.date }}</td>
            <td>${{ Number(invoice.amount).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else>No invoices found.</p>
    </div>
  </div>
</template>

<style scoped>
.invoices-container {
  padding: 2rem;
  width: 100%;
  max-width: 900px;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.span {
  margin-bottom: 10px;
}

.invoice-table th,
.invoice-table td {
  padding: 0.75rem 1rem;
  border: 1px solid #eee;
  text-align: left;
}

.invoice-table th {
  background-color: #f9f9f9;
}

.invoice-table tr:nth-child(even) {
  background-color: #fcfcfc;
}
</style>
