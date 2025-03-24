import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [],
    loading: false,
    error: null,
    source: null,
    next: null,
    previous: null,
  }),
  actions: {
    async fetchInvoices(page = 1) {
      this.loading = true
      this.error = null
      this.source = null
      this.next = null
      this.previous = null

      const primaryUrl = `https://app-invoice-backend-django.onrender.com/invoices/?page=${page}`
      const fallbackUrl = `http://localhost:3001/invoices?_page=${page}`

      try {
        const res = await fetch(primaryUrl)
        if (!res.ok) throw new Error()
        const data = await res.json()
        this.invoices = data.results
        this.source = 'Render'
        this.next = data.next
        this.previous = data.previous
      } catch {
        try {
          const res = await fetch(fallbackUrl)
          if (!res.ok) throw new Error()
          const data = await res.json()
          this.invoices = data
          this.source = 'Fake API'
          this.next = null
          this.previous = null
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
