<template>
  <div class="d-flex" id="issuances-page">
    <ComponentAuthSidebar />
    <div
      class="header-content w-100 d-flex flex-column bg-light"
      style="height: 100vh; overflow-y: auto"
    >
      <ComponentAuthNavigation pageTitle="Issuances" />
      <main class="p-4">
        <div class="card border-0 shadow-sm p-3 rounded-4">
          <div class="row g-3 align-items-center">
            <div class="col-lg-4 col-md-12">
              <div class="input-group bg-light rounded-pill px-3">
                <span class="input-group-text bg-transparent border-0 text-muted">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control bg-transparent border-0 shadow-none ps-0"
                  placeholder="Search issuance, item, or personnel..."
                  style="font-size: 0.9rem"
                />
              </div>
            </div>

            <div class="col-lg-3 col-md-6 border-start-md ps-lg-4">
              <div class="d-flex align-items-center">
                <div class="bg-blue-light p-2 rounded-3 me-2 d-none d-xl-block">
                  <i class="bi bi-calendar-event text-blue"></i>
                </div>
                <div>
                  <label
                    class="text-muted small fw-bold text-uppercase d-block mb-0"
                    style="font-size: 0.65rem"
                    >Report Date</label
                  >
                  <input
                    type="date"
                    class="form-control p-0 border-0 bg-transparent fw-semibold"
                    style="font-size: 0.9rem"
                  />
                </div>
              </div>
            </div>

            <div class="col-lg-5 col-md-6">
              <div class="d-flex align-items-center justify-content-lg-end gap-2">
                <div class="dropdown">
                  <button
                    class="btn btn-light bg-white border-0 rounded-pill px-3 shadow-sm small fw-semibold"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bi bi-sort-alpha-down me-2 text-blue"></i> Sort A-Z
                  </button>
                  <ul class="dropdown-menu border-0 shadow-sm rounded-3">
                    <li>
                      <a class="dropdown-item small" href="#"
                        ><i class="bi bi-sort-alpha-down me-2"></i> Name (A-Z)</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item small" href="#"
                        ><i class="bi bi-sort-alpha-up me-2"></i> Name (Z-A)</a
                      >
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item small" href="#"
                        ><i class="bi bi-clock-history me-2"></i> Newest First</a
                      >
                    </li>
                  </ul>
                </div>

                <select
                  class="form-select border-0 bg-white rounded-pill px-3 shadow-sm small fw-semibold text-muted"
                  style="width: auto"
                >
                  <option selected>Filter by Status</option>
                  <option value="all">View All Records</option>
                  <option value="pending">⏳ Awaiting Return</option>
                  <option value="returned">✅ Items Restored</option>
                  <option value="overdue">⚠️ Past Due Date</option>
                </select>

                <button
                  class="btn btn-blue px-4 rounded-pill shadow-sm fw-bold text-white flex-shrink-0"
                >
                  <i class="bi bi-file-earmark-bar-graph me-1"></i> Report
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-100 card border-0 shadow-sm overflow-hidden container-fluid w-75 py-3 mt-3 px-4 border-0 border-start border-primary"
        >
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4 py-3 text-uppercase small fw-bold text-muted">ISSUANCE ID</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">ITEM NAME</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">QUANTITY</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">UOM</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">ISSUED TO</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">PURPOSE</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">LOCATION</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">ISSUED DATE</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted">EXPECTED RETURN DATE</th>
                  <th class="py-3 text-uppercase small fw-bold text-muted text-end pe-4">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="align-middle border-bottom border-light"
                  v-for="issuance in issuances"
                  :key="issuance.issuancesID"
                >
                  <td class="ps-4 py-3 fw-bold text-dark">{{ issuance.issuancesID }}</td>
                  <td class="py-3">
                    <span class="fw-semibold">{{ issuance.item.type || 'Null' }}</span>
                    <br /><small class="text-muted">{{
                      issuance.item.itemDescription || 'Null'
                    }}</small>
                  </td>
                  <td class="py-3">{{ issuance.quantity }}</td>
                  <td class="py-3">{{ issuance.uom }}</td>
                  <td class="py-3">
                    <div class="d-flex align-items-center">
                      <div
                        class="bg-light rounded-circle me-2 d-flex align-items-center justify-content-center"
                        style="width: 30px; height: 30px"
                      >
                        <i class="bi bi-person text-muted small"></i>
                      </div>
                      <span>{{ issuance.issuedTo }}</span>
                    </div>
                  </td>
                  <td class="py-3 text-truncate" style="max-width: 150px">
                    {{ issuance.purpose }}
                  </td>
                  <td class="py-3">{{ issuance.location.locationName }}</td>
                  <td class="py-3 text-muted">{{ issuance.issuedFromDate }}</td>
                  <td class="py-3 text-muted">{{ issuance.issuedToDate }}</td>

                  <td class="text-end pe-4">
                    <button
                      class="btn btn-light btn-sm border me-1"
                      @click="OpenIssuanceUpdateModal('edit', 'Edit Issuance')"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-light btn-sm border text-danger"
                      @click="OpenIssuanceDeleteModal('delete', 'Delete Issuance')"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex align-items-center justify-content-between mt-4 px-4 pb-4">
            <div class="text-secondary small fw-medium">
              Showing <span class="text-dark fw-bold">1</span> to
              <span class="text-dark fw-bold">10</span> of
              <span class="text-dark fw-bold">90</span> entries
            </div>

            <nav aria-label="Page navigation">
              <ul class="pagination pagination-custom gap-1 mb-0">
                <li class="page-item disabled">
                  <a class="page-link border-0 shadow-sm rounded-3" href="#" tabindex="-1">
                    <i class="bi bi-chevron-left"></i>
                  </a>
                </li>

                <li class="page-item active">
                  <a class="page-link border-0 shadow-sm rounded-3" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link border-0 shadow-sm rounded-3" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link border-0 shadow-sm rounded-3" href="#">3</a>
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
      <div v-if="showIssuanceUpdateModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <!-- Modal Header -->
            <div class="modal-header border-bottom-0 pb-0">
              <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
              <button
                type="button"
                class="btn-close"
                @click="hideIssuanceUpdateModal"
                aria-label="Close"
              ></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
              <issuancesAction :action-type="actionType" :action-type-title="actionTypeTitle" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDepartmentUpdateModal" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>
