<!-- AppLayout.vue or TheLayout.vue -->
<template>
    <div class="app-layout">
        <!-- Sidebar -->
        <aside class="sidebar py-3" :class="{ 'sidebar-collapsed': isCollapsed }">
            <div class="sidebar-header">
                <div class="logo-wrapper p-1">
                    <div @click="toggleSidebar"
                        :class="['logo-glass d-flex align-items-center justify-content-center', isCollapsed ? 'collapsed' : 'expanded']">
                        <transition name="fade" mode="out-in">
                            <span v-if="!isCollapsed" key="full">
                                <img src="../../assets/images/miso-logo-transparent.png" class="logo-img" alt="Logo">
                            </span>
                            <span v-else key="collapsed" class="logo-text-mini">M</span>
                        </transition>
                    </div>
                </div>

            </div>

            <nav class="sidebar-nav py-2 m-1">
                <ul>
                    <li>
                        <router-link to="/dashboard" active-class="active">
                            <span class="icon"><i class="bi bi-speedometer2"></i></span>
                            <span class="text">Dashboard</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/stock-management" active-class="active">
                            <span class="icon"><i class="bi bi-box-seam"></i></span>
                            <span class="text">Inventory</span>
                        </router-link>
                    </li>



                    <li>
                        <router-link to="/delivery" active-class="active">
                            <span class="icon"><i class="bi bi-truck"></i></span>
                            <span class="text">Logistics</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/issuances" active-class="active">
                            <span class="icon"><i class="bi bi-clipboard-check"></i></span>
                            <span class="text">Issuances</span>
                        </router-link>
                    </li>

                    <hr class="my-2 border-gray-700">

                    <li>
                        <a class="d-flex align-items-center justify-content-between" data-bs-toggle="collapse"
                            href="#managementMenu" role="button" aria-expanded="false" aria-controls="managementMenu">

                            <span>
                                <i class="bi bi-list me-2"></i> Managements
                            </span>
                            <i class="bi bi-chevron-down"></i>
                        </a>

                        <ul class="collapse list-unstyled ps-3" id="managementMenu">

                            <li>
                                <router-link class="nav-link" active-class="active" to="/department-management">
                                    <i class="bi bi-building me-2"></i> Departments
                                </router-link>
                            </li>

                            <li>
                                <router-link class="nav-link" active-class="active" to="/nationaloffice-management">
                                    <i class="bi bi-bank me-2"></i> National Offices
                                </router-link>
                            </li>

                            <li>
                                <router-link class="nav-link" active-class="active" to="/barangay-management">
                                    <i class="bi bi-houses me-2"></i> Barangay Units
                                </router-link>
                            </li>

                            <li>
                                <router-link class="nav-link" active-class="active" to="/school-management">
                                    <i class="bi bi-mortarboard me-2"></i> Schools
                                </router-link>
                            </li>

                        </ul>
                    </li>
                    <li>
                        <router-link to="/notifications" active-class="active">
                            <span class="icon"><i class="bi bi-bell"></i></span>
                            <span class="text">Notifications</span>
                        </router-link>
                    </li>

                    <li class="mt-auto">
                        <router-link to="/create-new-account" active-class="active">
                            <span class="icon"><i class="bi bi-gear"></i></span>
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