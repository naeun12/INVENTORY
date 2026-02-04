<template>
    <div class="d-flex" id="barangay-management-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Barangay Units" />
            <main>
                <div class="card shadow-sm mx-4 my-3 p-4 border-0 border-start border-primary">
                    <div class="row g-2 align-items-center">

                        <!-- Search -->
                        <div class="col-15 col-md-3">
                            <input type="text" class="form-control w-100" placeholder="Search Barangay..." />
                        </div>
                        <div class="col-4 col-md-2">
                            <button class="btn btn-primary w-100">
                                All Barangay (90)
                            </button>
                        </div>
                        <div class="col-6 col-md-2">
                            <div class="dropdown w-100">
                                <button class="btn btn-secondary dropdown-toggle w-100" type="button"
                                    data-bs-toggle="dropdown">
                                    Filter Barangay
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li><a class="dropdown-item" href="#">New Barangay</a></li>
                                    <li><a class="dropdown-item" href="#">Old Barangay</a></li>
                                    <li><a class="dropdown-item" href="#">Default</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-4 col-md-2">
                            <div class="dropdown w-100">
                                <button class="btn btn-secondary dropdown-toggle w-100" type="button"
                                    data-bs-toggle="dropdown">
                                    Sort Barangay
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li><a class="dropdown-item" href="#">Name (A-Z)</a></li>
                                    <li><a class="dropdown-item" href="#">Name (Z-A)</a></li>
                                    <li><a class="dropdown-item" href="#">Default</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Add Barangay -->
                        <div class="col-12 col-md-2">
                            <button class="btn btn-primary w-100"
                                @click="OpenBarangayAddModal('add', 'ADD NEW BARANGAY')">
                                Add New Barangay
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
                                    <th class="ps-4 py-3 text-uppercase small fw-bold text-muted">BARANGAY ID</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">BARANGAY NAME</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">BARANGAY CAPTAIN</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">CONTACT NO.</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">STATUS</th>
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

                                    <td class="text-end pe-4">
                                        <button class="btn btn-light btn-sm border me-1"
                                            @click="OpenBARANGAYUpdateModal('edit', 'EDIT BARANGAY')"><i
                                                class="bi bi-pencil"></i></button>
                                        <button class="btn btn-light btn-sm border text-danger"
                                            @click="OpenBARANGAYDeleteModal('delete', 'DELETE BARANGAY')"><i
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
                <div v-if="showBARANGAYAddModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideBARANGAYAddModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentBarangayManagement :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showBARANGAYAddModal" class="modal-backdrop fade show"></div>
                <div v-if="showBARANGAYUpdateModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideBARANGAYUpdateModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentBarangayManagement :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showBARANGAYUpdateModal" class="modal-backdrop fade show"></div>
                <div v-if="showBARANGAYDeleteModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideBARANGAYDeleteModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentBarangayManagement :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
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
import ComponentBarangayManagement from '../../views/auth/actions/barangayManagementAction.vue';
export default {
    name: 'barangayManagement',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentBarangayManagement,
    },
    data() {
        return {
            showBARANGAYAddModal: false,
            showBARANGAYUpdateModal: false,
            showBARANGAYDeleteModal: false,
            actionType: '',
            actionTypeTitle: '',
        };
    },
    methods:
    {
        OpenBarangayAddModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showBARANGAYAddModal = true;
        },
        hideBARANGAYAddModal() {
            this.showBARANGAYAddModal = false;
        },
        OpenBARANGAYUpdateModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showBARANGAYUpdateModal = true;
        },
        hideBARANGAYUpdateModal() {
            this.showBARANGAYUpdateModal = false;
        },
        OpenBARANGAYDeleteModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showBARANGAYDeleteModal = true;
        },
        hideBARANGAYDeleteModal() {
            this.showBARANGAYDeleteModal = false;
        },
    },
    mounted() {
        document.title = 'BARANGAY MANAGEMENT | MISO INVENTORY SYSTEM';
    }
};
</script>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>