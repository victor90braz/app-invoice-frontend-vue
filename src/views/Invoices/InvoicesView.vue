<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { storeToRefs } from 'pinia'

const store = useInvoiceStore()
const { invoices, loading, error, source, next, previous } = storeToRefs(store)

const route = useRoute()
const router = useRouter()

const fetchCurrentPage = () => {
  const page = parseInt(route.query.page) || 1
  store.fetchInvoices(page)
}

onMounted(() => {
  fetchCurrentPage()
})

watch(
  () => route.query.page,
  () => {
    fetchCurrentPage()
  },
)

const goToPage = (page) => {
  router.push({ path: '/invoices', query: { page } })
}
</script>

<template>
  <div class="invoices-container">
    <h1>Invoices</h1>

    <p v-if="loading">Loading invoices...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else>
      <span class="span">Source Code: {{ source }}</span>

      <div v-if="next || previous" class="pagination">
        <button :disabled="!previous" @click="goToPage((parseInt(route.query.page) || 1) - 1)">
          Previous
        </button>
        <button :disabled="!next" @click="goToPage((parseInt(route.query.page) || 1) + 1)">
          Next
        </button>
      </div>

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

.span {
  margin-bottom: 10px;
  display: block;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
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
