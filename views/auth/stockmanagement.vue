<template>

    <div class="d-flex" id="stockmanagement">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light mb-2" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Inventory" />
            <main>
                <div class="card border-0 shadow-sm mx-4 my-3 p-3 rounded-4">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">

                        <div class="flex-grow-1" style="min-width: 300px;">
                            <div class="input-group bg-light rounded-pill px-3 py-1">
                                <span class="input-group-text bg-transparent border-0 text-muted">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control bg-transparent border-0 shadow-none ps-0"
                                    placeholder="Search Stock Items (e.g. Hammer, Drill)..."
                                    style="font-size: 0.95rem;">
                            </div>
                        </div>

                        <div class="d-flex align-items-center gap-2 flex-wrap">

                            <div class="btn-group bg-light p-1 rounded-pill">
                                <button class="btn btn-primary rounded-pill px-3 shadow-sm fw-bold border-0">
                                    All <span class="badge bg-white text-primary ms-1">90</span>
                                </button>
                                <button class="btn btn-light rounded-pill px-3 text-muted border-0 small">Admin 1
                                    (3)</button>
                                <button class="btn btn-light rounded-pill px-3 text-muted border-0 small">Admin 2
                                    (5)</button>
                            </div>

                            <div class="dropdown">
                                <button
                                    class="btn btn-white border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted"
                                    type="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-funnel me-1"></i> Filter
                                </button>
                                <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
                                    <li>
                                        <h6 class="dropdown-header small text-uppercase fw-bold text-muted"
                                            style="letter-spacing: 0.5px;">
                                            Availability Status
                                        </h6>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <span class="p-1 bg-success rounded-circle me-2"></span> Fully Stocked
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <span class="p-1 bg-warning rounded-circle me-2"></span> Running Low
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center text-danger" href="#">
                                            <span class="p-1 bg-danger rounded-circle me-2"></span> Out of Stock
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a class="dropdown-item small text-center text-muted" href="#">Clear
                                            Selection</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="dropdown">
                                <button
                                    class="btn btn-white border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted"
                                    type="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-sort-down me-1"></i> Sort By
                                </button>
                                <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
                                    <li>
                                        <h6 class="dropdown-header small text-uppercase fw-bold text-muted"
                                            style="letter-spacing: 0.5px;">
                                            Order By
                                        </h6>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-calendar-check me-2 text-primary"></i> Recently Updated
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-sort-alpha-down me-2"></i> Name: A to Z
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-hash me-2"></i> Quantity: High to Low
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <button class="btn btn-blue text-white rounded-pill px-4 fw-bold shadow-sm"
                                @click="OpenStocksAddModal('add', 'Add New Stock Item')">
                                <i class="bi bi-plus-lg me-1"></i> Add Stock
                            </button>

                        </div>
                    </div>
                </div>
                <div
                    class="card border-0 shadow-sm overflow-hidden container-fluid w-75 py-3 mt-3 px-4 border-0 border-start border-primary">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="ps-4 py-3 text-uppercase small fw-bold text-muted">ITEM CODE</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">ITEM NAME</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">CATEGORY & DETAILS</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">QUANTITY</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">Status</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">SERIAL NO.</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted text-center">LOCATION</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted text-end pe-4">Last Audit
                                    </th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted text-end pe-4">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="align-middle">
                                    <td><span class="badge bg-light text-dark border">#INV-8821</span></td>
                                    <td class="fw-bold">Claw Hammer 16oz</td>
                                    <td>
                                        <div class="small text-dark">Hand Tools</div>
                                        <div class="x-small text-muted text-truncate" style="max-width: 150px;">Steel
                                            forged, ergonomic grip...</div>
                                    </td>
                                    <td class="text-center"><span class="fw-bold">24</span> <small
                                            class="text-muted">pcs</small></td>
                                    <td class="text-center"><span
                                            class="badge rounded-pill bg-success-subtle text-success">In Stock</span>
                                    </td>
                                    <td><code class="small">SN-9900-X</code></td>
                                    <td class="text-center"><i class="bi bi-geo-alt text-danger"></i> Aisle 4B</td>
                                    <td class="small text-muted">2026-02-05</td>
                                    <td class="text-end pe-4">
                                        <button class="btn btn-light btn-sm border me-1"
                                            @click="OpenStocksUpdateModal('edit', 'Edit Stock Item')"><i
                                                class="bi bi-pencil"></i></button>
                                        <button class="btn btn-light btn-sm border text-danger"
                                            @click="OpenStockDeleteModal('delete', 'Delete Stock Item')"><i
                                                class="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-4 px-4 pb-4">
                        <div class="text-secondary small fw-medium">
                            Showing <span class="text-dark fw-bold">1</span> to <span
                                class="text-dark fw-bold">10</span> of <span class="text-dark fw-bold">90</span> entries
                        </div>

                        <nav aria-label="Page navigation">
                            <ul class="pagination pagination-custom gap-1 mb-0">
                                <li class="page-item disabled">
                                    <a class="page-link border-0 shadow-sm rounded-3" href="#" tabindex="-1">
                                        <i class="bi bi-chevron-left"></i>
                                    </a>
                                </li>

                                <li class="page-item active"><a class="page-link border-0 shadow-sm rounded-3"
                                        href="#">1</a></li>
                                <li class="page-item"><a class="page-link border-0 shadow-sm rounded-3" href="#">2</a>
                                </li>
                                <li class="page-item"><a class="page-link border-0 shadow-sm rounded-3" href="#">3</a>
                                </li>

                                <li class="page-item px-1 text-muted align-self-center">...</li>

                                <li class="page-item">
                                    <a class="page-link border-0 shadow-sm rounded-3" href="#">
                                        <i class="bi bi-chevron-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </main>
        </div>

    </div>
    <div v-if="showStockAddModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                    <button type="button" class="btn-close" @click="hideStocksAddModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <ComponentStockManagementActions :action-type="actionType" :action-type-title="actionTypeTitle" />
                </div>

            </div>
        </div>
    </div>
    <div v-if="showStockAddModal" class="modal-backdrop fade show"></div>
    <!--Update-->
    <div v-if="showStockUpdateModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                    <button type="button" class="btn-close" @click="hideStocksUpdateModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <ComponentStockManagementActions :action-type="actionType" :action-type-title="actionTypeTitle" />
                </div>

            </div>
        </div>
    </div>
    <div v-if="showStockUpdateModal" class="modal-backdrop fade show"></div>
    <div v-if="showStockDeleteModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                    <button type="button" class="btn-close" @click="hideStocksDeleteModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <ComponentStockManagementActions :action-type="actionType" :action-type-title="actionTypeTitle" />
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import ComponentAuthSidebar from '@/components/auth/sidebar.vue'
import ComponentAuthNavigation from '@/components/auth/navigation.vue'
import ComponentStockManagementActions from './actions/StockManagementActions.vue';
export default {
    name: 'StockManagement',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentStockManagementActions,
    },
    data() {
        return {
            showStockAddModal: false,
            showStockUpdateModal: false,
            showStockDeleteModal: false,
            items: [],
            actionTypeTitle: '',
            actionType: '',
        }
    },
    methods: {
        async OpenStocksAddModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showStockAddModal = true;
        },
        hideStocksAddModal() {
            this.showStockAddModal = false;
            this.actionType = '';
            this.actionTypeTitle = '';
        },
        async OpenStocksUpdateModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showStockUpdateModal = true;
        },
        hideStocksUpdateModal() {
            this.showStockUpdateModal = false;
            this.actionType = '';
            this.actionTypeTitle = '';
        },
        async OpenStockDeleteModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showStockDeleteModal = true;
        },
        hideStocksDeleteModal() {
            this.showStockDeleteModal = false;
            this.actionType = '';
            this.actionTypeTitle = '';
        },
    },
    mounted() {
        document.title = 'Stock Management | MISO INVENTORY SYSTEM'
    }
}
</script>
<style scoped src="../../src/assets/styles/stockmanagement.css"></style>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
