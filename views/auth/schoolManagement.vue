<template>
    <div class="d-flex" id="school-management-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Schools" />
            <main>
                <div class="card border-0 shadow-sm mx-4 my-3 p-3 rounded-4">
                    <div class="row g-3 align-items-center">

                        <div class="col-12 col-lg-3">
                            <div class="input-group bg-light rounded-pill px-3 py-1">
                                <span class="input-group-text bg-transparent border-0 text-muted">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control bg-transparent border-0 shadow-none ps-0"
                                    placeholder="Search school name or ID..." style="font-size: 0.95rem;">
                            </div>
                        </div>

                        <div class="col-6 col-md-3 col-lg-2">
                            <button class="btn btn-blue w-100 rounded-pill fw-bold text-white shadow-sm">
                                Total Schools <span class="badge bg-white text-primary rounded-circle ms-1">90</span>
                            </button>
                        </div>

                        <div class="col-6 col-md-3 col-lg-2">
                            <div class="dropdown">
                                <button
                                    class="btn btn-white w-100 border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted dropdown-toggle"
                                    type="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-funnel me-1 text-blue"></i> Filter
                                </button>
                                <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
                                    <li>
                                        <h6 class="dropdown-header small text-uppercase fw-bold text-muted">
                                            Institutional Records</h6>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-calendar-check me-2 text-success"></i> Recent Registrations
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-journal-bookmark me-2 text-muted"></i> Historical Archive
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center justify-content-center text-primary fw-bold"
                                            href="#">
                                            <i class="bi bi-arrow-counterclockwise me-2"></i> Restore All View
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-6 col-md-3 col-lg-2">
                            <div class="dropdown">
                                <button
                                    class="btn btn-white w-100 border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted dropdown-toggle"
                                    type="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-sort-alpha-down me-1 text-blue"></i> Sort By
                                </button>
                                <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
                                    <li>
                                        <h6 class="dropdown-header small text-uppercase fw-bold text-muted">Sort By</h6>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-sort-alpha-down me-2 text-primary"></i> School Name (A-Z)
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-sort-alpha-up me-2"></i> School Name (Z-A)
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-geo-alt me-2 text-muted"></i> By District / Location
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-6 col-md-3 col-lg-3">
                            <button class="btn btn-blue-outline w-100 rounded-pill fw-bold shadow-sm"
                                @click="OpenSchoolAddModal('add', 'ADD NEW SCHOOL')">

                                <i class="bi bi-plus-circle-fill me-1"></i> Add New School
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
                                    <th class="ps-4 py-3 text-uppercase small fw-bold text-muted">SCHOOL ID</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">SCHOOL NAME</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">SCHOOL CODE</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">CONTACT PERSON</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">CONTACT NO.</th>
                                    <th class="py-3 text-uppercase small fw-bold text-muted">EMAIL ADDRESS</th>
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
                                        <span class="fw-medium">Pieces</span>
                                    </td>
                                    <td>
                                        <span class="fw-medium">Pieces</span>
                                    </td>
                                    <td>
                                        <div class="fw-bold">SN-12345678</div>
                                    </td>

                                    <td class="text-end pe-4">
                                        <button class="btn btn-light btn-sm border me-1"
                                            @click="OpenSchoolUpdateModal('edit', 'EDIT SCHOOL')"><i
                                                class="bi bi-pencil"></i></button>
                                        <button class="btn btn-light btn-sm border text-danger"
                                            @click="OpenSchoolDeleteModal('delete', 'DELETE SCHOOL')"><i
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
                <div v-if="showSchoolAddModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideSchoolAddModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentSchoolManagement :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showSchoolAddModal" class="modal-backdrop fade show"></div>
                <div v-if="showSchoolUpdateModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideSchoolUpdateModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentSchoolManagement :action-type="actionType"
                                    :action-type-title="actionTypeTitle" />
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="showSchoolUpdateModal" class="modal-backdrop fade show"></div>
                <div v-if="showSchoolDeleteModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">

                            <!-- Modal Header -->
                            <div class="modal-header border-bottom-0 pb-0">
                                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                                <button type="button" class="btn-close" @click="hideSchoolDeleteModal"
                                    aria-label="Close"></button>
                            </div>

                            <!-- Modal Body -->
                            <div class="modal-body">
                                <ComponentSchoolManagement :action-type="actionType"
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
import ComponentSchoolManagement from '../../views/auth/actions/schoolManagementActions.vue';
export default {
    name: 'schoolManagement',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentSchoolManagement,
    },
    data() {
        return {
            showSchoolAddModal: false,
            showSchoolUpdateModal: false,
            showSchoolDeleteModal: false,
            actionType: '',
            actionTypeTitle: '',
        };
    },
    methods:
    {
        OpenSchoolAddModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showSchoolAddModal = true;
        },
        hideSchoolAddModal() {
            this.showSchoolAddModal = false;
        },
        OpenSchoolUpdateModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showSchoolUpdateModal = true;
        },
        hideSchoolUpdateModal() {
            this.showSchoolUpdateModal = false;
        },
        OpenSchoolDeleteModal(type, title) {
            this.actionType = type;
            this.actionTypeTitle = title;
            this.showSchoolDeleteModal = true;
        },
        hideSchoolDeleteModal() {
            this.showSchoolDeleteModal = false;
        },
    },
    mounted() {
        document.title = 'SCHOOL MANAGEMENT | MISO INVENTORY SYSTEM';
    }
};
</script>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
<style scoped src="../../src/assets/styles/components/button.css"></style>
