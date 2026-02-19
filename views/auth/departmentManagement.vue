<template>
    <div class="d-flex" id="department-management-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Departments" />
            <main>

                <div class="card border-0 shadow-sm mx-4 my-3 p-3 rounded-4">
                    <div class="row g-3 align-items-center">

                        <ComponentSearch placeholder="Search departments or department heads..." v-model="search"
                            @search="onsearch" />
                        <div class="col-6 col-md-3 col-lg-2">
                            <button class="btn btn-blue w-100 rounded-pill fw-bold text-white shadow-sm"
                                @click="ClickbtnDepartment">
                                All <span class="d-none d-xl-inline">Departments</span> <span
                                    class="badge bg-white text-primary rounded-circle ms-1">{{ departmentCount }}</span>
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
                                        <h6 class="dropdown-header small text-uppercase fw-bold text-muted">Filter by
                                            Age</h6>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-calendar-plus me-2 text-primary"></i> Recently Established
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item small d-flex align-items-center" href="#">
                                            <i class="bi bi-archive me-2 text-muted"></i> Legacy Departments
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <a class="dropdown-item small text-center fw-bold text-secondary" href="#">
                                            Reset to Default
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
                                    <i class="bi bi-sort-alpha-down me-1 text-blue"></i> Sort
                                </button>
                                <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
                                    <li>
                                        <h6 class="dropdown-header small text-uppercase fw-bold text-muted">Sort Order
                                        </h6>
                                    </li>
                                    <a class="dropdown-item small d-flex align-items-center" href="#"
                                        @click.prevent="sortBy = 'name'; sortOrder = 'asc'; onsearch()">
                                        <i class="bi bi-sort-alpha-down me-2 text-primary"></i> Name: Ascending
                                    </a>
                                    <a class="dropdown-item small d-flex align-items-center" href="#"
                                        @click.prevent="sortBy = 'name'; sortOrder = 'desc'; onsearch()">
                                        <i class="bi bi-sort-alpha-up me-2"></i> Name: Descending
                                    </a>
                                </ul>
                            </div>
                        </div>

                        <div class="col-6 col-md-3 col-lg-3 text-end">
                            <button class="btn btn-blue-outline w-100 rounded-pill fw-bold shadow-sm"
                                @click="OpenDepartmentAddModal('add', 'Add New Department')">
                                <i class="bi bi-plus-circle-fill me-1"></i> Add New <span
                                    class="d-none d-xl-inline">Dept.</span>
                            </button>
                        </div>

                    </div>
                </div>
                <div
                    class="card border-0 shadow-sm overflow-hidden container-fluid w-75 py-3 mt-3 px-4 border-start border-primary w-100">

                    <!-- Spinner -->

                    <!-- <div v-if="loading" class="d-flex justify-content-center my-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> -->
                    <ComponentLoading v-if="loading" />

                    <!-- Table -->
                    <div v-else class="table-responsive">
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
                                <tr v-for="department in departments.items" :key="department.departmentID">
                                    <td class="ps-4">
                                        <div class="fw-bold">{{ department.departmentID }}</div>
                                        <span class="text-muted small">{{ department.description || '-' }}</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-light text-dark border">{{ department.departmentName
                                            }}</span>
                                    </td>
                                    <td>
                                        <span class="fw-medium">{{ department.departmentCode || '-' }}</span>
                                    </td>
                                    <td>
                                        <span class="fw-medium">{{ department.departmentHead || '-' }}</span>
                                    </td>
                                    <td>
                                        <div class="fw-bold badge"
                                            :class="department.isActive ? 'bg-success text-white' : 'bg-danger text-white'">
                                            {{ department.isActive ? 'Active' : 'Inactive' }}
                                        </div>
                                    </td>
                                    <td class="text-end pe-4">
                                        <button class="btn btn-light btn-sm border me-1"
                                            @click="OpenDepartmentUpdateModal('edit', 'Edit Department', department)">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-light btn-sm border text-danger"
                                            @click="OpenDepartmentDeleteModal('delete', 'Delete Department', department)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ComponentPagination :total-items="departments.totalCount" :page-size="departments.pageSize"
                        :current-page="departments.currentPage" :total-pages="departments.totalPages"
                        @go="fetchDepartments" @next="fetchDepartments(departments.currentPage + 1)"
                        @prev="fetchDepartments(departments.currentPage - 1)" />
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
                    <div class="modal-dialog modal-xl modal-dialog-centered">
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
import ComponentPagination from '../../views/auth/components/pagination.vue';
import ComponentSearch from '../../views/auth/components/search.vue';
import ComponentLoading from '../../views/auth/components/loading.vue'
import axios from 'axios';
export default {
    name: "DepartmentManagement",
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentDepartmentManagementActions,
        ComponentPagination,
        ComponentSearch,
        ComponentLoading,
    },
    data() {
        return {
            showDepartmentAddModal: false,
            showDepartmentUpdateModal: false,
            showDepartmentDeleteModal: false,
            actionType: '',
            actionTypeTitle: '',
            departments: {
                items: [],
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                totalPages: 1,
            },
            departmentCount: 0,
            loading: false,
            search: '',
            sortBy: '',
            sortOrder: '',

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
        async countDepartment() {
            const response = await axios.get("https://localhost:7050/api/Department/list", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data && response.data.success) {
                const res = response.data.data;
                this.departmentCount = res.totalCount;
            }

        },
        async fetchDepartments(page = 1) {
            try {
                this.loading = true;
                const response = await axios.get("https://localhost:7050/api/Department/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    params: {
                        pageNumber: page,
                        pageSize: this.departments.pageSize,
                        search: this.search,
                        sortBy: this.sortBy,
                        sortOrder: this.sortOrder,
                    },
                });

                if (response.data && response.data.success) {
                    const res = response.data.data;
                    this.departments.items = res.items;
                    this.departments.currentPage = res.currentPage;
                    this.departments.totalPages = res.totalPages;
                    this.departments.totalCount = res.totalCount;
                }
            } catch (err) {
                console.error("Error fetching departments:", err);
            }
            finally {
                this.loading = false;

            }
        },
        async ClickbtnDepartment() {
            this.fetchDepartments();

            this.search = '';
        },
        onsearch() {
            this.departmentCount = this.departments.totalCount;
            this.fetchDepartments(1);

        }


    },
    mounted() {
        document.title = 'DEPARTMENT MANAGEMENT | MISO INVENTORY SYSTEM';
        this.countDepartment();

        this.fetchDepartments();

    }
};
</script>

<style scoped src="../../src/assets/styles/components/card.css"></style>
<style scoped src="../../src/assets/styles/components/button.css"></style>
<style scoped src="../../src/assets/styles/actions/action.css"></style>
