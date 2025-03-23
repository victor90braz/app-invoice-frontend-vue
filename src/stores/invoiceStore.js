import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [],
    loading: false,
    error: null,
    source: null,
  }),
  actions: {
    async fetchInvoices() {
      this.loading = true
      this.error = null
      this.source = null

      const primaryUrl = 'https://app-invoice-backend-django.onrender.com/invoices/'
      const fallbackUrl = 'http://localhost:3001/invoices'

      try {
        const res = await fetch(primaryUrl)
        if (!res.ok) throw new Error()
        this.invoices = await res.json()
        this.source = 'Render'
      } catch {
        try {
          const res = await fetch(fallbackUrl)
          if (!res.ok) throw new Error()
          this.invoices = await res.json()
          this.source = 'Fake API'
        } catch {
          this.error = 'Unable to load invoices.'
          this.invoices = []
        }
      } finally {
        this.loading = false
      }
    },
  },
})
