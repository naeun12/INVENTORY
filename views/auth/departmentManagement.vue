<template>
    <div class="d-flex" id="department-management-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Departments" />
            <main>
                <div class="card shadow-sm mx-4 my-3 p-4 border-0 border-start border-primary">
                    <div class="row g-2 align-items-center">

                        <!-- Search -->
                        <div class="col-15 col-md-3">
                            <input type="text" class="form-control w-100" placeholder="Search Department..." />
                        </div>

                        <!-- All Department button -->
                        <div class="col-4 col-md-2">
                            <button class="btn btn-primary w-100">
                                All Department (90)
                            </button>
                        </div>

                        <!-- Filter dropdown -->
                        <div class="col-6 col-md-2">
                            <div class="dropdown w-100">
                                <button class="btn btn-secondary dropdown-toggle w-100" type="button"
                                    data-bs-toggle="dropdown">
                                    Filter Department
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li><a class="dropdown-item" href="#">New Department</a></li>
                                    <li><a class="dropdown-item" href="#">Old Deparment</a></li>
                                    <li><a class="dropdown-item" href="#">Default</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-4 col-md-2">
                            <div class="dropdown w-100">
                                <button class="btn btn-secondary dropdown-toggle w-100" type="button"
                                    data-bs-toggle="dropdown">
                                    Sort Department
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li><a class="dropdown-item" href="#">Name (A-Z)</a></li>
                                    <li><a class="dropdown-item" href="#">Name (Z-A)</a></li>
                                    <li><a class="dropdown-item" href="#">Default</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Add Department -->
                        <div class="col-12 col-md-2">
                            <button class="btn btn-primary w-100"
                                @click="OpenDepartmentAddModal('add', 'Add New Department')">
                                Add New Department
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
                                    <th class="ps-4 py-3 text-uppercase small fw-bold text-muted">DEPARTMENT ID</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">DEPARTMENT NAME</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">DEPARTMENT CODE</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">DEPARTMENT HEAD</th>
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
                                            @click="OpenDepartmentUpdateModal('edit', 'Edit Department')"><i
                                                class="bi bi-pencil"></i></button>
                                        <button class="btn btn-light btn-sm border text-danger"
                                            @click="OpenDepartmentDeleteModal('delete', 'Delete Department')"><i
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
                <div v-if="showDepartmentAddModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideDepartmentAddModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentDepartmentManagementActions :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showDepartmentAddModal" class="modal-backdrop fade show"></div>
                <!--Update-->
                <div v-if="showDepartmentUpdateModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideDepartmentUpdateModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentDepartmentManagementActions :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showDepartmentUpdateModal" class="modal-backdrop fade show"></div>
                <div v-if="showDepartmentDeleteModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideDepartmentDeleteModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentDepartmentManagementActions :action-type="actionType"
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
import ComponentDepartmentManagementActions from '../../views/auth/actions/departmentManagementAction.vue';
export default {
    name: "DepartmentManagement",
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentDepartmentManagementActions
    },
    data() {
        return {
            showDepartmentAddModal: false,
            showDepartmentUpdateModal: false,
            showDepartmentDeleteModal: false,
            actionType: '',
            actionTypeTitle: '',
        }
    },
    methods: {
        OpenDepartmentAddModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showDepartmentAddModal = true;
        },
        hideDepartmentAddModal() {
            this.showDepartmentAddModal = false;
        },
        OpenDepartmentUpdateModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showDepartmentUpdateModal = true;
        },
        hideDepartmentUpdateModal() {
            this.showDepartmentUpdateModal = false;
        },
        OpenDepartmentDeleteModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showDepartmentDeleteModal = true;
        },
        hideDepartmentDeleteModal() {
            this.showDepartmentDeleteModal = false;
        },
    },
    mounted() {
        document.title = 'DEPARTMENT MANAGEMENT | MISO INVENTORY SYSTEM';
    }
};
</script>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>

<style scoped src="../../src/assets/styles/components/card.css"></style>
