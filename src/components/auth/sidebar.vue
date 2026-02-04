<!-- AppLayout.vue or TheLayout.vue -->
<template>
    <div class="app-layout">
        <!-- Sidebar -->
        <aside class="sidebar py-3" :class="{ 'sidebar-collapsed': isCollapsed }">
            <div class="sidebar-header">
                <div class="logo d-flex align-items-center bg-white justify-content-center border-radius-md">
                    <span v-if="!isCollapsed">
                        <img src="../../assets/images/miso-logo-transparent.png" width="50" height="50" alt="">
                    </span>
                    <span v-else>L</span>
                </div>

                <button class="toggle-btn" @click="toggleSidebar">
                    <svg v-if="isCollapsed" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <nav class="sidebar-nav py-2 m-1">
                <ul>
                    <li>
                        <router-link to="/dashboard" active-class="active">
                            <span class="icon">📊</span>
                            <span class="text">Dashboard</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/stock-management" active-class="active">
                            <span class="icon">📦</span>
                            <span class="text">Inventory</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/issuances" active-class="active">
                            <span class="icon">📋</span>
                            <span class="text">Issuances</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/delivery" active-class="active">
                            <span class="icon">🚚</span>
                            <span class="text">Logistics</span>
                        </router-link>
                    </li>

                    <hr class="my-2 border-gray-700">
                    <li>
                        <router-link active-class="active" to="/department-management">
                            <span class="icon">🏢</span>
                            <span class="text">Departments</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link active-class="active" to="/nationaloffice-management">
                            <span class="icon">🏛️</span>
                            <span class="text">National Offices</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link active-class="active" to="/barangay-management">
                            <span class="icon">🏘️</span>
                            <span class="text">Barangay Units</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link active-class="active" to="/school-management">
                            <span class="icon">🏫</span>
                            <span class="text">Schools</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/notifications" active-class="active">
                            <span class="icon">🔔</span>
                            <span class="text">Notifications</span>
                        </router-link>
                    </li>

                    <li class="mt-auto">
                        <router-link to="/create-new-account" active-class="active">
                            <span class="icon">⚙️</span>
                            <span class="text">User Management</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </aside>
        <div class="content w-100">
            <slot />
        </div>

        <!-- Main Content Area -->



    </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isCollapsed = ref(false)
const route = useRoute()

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
}

// Optional: auto-collapse on mobile
const checkMobile = () => {
    if (window.innerWidth <= 768) {
        isCollapsed.value = true
    }
}

watch(() => route.path, () => {
    if (window.innerWidth <= 768) {
        isCollapsed.value = true
    }
})

checkMobile()
window.addEventListener('resize', checkMobile)
</script>

<style scoped src="../../assets/styles/components/sidebar.css"></style>