<template>
    <div class="d-flex bg-soft-gray">
        <ComponentAuthSidebar />
        <div class="header-content w-100 d-flex flex-column" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Notifications" />

            <main class="p-4">
                <div class="container-fluid max-width-xl">

                    <div class="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-1">
                                    <li class="breadcrumb-item small text-uppercase tracking-wider text-muted">System
                                    </li>
                                    <li class="breadcrumb-item small text-uppercase tracking-wider active">Notifications
                                    </li>
                                </ol>
                            </nav>
                            <h3 class="fw-bold mb-0 text-dark">Recent Updates</h3>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-white shadow-sm border-0 px-3 py-2 text-sm">
                                <i class="bi bi-check2-all me-1"></i> Mark all read
                            </button>

                        </div>
                    </div>

                    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div class="list-group list-group-flush">

                            <div class="list-group-item list-group-item-action p-4 border-0 mb-1 unread-indicator">
                                <div class="d-flex gap-3">
                                    <div class="icon-shape bg-primary-light text-primary rounded-circle">
                                        <i class="bi bi-box-seam fs-5"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between">
                                            <p class="mb-1 fw-semibold text-dark">Low Stock Alert: Item #4029</p>
                                            <span class="text-muted extra-small">2 mins ago</span>
                                        </div>
                                        <p class="text-secondary small mb-2">The inventory for "Wireless Keyboard" has
                                            fallen below the safety threshold.</p>
                                        <button class="btn btn-sm btn-light rounded-pill px-3 py-1 text-xs fw-bold">View
                                            Inventory</button>
                                    </div>
                                    <div class="unread-dot"></div>
                                </div>
                            </div>

                            <div class="list-group-item list-group-item-action p-4 border-0 mb-1">
                                <div class="d-flex gap-3">
                                    <div class="icon-shape bg-success-light text-success rounded-circle">
                                        <i class="bi bi-person-check fs-5"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between">
                                            <p class="mb-1 fw-semibold text-dark">New User Registered</p>
                                            <span class="text-muted extra-small">1 hour ago</span>
                                        </div>
                                        <p class="text-secondary small mb-0">Admin "John Doe" added a new user to the
                                            Staff group.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>
</template>

<script>
import ComponentAuthSidebar from '@/components/auth/sidebar.vue';
import ComponentAuthNavigation from '@/components/auth/navigation.vue';

export default {
    name: 'Notifications',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
    },
    mounted() {
        document.title = 'Notifications | MISO INVENTORY SYSTEM';
    },
};
</script>

<style scoped>
/* Modern UI Variables & Utilities */
.bg-soft-gray {
    background-color: #f9fafb;
}

.max-width-xl {
    max-width: 1100px;
    margin: 0 auto;
}

.text-xs {
    font-size: 0.75rem;
}

.extra-small {
    font-size: 0.7rem;
    letter-spacing: 0.025em;
}

/* Icon Containers */
.icon-shape {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.bg-primary-light {
    background-color: #e0e7ff;
}

.bg-success-light {
    background-color: #dcfce7;
}

/* Notification Specifics */
.list-group-item {
    transition: all 0.2s ease;
    background-color: transparent;
}

.list-group-item:hover {
    background-color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    z-index: 1;
}

.unread-indicator {
    background-color: #ffffff;
    border-left: 4px solid #4f46e5 !important;
}

.unread-dot {
    width: 8px;
    height: 8px;
    background-color: #4f46e5;
    border-radius: 50%;
    margin-top: 6px;
}

.btn-white {
    background: #fff;
    color: #374151;
    border: 1px solid #e5e7eb;
}

.tracking-wider {
    letter-spacing: 0.1em;
}
</style>