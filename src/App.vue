<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header class="navbar">
      <div class="nav-left">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
        <h1>My Invoices App</h1>
      </div>
      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/invoices">Invoices</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 40px;
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #42b983;
}

.nav-links a.router-link-exact-active {
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.2rem;
}

.content {
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;

  display: flex;
  justify-content: center;
}
</style>