<script>
import ComponentAuthSidebar from '@/components/auth/sidebar.vue'
import ComponentAuthNavigation from '@/components/auth/navigation.vue'
import issuancesAction from './actions/issuancesAction.vue'
import axios from 'axios'

export default {
  name: 'Issuances',
  components: {
    ComponentAuthSidebar,
    ComponentAuthNavigation,
    issuancesAction,
  },
  data() {
    return {
      showIssuanceUpdateModal: false,
      actionType: '',
      actionTypeTitle: '',
      issuances: [],
    }
  },
  methods: {
    OpenIssuanceUpdateModal(type, title) {
      this.actionType = type
      this.actionTypeTitle = title
      this.showIssuanceUpdateModal = true
    },
    OpenIssuanceDeleteModal(type, title) {
      this.actionType = type
      this.actionTypeTitle = title
      this.showIssuanceUpdateModal = true
    },
    hideIssuanceUpdateModal() {
      this.showIssuanceUpdateModal = false
    },
    async fetchIssuances() {
      try {
        const response = await axios.get('https://localhost:5001/api/Inssuance/ListIssuances', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            pageNumber: 1,
            pageSize: 10,
            search: '',
            filter: '',
            sortBy: '',
            sortOrder: 'asc',
          },
        })

        this.issuances = response.data.data.items
        console.log(this.issuances)
      } catch (error) {
        console.error('Error fetching issuances:', error)
      }
    },
  },
  mounted() {
    document.title = 'Issuances - Inventory Management System'
    this.fetchIssuances()
  },
}
</script>
<style scoped src="../../src/assets/styles/issuances.css"></style>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
