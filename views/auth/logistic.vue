<template>
  <div class="d-flex" id="delivery-page">
    <ComponentAuthSidebar />

    <div class="header-content w-100 d-flex flex-column bg-light-subtle" style="overflow-y: auto">
      <ComponentAuthNavigation pageTitle="Logistics" />

      <main class="container-fluid p-4">
        <ComponentLoader v-if="loading" class="loader-overlay" />
        <ComponentSuccessModal
          :showSuccess="showSuccess"
          :title="title"
          :message="message"
          buttonText="OK"
          @close="showSuccess = false"
        />
        <div class="card border-0 shadow-sm mx-4 my-3 p-3 rounded-4">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <ComponentSearch
              placeholder="Search Items or Serial Number..."
              v-model="search"
              @search="onsearch"
            />

            <div class="d-flex align-items-center gap-2 flex-wrap">
              <div class="btn-group bg-light p-1 rounded-pill">
                <button
                  class="btn btn-blue text-white rounded-pill px-3 shadow-sm fw-bold border-0 w-100"
                >
                  All Items
                  <span class="badge bg-white text-black ms-1" @click="AllItems()">{{
                    countItem
                  }}</span>
                </button>
              </div>
              <ComponentFilter v-model="filterStatus" :options="statusOptions" />
              <ComponentSorting v-model="sortBy" :options="sortOptions" :emit-value="true" />

              <button class="btn btn-blue text-white rounded-pill px-4 fw-bold shadow-sm">
                View Issuance
              </button>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-4 overflow-hidden" style="border-radius: 15px">
          <div
            class="card-body d-flex flex-column flex-md-row align-items-center justify-content-between p-3"
          >
            <div>
              <h5 class="mb-1 fw-bold text-dark">User Directory</h5>
              <p class="text-muted small mb-0">Manage and process your inventory items</p>
            </div>

            <div
              class="bg-light p-1 rounded-pill d-flex gap-1 mt-3 mt-md-0"
              style="border: 1px solid #e9ecef"
            >
              <button
                @click="changeDirectory(false)"
                :class="
                  !IschangeDisplay
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-muted border-0 bg-transparent'
                "
                class="btn rounded-pill px-4 btn-sm fw-bold transition-base"
              >
                <i class="bi bi-grid-fill me-2"></i>Card
              </button>
              <button
                @click="changeDirectory(true)"
                :class="
                  IschangeDisplay
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-muted border-0 bg-transparent'
                "
                class="btn rounded-pill px-4 btn-sm fw-bold transition-base"
              >
                <i class="bi bi-list-task me-2"></i>Table
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="items?.ListItems?.items?.length === 0"
          class="container-fluid d-flex flex-column align-items-center justify-content-center mb-5"
          style="min-height: 60vh"
        >
          <div class="empty-state-container text-center px-4">
            <div
              class="icon-box-glow mb-4 mx-auto d-flex align-items-center justify-content-center"
            >
              <i class="bi bi-search display-1 text-primary opacity-50"></i>
            </div>

            <h2 class="fw-bold text-dark">No Items Found</h2>
            <p class="text-muted mb-4 mx-auto" style="max-width: 400px">
              Your directory is currently empty. Click the button below to start adding new products
              to your logistics list.
            </p>

            <button
              class="btn btn-primary btn-lg rounded-pill px-5 shadow transition-base"
              @click="refreshList"
            >
              <i class="bi bi-plus-circle me-2"></i>Add New Items
            </button>
          </div>
        </div>

        <div
          class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 mb-4"
          v-else-if="items?.ListItems?.items?.length > 0 && !IschangeDisplay"
        ></div>
        <div v-if="!IschangeDisplay">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4">
            <div class="col" v-for="item in items.ListItems.items" :key="item.itemCode">
              <div class="card h-100 shadow-sm border-0 product-card">
                <div class="position-relative overflow-hidden group">
                  <img
                    :src="
                      item.image ||
                      'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100079694288900'
                    "
                    class="card-img-top p-2 rounded-4 img-fluid transition-zoom"
                    alt="MISO Logo"
                    style="height: 200px; object-fit: cover; width: 100%; z-index: 1"
                    loading="lazy"
                  />

                  <div
                    class="position-absolute top-50 start-50 translate-middle opacity-25"
                    style="z-index: 0"
                  >
                    <i class="bi bi-image text-muted" style="font-size: 2rem"></i>
                  </div>

                  <div
                    class="position-absolute top-0 end-0 m-3 d-flex flex-column align-items-end gap-2"
                  >
                    <span
                      class="badge rounded-pill bg-primary px-3 py-2 shadow-lg fw-bold border border-white border-opacity-25"
                      style="backdrop-filter: blur(4px); font-size: 0.75rem"
                    >
                      <i class="bi bi-tag-fill me-1"></i> {{ item.itemCode }}
                    </span>

                    <span
                      v-if="item.stock > 0"
                      class="badge rounded-pill bg-success px-2 py-1 shadow-sm"
                      style="font-size: 0.65rem"
                    >
                      Ready to Ship
                    </span>
                  </div>

                  <div class="product-overlay"></div>
                </div>

                <div class="card-body d-flex flex-column p-4">
                  <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-start">
                      <span
                        class="text-uppercase text-muted fw-bold small tracking-wider"
                        style="letter-spacing: 0.05rem; font-size: 0.7rem"
                      >
                        #{{ item.serialNumber || 'N/A' }}
                      </span>
                      <span
                        :class="[
                          'badge rounded-pill border px-2 py-1',
                          item.availableStocks > 10
                            ? 'bg-success-subtle text-success border-success-subtle'
                            : 'bg-warning-subtle text-warning-emphasis border-warning-subtle',
                        ]"
                      >
                        {{ item.availableStocks }} in stock
                      </span>
                    </div>
                    <h5 class="card-title mt-1 mb-0 fw-bold text-dark h6">
                      {{ item.type }}
                    </h5>
                  </div>

                  <p
                    class="card-text text-secondary small mb-4 flex-grow-1"
                    style="
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      line-height: 1.5;
                    "
                  >
                    {{ item.description || 'No description available for this item.' }}
                  </p>

                  <div class="mt-auto">
                    <div class="d-grid">
                      <button
                        class="btn btn-primary rounded-3 py-2 fw-semibold shadow-sm border-0 d-flex align-items-center justify-content-center"
                        @click="getItemDetails(item.itemID)"
                        style="
                          transition: all 0.2s ease;
                          background: linear-gradient(45deg, #0d6efd, #0a58ca);
                        "
                      >
                        <i class="bi bi-box-seam me-2"></i>
                        Order Processing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ComponentPagination
            :total-items="items.totalCount"
            :page-size="items.pageSize"
            :current-page="items.currentPage"
            :total-pages="items.totalPages"
            @go="fetchItems"
            @next="fetchItems(items.currentPage + 1)"
            @prev="fetchItems(items.currentPage - 1)"
          />
        </div>
        <div
          class="w-100 card border-0 shadow-sm overflow-hidden container-fluid w-75 py-3 mt-3 px-4 border-0 border-start border-primary"
          v-if="IschangeDisplay"
        >
          <div class="card border-0 shadow-sm">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                  <tr>
                    <th class="ps-4 py-3 text-uppercase x-small fw-bold text-secondary">
                      Item Info
                    </th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary">Description</th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary">Serial No.</th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary text-center">
                      UOM
                    </th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary">
                      Storage / Remarks
                    </th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary text-center">
                      Date Encoded
                    </th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary text-end">
                      Stocks
                    </th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary text-center">
                      Status
                    </th>
                    <th class="py-3 text-uppercase x-small fw-bold text-secondary text-end pe-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="item in items.ListItems.items"
                    :key="item.itemCode"
                    class="table-row-hover"
                  >
                    <td class="ps-4">
                      <div class="fw-bold text-dark">#{{ item.itemCode }}</div>
                      <div class="small text-muted text-truncate" style="max-width: 200px">
                        {{ item.type }}
                      </div>
                    </td>

                    <td>
                      <span
                        v-if="item.description"
                        class="badge rounded-pill bg-info-soft text-info border border-info-subtle text-truncate"
                        style="max-width: 250px; display: inline-block; vertical-align: middle"
                        :title="item.description"
                      >
                        {{ item.description }}
                      </span>

                      <span
                        v-else
                        class="badge rounded-pill bg-danger-soft text-danger border border-danger-subtle"
                      >
                        N/A
                      </span>
                    </td>

                    <td>
                      <span class="font-monospace small fw-bold">{{
                        item.serialNumber || 'N/A'
                      }}</span>
                    </td>

                    <td class="text-center">
                      <span class="text-secondary small">{{ item.unitOfMeasure }}</span>
                    </td>

                    <td>
                      <div class="d-flex flex-column">
                        <span class="small"
                          ><i class="bi bi-archive me-1"></i>{{ item.storage || 'Main' }}</span
                        >
                        <code class="x-small text-muted">{{ item.remarks || 'No remarks' }}</code>
                      </div>
                    </td>

                    <td class="text-center">
                      <div class="small">
                        <i class="bi bi-calendar3 me-1 text-primary"></i>
                        {{
                          new Date(item.dateEncoded).toLocaleDateString('en-PH', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                          })
                        }}
                      </div>
                    </td>

                    <td class="text-end">
                      <div class="fw-bold">{{ item.availableStocks }}</div>
                      <div class="x-small text-muted">Rel: {{ item.releasedStocks || 0 }}</div>
                    </td>

                    <td class="text-center">
                      <span
                        :class="[
                          'badge',
                          item.availableStocks > 10
                            ? 'bg-success'
                            : item.availableStocks > 0
                              ? 'bg-warning text-dark'
                              : 'bg-danger',
                        ]"
                      >
                        {{ item.availableStocks > 0 ? 'In Stock' : 'Out of Stock' }}
                      </span>
                    </td>

                    <td class="text-end pe-4">
                      <div class="btn-group">
                        <button
                          class="btn btn-blue rounded-3 py-2 fw-bold shadow-sm transition-base"
                          @click="getItemDetails(item.itemID)"
                        >
                          <i class="bi bi-truck me-2"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ComponentPagination
              :total-items="items.totalCount"
              :page-size="items.pageSize"
              :current-page="items.currentPage"
              :total-pages="items.totalPages"
              @go="fetchItems"
              @next="fetchItems(items.currentPage + 1)"
              @prev="fetchItems(items.currentPage - 1)"
            />
          </div>
        </div>
        <div v-if="showOrderModal" class="modal fade show d-block" tabindex="-1">
          <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content border-0 shadow">
              <!-- Modal Header -->
              <div class="modal-header border-bottom-0 pb-0">
                <h5 class="modal-title fw-bold">{{ actionTypeTitle }}</h5>
                <button
                  type="button"
                  class="btn-close"
                  @click="closeOrderModal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body p-4 pt-0">
                <div class="needs-validation">
                  <div
                    class="d-flex align-items-center justify-content-between mb-4 p-3 rounded-4 bg-primary-subtle border border-primary border-opacity-25"
                  >
                    <div>
                      <label class="form-label text-primary-emphasis small fw-bold mb-0 block">
                        <i class="bi bi-fingerprint me-1"></i> ITEM CODE
                      </label>
                      <div class="h5 mb-0 fw-bold text-primary">{{ currentItem.itemCode }}</div>
                    </div>
                    <div class="text-end">
                      <label class="form-label text-muted small fw-bold mb-1">SERIAL NO.</label>
                      <input
                        type="text"
                        class="form-control form-control-sm custom-input shadow-none border-0 text-end fw-bold"
                        :value="currentItem.serialNumber || 'N/A'"
                        style="background: transparent"
                      />
                    </div>
                  </div>

                  <div class="section-card mb-4 p-3 border rounded-4 bg-white shadow-sm">
                    <h6 class="fw-bold mb-3 text-dark d-flex align-items-center">
                      <span
                        class="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style="width: 24px; height: 24px"
                      >
                        <i class="bi bi-box-seam small"></i>
                      </span>
                      Item Details
                    </h6>

                    <div class="row g-3">
                      <div class="col-md-7">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1">
                          Item Type
                        </label>
                        <div>
                          <span class="badge btn btn-primary">{{ currentItem.type }}</span>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <label class="form-label text-muted extra-small fw-bold text-uppercase"
                          >Qty</label
                        >
                        <input
                          type="number"
                          v-model="dispatchData.quantity"
                          @input="validateQuantity"
                          class="form-control text-center shadow-none"
                          :max="currentItem.availableStocks"
                          min="1"
                        />
                      </div>
                      <div class="col-md-3">
                        <label class="form-label text-muted extra-small fw-bold text-uppercase"
                          >Unit</label
                        >
                        <select class="form-select shadow-none" v-model="dispatchData.oum">
                          <option>Pieces (pcs)</option>
                          <option>Sets</option>
                          <option>Kilograms (kg)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row g-3 mb-4">
                    <div class="row g-3 mb-4">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control shadow-none border-0 border-bottom rounded-0 px-0"
                            id="issuedTo"
                            placeholder="Name"
                            v-model="dispatchData.issuedTo"
                          />
                          <label for="issuedTo" class="ps-0 text-muted small fw-bold">
                            <i class="bi bi-person me-1"></i> ISSUED TO
                          </label>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label text-muted extra-small fw-bold text-uppercase"
                          >Issued Date</label
                        >
                        <input
                          type="date"
                          class="form-control form-control-sm border-0 shadow-none bg-transparent"
                          v-model="dispatchData.issuedToDate"
                          :min="todayDate()"
                        />
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control shadow-none border-0 border-bottom rounded-0 px-0"
                            id="issuedFrom"
                            placeholder="Name"
                            v-model="dispatchData.issuedFrom"
                          />
                          <label for="issuedFrom" class="ps-0 text-muted small fw-bold">
                            <i class="bi bi-person me-1"></i> ISSUED FROM
                          </label>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label
                          class="form-label text-muted extra-small fw-bold text-uppercase text-info"
                          >Issued Date
                        </label>
                        <input
                          type="date"
                          class="form-control form-control-sm border-0 shadow-none bg-transparent"
                          v-model="dispatchData.issuedFromDate"
                          :min="todayDate()"
                        />
                      </div>
                    </div>
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control border-0 border-bottom rounded-0 px-0"
                        id="issuedBy"
                        placeholder="Name"
                        value="Admin"
                        v-model="dispatchData.requestedBy"
                      />
                      <label for="issuedBy" class="ps-0 text-muted small fw-bold">
                        <i class="bi bi-person me-1"></i> REQUESTED BY
                      </label>
                    </div>
                    <div class="col-md-6 w-100">
                      <div class="form-floating">
                        <select
                          class="form-select shadow-none border-0 border-bottom rounded-0 px-0"
                          id="location"
                          v-model="dispatchData.locationID"
                        >
                          <option disabled value="">Select Site</option>

                          <option
                            v-for="loc in locations"
                            :key="loc.locationID"
                            :value="loc.locationID"
                          >
                            {{ loc.locationName }}
                          </option>
                        </select>

                        <label for="location" class="ps-0 text-muted small fw-bold">
                          <i class="bi bi-geo-alt me-1"></i>
                          LOCATION
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-2">
                    <label class="form-label text-muted small fw-bold"
                      ><i class="bi bi-chat-left-text me-1"></i> PURPOSE / REMARKS</label
                    >
                    <textarea
                      class="form-control shadow-none border-light-subtle"
                      rows="3"
                      placeholder="Describe the reason for issuance..."
                      style="resize: none; border-radius: 12px"
                      v-model="dispatchData.purpose"
                    ></textarea>
                  </div>
                  <div class="d-flex justify-content-end mt-3">
                    <button
                      class="btn btn-primary rounded-3 py-2 fw-bold shadow-sm w-25"
                      @click="dispatchItems(currentItem.itemID)"
                    >
                      <i class="bi bi-truck me-2"></i>Dispatch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showOrderModal" class="modal-backdrop fade show"></div>
        <ComponentToastError :message="errorMessage" ref="errorToast" />
      </main>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ComponentAuthSidebar from '@/components/auth/sidebar.vue'
