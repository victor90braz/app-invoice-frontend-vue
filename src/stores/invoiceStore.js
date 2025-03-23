import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchInvoices() {
      this.loading = true
      this.error = null

      const fallbackUrl = 'https://your-fake-api-url.netlify.app/invoices'

      try {
        const res = await fetch(fallbackUrl)
        if (!res.ok) throw new Error('Fake API failed')
        this.invoices = await res.json()
      } catch (error) {
        this.error = 'Unable to load invoices.'
        this.invoices = []
      } finally {
        this.loading = false
      }
    },
  },
})
