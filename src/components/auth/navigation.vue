<template>
    <header
        class="topbar w-100 d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm border-bottom">
        <div
            class="d-flex align-items-center py-3 px-4 bg-white shadow-sm rounded-3 border-start border-primary border-5">
            <div class="me-3 bg-primary bg-opacity-10 p-2 rounded d-flex align-items-center justify-content-center"
                style="width: 45px; height: 45px;">
                <i :class="['bi', pageIcon, 'text-primary', 'fs-4']"></i>
            </div>

            <div>
                <h5 class="mb-0 fw-bold text-dark tracking-tight" style="letter-spacing: -0.5px;">
                    {{ pageTitle }}
                </h5>
                <small class="text-muted">Miso Inventory System</small>
            </div>
        </div>
        <div class="profile-section d-flex align-items-center gap-3">
            <div class="dropdown">
                <button
                    class="btn btn-light position-relative rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 42px; height: 42px;">

                    <i class="bi bi-bell-fill text-secondary fs-5"></i>

                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white"
                        style="font-size: 0.65rem; padding: 0.35em 0.5em;">
                        3
                    </span>
                </button>

                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3 p-0 rounded-4 overflow-hidden"
                    style="width: 320px;">
                    <li class="bg-primary p-3">
                        <h6 class="text-white mb-0 d-flex justify-content-between align-items-center">
                            Notifications
                            <span class="badge bg-white text-primary small">3 New</span>
                        </h6>
                    </li>

                    <div style="max-height: 300px; overflow-y: auto;">
                        <li>
                            <a class="dropdown-item p-3 border-bottom d-flex align-items-start" href="#">
                                <div class="bg-info bg-opacity-10 p-2 rounded-circle me-3">
                                    <i class="bi bi-box-seam text-info"></i>
                                </div>
                                <div>
                                    <p class="mb-0 small fw-bold text-dark">Low Stock Alert</p>
                                    <small class="text-muted">Item "Pencils" is below 10 units.</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item p-3 border-bottom d-flex align-items-start" href="#">
                                <div class="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                                    <i class="bi bi-truck text-success"></i>
                                </div>
                                <div>
                                    <p class="mb-0 small fw-bold text-dark">Delivery Arrived</p>
                                    <small class="text-muted">Batch #4421 has been received.</small>
                                </div>
                            </a>
                        </li>
                    </div>

                    <li>
                        <router-link to="/notifications"
                            class="dropdown-item text-center py-2 small text-primary fw-bold">
                            View All Notifications
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="d-flex align-items-center gap-2 dropdown">
                <div class="d-flex align-items-center gap-2" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" style="cursor:pointer;">
                    <span
                        class="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold shadow-sm border border-2 border-white"
                        style="width:40px; height:40px;">
                        JD
                    </span>
                    <div class="d-none d-md-block">
                        <p class="name fw-semibold mb-0 text-dark" style="font-size: 0.9rem;">John Doe</p>
                        <p class="text-muted mb-0" style="font-size: 0.75rem;">Administrator</p>
                    </div>
                    <i class="bi bi-chevron-down small text-muted ms-1"></i>
                </div>

                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 p-2 rounded-3"
                    style="min-width: 200px;">
                    <li class="d-md-none p-2 border-bottom mb-2">
                        <h6 class="mb-0 fw-bold">John Doe</h6>
                        <small class="text-muted">admin@example.com</small>
                    </li>

                    <li>
                        <router-link class="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                            to="/my-profile">
                            <i class="bi bi-person text-primary"></i>
                            <span>My Profile</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link class="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                            to="/account-settings">
                            <i class="bi bi-gear text-secondary"></i>
                            <span>Account Settings</span>
                        </router-link>
                    </li>

                    <li>
                        <hr class="dropdown-divider mx-2">
                    </li>

                    <li>
                        <router-link class="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-danger"
                            to="/logout">
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Logout</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'AuthNavigation',
    props: {
        pageTitle: {
            type: String,
            default: ''
        }
    },
    computed: {
        pageIcon() {
            const iconMap = {
                'Dashboard': 'bi-speedometer2',
                'Inventory': 'bi-box-seam',
                'Issuances': 'bi-clipboard-check',
                'Logistics': 'bi-truck',
                'Departments': 'bi-building',
                'National Offices': 'bi-bank',
                'Barangay Units': 'bi-houses',
                'Schools': 'bi-mortarboard',
                'Notifications': 'bi-bell',
                'User Management': 'bi-person-gear',
                'Account Settings': 'bi-gear',
                'My Profile': 'bi-person'
            };

            // Returns the mapped icon, or a default circle if the title doesn't match
            return iconMap[this.pageTitle] || 'bi-circle';
        }
    },

}
</script>
<style scoped src="../../assets/styles/components/navigation.css"></style>