import ComponentAuthNavigation from '@/components/auth/navigation.vue'
import ComponentLoader from './components/loading.vue'
import ComponentSuccessModal from './components/successModal.vue'
import ComponentPagination from '../../views/auth/components/pagination.vue'
import ComponentSearch from '../../views/auth/components/search.vue'
import ComponentFilter from '../../views/auth/components/filter.vue'
import ComponentSorting from '../../views/auth/components/sorting.vue'
import ComponentToastError from '../../src/components/toast/ToastError.vue'
export default {
  name: 'Logistic',
  components: {
    ComponentAuthSidebar,
    ComponentAuthNavigation,
    ComponentLoader,
    ComponentSuccessModal,
    ComponentPagination,
    ComponentSearch,
    ComponentFilter,
    ComponentSorting,
    ComponentToastError,
  },
  data() {
    return {
      actionType: '',
      actionTypeTitle: '',
      itemID: null,
      IschangeDisplay: false,
      showOrderModal: false,
      search: '',
      sortOrder: 'asc',
      filterStatus: '',
      showSuccess: false,
      message: '',
      statusOptions: [
        { value: 'inStock', label: 'In Stock', class: '', circleClass: 'bg-success' },
        {
          value: 'outOfStock',
          label: 'Out of Stock',
          class: 'text-danger',
          circleClass: 'bg-danger',
        },
      ],
      sortBy: '',
      sortOptions: [
        { value: 'recentlyUpdated', label: 'Recently Updated', icon: 'bi bi-calendar-check' },
        { value: 'nameAsc', label: 'Name: A to Z', icon: 'bi bi-sort-alpha-down' },
        { value: 'nameDesc', label: 'Name: Z to A', icon: 'bi bi-sort-alpha-up' },
      ],
      loading: false,
      message: '',
      title: '',
      countItem: 0,
      locations: [],
      items: {
        ListItems: [],
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
      },
      Items: {
        ItemCode: '',
        Type: '',
        Description: '',
        SerialNumber: '',
        UnitOfMeasure: '',
        Storage: '',
        Image: null,
        RelatedReleaseStocks: 0,
        AvailableStocks: 0,
        StockStatus: '',
        Remarks: '',
        Image: null,
      },
      currentItem: {
        itemCode: '',
        type: '',
        description: '',
        serialNumber: '',
        unitOfMeasure: '',
        storage: '',
        image: null,
        relatedReleaseStocks: 0,
        availableStocks: 0,
        stockStatus: '',
        remarks: '',
      },
      dispatchData: {
        locationID: null,
        issuedTo: '',
        issuedFrom: '',
        issuedToDate: '',
        issuedFromDate: '',
        purpose: '',
        oum: '',
        requestedBy: '',
        quantity: 1,
      },
      errors: {},
      errorMessage: '',
    }
  },
  methods: {
    changeDirectory(isChange) {
      this.IschangeDisplay = isChange
    },
    onsearch() {
      this.fetchItems(1)
    },
    async AllItems() {
      const response = await axios.get('https://localhost:5001/api/Item/countItems', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (response.data.success) {
        this.countItem = response.data.data
        this.search = ''
        this.fetchItems()
      }
    },
    async fetchItems(page = 1) {
      try {
        this.loading = true

        const response = await axios.get('https://localhost:5001/api/Item/listItems', {
          params: {
            pageNumber: page,
            pageSize: this.items.pageSize,
            search: this.search,
            sortBy: this.sortBy,
            filter: this.filterStatus,
            sortOrder: this.sortOrder,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const res = response.data.data

        this.items.ListItems = res // adjust if needed
        this.items.currentPage = res.currentPage
        this.items.totalPages = res.totalPages
        this.items.totalCount = res.totalCount
      } catch (error) {
        console.error('Fetch inventory error:', error)
      } finally {
        this.loading = false
      }
    },
    async getItemDetails(ItemID) {
      this.loading = true
      try {
        const response = await axios.get(`https://localhost:5001/api/Item/GetItem`, {
          params: { itemID: ItemID },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          const currentItem = response.data.data
          this.currentItem = currentItem
          this.itemID = ItemID
          this.actionType = 'order'
          this.actionTypeTitle = `Order Processing - ${currentItem.type}`
          this.showOrderModal = true
          this.listLocations()
        } else {
          alert('Item not found.')
        }
      } catch (error) {
        console.error('Error fetching item:', error)
        alert('Failed to load item details.')
      } finally {
        this.loading = false
      }
    },
    closeOrderModal() {
      this.showOrderModal = false
    },
    async listLocations() {
      try {
        const response = await axios.get('https://localhost:5001/api/Item/listLocations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.locations = response.data.data
      } catch (error) {
        console.error('Error listing locations:', error)
      }
    },
    async dispatchItems(itemID) {
      try {
        this.loading = true

        const payload = {
          FKItemID: itemID,
          FKLocationID: this.dispatchData.locationID,
          IssuedTo: this.dispatchData.issuedTo,
          IssuedFrom: this.dispatchData.issuedFrom,
          IssuedToDate: this.dispatchData.issuedToDate, // ISO string
          IssuedFromDate: this.dispatchData.issuedFromDate, // ISO string
          Purpose: this.dispatchData.purpose,
          UOM: this.dispatchData.oum,
          Quantity: this.dispatchData.quantity,
          RequestedBy: this.dispatchData.requestedBy,
        }
        const response = await axios.post(
          'https://localhost:5001/api/Logistic/AddIssuances',
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          },
        )

        if (response.data.success) {
          this.message = response.data.message
          this.title = 'Dispatch Successful'
          this.showSuccess = true
          this.showOrderModal = false

          this.loading = false

          this.fetchItems(this.items.currentPage)
        } else {
          this.errorMessage = response.data.message || 'Failed to dispatch items.'
          this.$refs.errorToast.show() // 🔥 show toast
        }
      } catch (error) {
        console.error(error.response?.data || error.message)
        this.errors.dispatch =
          error.response?.data?.message || 'An error occurred while dispatching items.'
      } finally {
        this.loading = false
      }
    },
    todayDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
  },
  mounted() {
    document.title = 'Logistic - Inventory Management System'
    this.fetchItems()
    this.AllItems()
  },
  watch: {
    filterStatus(newFilter) {
      this.fetchItems(1)
    },
    sortBy(newVal) {
      this.fetchItems(1)
    },
  },
}
</script>
<style scoped src="../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
<style scoped src="../../src/assets/styles/components/button.css"></style>
<style scoped src="../../src/assets/styles/delivery.css"></style>
<style scoped src="../../src/assets/styles/actions/action.css"></style>
