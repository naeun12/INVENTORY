<template>
    <div class="d-flex" id="delivery-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light-subtle" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Logistics" />

            <main class="container-fluid p-4">

                <div class="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
                    <div class="card-body p-3">
                        <div class="row g-3 align-items-center">
                            <div class="col-12 col-xl-5">
                                <div class="input-group bg-light border rounded-pill px-3 py-1">
                                    <span class="input-group-text bg-transparent border-0 text-muted">
                                        <i class="bi bi-search"></i>
                                    </span>
                                    <input type="text" class="form-control bg-transparent border-0 shadow-none ps-0"
                                        placeholder="Search by Item Name, Code, or Serial..."
                                        style="font-size: 0.95rem;">
                                </div>
                            </div>

                            <div class="col-12 col-xl-7">
                                <div class="d-flex flex-wrap gap-2 justify-content-xl-end">
                                    <button class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
                                        All Items <span
                                            class="badge bg-white text-primary rounded-circle ms-1">90</span>
                                    </button>

                                    <div class="dropdown">
                                        <button
                                            class="btn btn-white border shadow-sm rounded-pill px-3 fw-semibold text-muted dropdown-toggle"
                                            type="button" data-bs-toggle="dropdown">
                                            <i class="bi bi-funnel me-1 text-primary"></i> Filter
                                        </button>
                                        <ul class="dropdown-menu border-0 shadow-lg mt-2 rounded-3">
                                            <li>
                                                <h6 class="dropdown-header small text-uppercase fw-bold text-muted">
                                                    Timeline</h6>
                                            </li>
                                            <li><a class="dropdown-item small" href="#"><i
                                                        class="bi bi-patch-plus me-2 text-success"></i> New Items</a>
                                            </li>
                                            <li>
                                                <hr class="dropdown-divider">
                                            </li>
                                            <li><a class="dropdown-item small text-danger fw-bold text-center"
                                                    href="#">Reset Filters</a></li>
                                        </ul>
                                    </div>

                                    <button class="btn btn-white border shadow-sm rounded-pill px-3 fw-semibold ">
                                        <span class="icon"><i class="bi bi-clipboard-check"></i></span> View Inssuance
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4">

                    <div class="col">
                        <div class="card h-100 shadow-sm border-0 product-card">
                            <div class="position-relative">
                                <img src="https://tse2.mm.bing.net/th/id/OIP.SjzZYj9PJD3VeZwUAUgqJQHaEO?pid=Api&P=0&h=180"
                                    class="card-img-top p-2 rounded-4" alt="Hammer"
                                    style="height: 200px; object-fit: cover;">
                                <span
                                    class="position-absolute top-0 end-0 m-3 badge rounded-pill bg-success px-3 shadow-sm">SN-9900-X</span>
                            </div>

                            <div class="card-body d-flex flex-column">
                                <div class="mb-2">
                                    <h6 class="text-uppercase text-primary fw-bold mb-1"
                                        style="font-size: 0.75rem; letter-spacing: 1px;">Hand Tools</h6>
                                    <h5 class="card-title mb-0 fw-bold text-dark">Claw Hammer</h5>
                                </div>

                                <p class="card-text text-muted small mb-4">
                                    High-quality carbon steel hammer with an ergonomic anti-slip grip for professional
                                    use.
                                </p>

                                <div class="mt-auto">
                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                        <label class="small fw-bold text-muted text-uppercase">Quantity</label>
                                        <div
                                            class="input-group input-group-sm w-auto border rounded-pill overflow-hidden shadow-sm">
                                            <button class="btn btn-light border-0 px-2" type="button"
                                                @click="decrementQty"><i class="bi bi-dash"></i></button>
                                            <input type="text"
                                                class="form-control border-0 text-center fw-bold bg-white"
                                                :value="quantity" style="width: 40px;" readonly>
                                            <button class="btn btn-light border-0 px-2" type="button"
                                                @click="incrementQty"><i class="bi bi-plus"></i></button>
                                        </div>
                                    </div>

                                    <div class="d-grid">
                                        <button class="btn btn-primary rounded-3 py-2 fw-bold shadow-sm transition-base"
                                            @click="OpenOderModal('Order', 'Delivery Process')">
                                            <i class="bi bi-truck me-2"></i>Order Processing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-if="showOderModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-xl modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="HideOderModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <DeliveryAction :action-type="actionType" :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showOderModal" class="modal-backdrop fade show"></div>
            </main>
        </div>
    </div>
</template>
<script>
import ComponentAuthSidebar from '@/components/auth/sidebar.vue';
import ComponentAuthNavigation from '@/components/auth/navigation.vue';
import DeliveryAction from './actions/deliveryAction.vue';
export default {
    name: 'delivery',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        DeliveryAction,

    },
    data() {
        return {
            actionType: '',
            actionTypeTitle: '',
            quantity: 1,
            showOderModal: false,
        };
    },
    methods: {
        incrementQty() {
            this.quantity++;
        },
        decrementQty() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        OpenOderModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showOderModal = true;
        },
        HideOderModal() {
            this.showOderModal = false;

        }

    },
    mounted() {
        document.title = 'Delivery - Inventory Management System';
    },
};

</script>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
<style scoped src="../../src/assets/styles/components/button.css"></style>
<style scoped src="../../src/assets/styles/delivery.css"></style>