import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [],
  }),
  actions: {
    async fetchInvoices() {
      const primaryUrl = 'http://127.0.0.1:8000/invoices/'
      const fallbackUrl = 'http://localhost:3001/invoices'

      try {
        const res = await fetch(primaryUrl)
        if (!res.ok) throw new Error('Primary API failed')
        this.invoices = await res.json()
      } catch (error) {
        console.warn('Primary API failed, trying fallback...', error)

        try {
          const res = await fetch(fallbackUrl)
          if (!res.ok) throw new Error('Fallback API failed')
          this.invoices = await res.json()
        } catch (fallbackError) {
          console.error('Both APIs failed:', fallbackError)
          this.invoices = []
        }
      }
    },
  },
})
