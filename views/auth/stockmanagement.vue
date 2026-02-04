<template>

    <div class="d-flex" id="stockmanagement">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light mb-2" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Inventory" />
            <main>
                <div class="card shadow-sm mx-4 my-3 p-4 border-0 border-start border-primary">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">

                        <!-- Search -->
                        <div class="flex-grow-1 me-2">
                            <input type="text" class="form-control" placeholder="Search Stock Items..." />
                        </div>

                        <!-- Buttons & Dropdowns -->
                        <div class="d-flex align-items-center gap-2 flex-wrap">

                            <button class="btn btn-primary">All Stocks (90)</button>

                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="filterDropdown"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Filter Stocks
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="filterDropdown">
                                    <li><a class="dropdown-item" href="#">All Items</a></li>
                                    <li><a class="dropdown-item" href="#">In Stock</a></li>
                                    <li><a class="dropdown-item" href="#">Out of Stock</a></li>
                                    <li><a class="dropdown-item" href="#">Low Stock</a></li>
                                </ul>
                            </div>

                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort By
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                                    <li><a class="dropdown-item" href="#">Newest First</a></li>
                                    <li><a class="dropdown-item" href="#">Oldest First</a></li>
                                </ul>
                            </div>

                            <button class="btn btn-custom-admin1 ">Admin 1 (3)</button>
                            <button class="btn btn-custom-admin2 ">Admin 2 (5)</button>
                            <button class="btn btn-primary "
                                @click="OpenStocksAddModal('add', 'Add New Stock Item')">Add
                                New
                                Stocks</button>

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
                                    <th class="py-3 text-uppercase small fw-bold text-muted">ITEM DESCRIPTION</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">ON-HAND</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">OUM</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">SERIAL NO.</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted text-center">LOCATION</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted text-end pe-4">REMARKS</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted text-end pe-4">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ps-4">
                                        <div class="fw-bold">MO-9923</div>
                                        <span class="text-muted small">High-End Wireless Mouse</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-light text-dark border">Electronics</span>
                                    </td>
                                    <td>
                                        <span class="fw-medium">42 units</span>
                                    </td>
                                    <td>
                                        <span class="fw-medium">Pieces</span>
                                    </td>
                                    <td>
                                        <div class="fw-bold">SN-12345678</div>
                                    </td>
                                    <td class="text-center">
                                        <span class="badge rounded-pill bg-success-subtle text-success px-3">Warehouse
                                            1</span>
                                    </td>
                                    <td class="text-end pe-4">
                                        <span class="text-muted">New stock</span>
                                    </td>
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
