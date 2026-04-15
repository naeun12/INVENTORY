<template>

    <div class="d-flex" id="stockmanagement">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light mb-2" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Inventory" />
            <main>
                <ComponentSuccessModal :showSuccess="showSuccess" :title="title" :message="message" buttonText="OK"
                    @close="showSuccess = false" />
                <div class="card border-0 shadow-sm mx-4 my-3 p-3 rounded-4">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">

                        <ComponentSearch placeholder="Search Items or department heads..." v-model="search"
                            @search="onsearch" />

                        <div class="d-flex align-items-center gap-2 flex-wrap">

                            <div class="btn-group bg-light p-1 rounded-pill">
                                <button
                                    class="btn btn-blue text-white rounded-pill px-3 shadow-sm fw-bold border-0 w-100">
                                    All Items <span class="badge bg-white text-black ms-1" @click="AllItems()">{{
                                        countItem }}</span>
                                </button>

                            </div>
                            <ComponentFilter v-model="filterStatus" :options="statusOptions" />
                            <ComponentSorting v-model="sortBy" :options="sortOptions" :emit-value="true" />

                            <button class="btn btn-blue text-white rounded-pill px-4 fw-bold shadow-sm"
                                @click="OpenStocksAddModal()">
                                <i class="bi bi-plus-lg me-1"></i> Add Stock
                            </button>

                        </div>
                    </div>
                </div>
                <div
                    class="w-100 card border-0 shadow-sm overflow-hidden container-fluid w-75 py-3 mt-3 px-4 border-0 border-start border-primary">
                    <div class="table-responsive">
                        <div class="mb-4 d-flex justify-content-end gap-3">
                            <button class="btn btn-outline-primary rounded-pill px-4 shadow-sm fw-bold transition-all"
                                @click="exportItems">
                                <i class="bi bi-box-arrow-up me-2"></i> Export
                            </button>
                        </div>
                        <ComponentLoader v-if="loading" class="loader-overlay" />
                        <div class="card border-0 shadow-sm">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">

                                    <thead class="bg-light">
                                        <tr>
                                            <th class="ps-4 py-3 text-uppercase x-small fw-bold text-secondary">Item
                                                Info</th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary">
                                                Description</th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary">Serial No.
                                            </th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary text-center">
                                                UOM</th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary">Storage /
                                                Remarks</th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary text-center">
                                                Date Encoded</th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary text-end">
                                                Stocks</th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary text-center">
                                                Status</th>
                                            <th
                                                class="py-3 text-uppercase x-small fw-bold text-secondary text-end pe-4">
                                                Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="item in items.ListItems.items" :key="item.itemCode"
                                            class="table-row-hover">
                                            <td class="ps-4">
                                                <div class="fw-bold text-dark">#{{ item.itemCode }}</div>
                                                <div class="small text-muted text-truncate" style="max-width: 200px;">
                                                    {{ item.type }}
                                                </div>
                                            </td>

                                            <td>
                                                <span v-if="item.description"
                                                    class="badge rounded-pill bg-info-soft text-info border border-info-subtle text-truncate"
                                                    style="max-width: 250px; display: inline-block; vertical-align: middle;"
                                                    :title="item.description">
                                                    {{ item.description }}
                                                </span>

                                                <span v-else
                                                    class="badge rounded-pill bg-danger-soft text-danger border border-danger-subtle">
                                                    N/A
                                                </span>
                                            </td>

                                            <td>
                                                <span class="font-monospace small fw-bold">{{ item.serialNumber || 'N/A'
                                                }}</span>
                                            </td>

                                            <td class="text-center">
                                                <span class="text-secondary small">{{ item.unitOfMeasure }}</span>
                                            </td>

                                            <td>
                                                <div class="d-flex flex-column">
                                                    <span class="small"><i class="bi bi-archive me-1"></i>{{
                                                        item.storage || 'Main' }}</span>
                                                    <code
                                                        class="x-small text-muted">{{ item.remarks || 'No remarks' }}</code>
                                                </div>
                                            </td>

                                            <td class="text-center">
                                                <div class="small">
                                                    <i class="bi bi-calendar3 me-1 text-primary"></i>
                                                    {{ new Date(item.dateEncoded).toLocaleDateString('en-PH', {
                                                        year:
                                                            'numeric', month: 'short', day: '2-digit'
                                                    }) }}
                                                </div>
                                            </td>

                                            <td class="text-end">
                                                <div class="fw-bold">{{ item.availableStocks }}</div>
                                                <div class="x-small text-muted">Rel: {{ item.releasedStocks || 0 }}
                                                </div>
                                            </td>

                                            <td class="text-center">
                                                <span :class="[
                                                    'badge',
                                                    item.availableStocks > 10 ? 'bg-success' : item.availableStocks > 0 ? 'bg-warning text-dark' : 'bg-danger'
                                                ]">
                                                    {{ item.availableStocks > 0 ? 'In Stock' : 'Out of Stock' }}
                                                </span>
                                            </td>

                                            <td class="text-end pe-4">
                                                <div class="btn-group">
                                                    <button class="btn btn-outline-primary btn-sm" title="Edit"
                                                        @click="OpenStocksUpdateModal(item.itemID)">
                                                        <i class="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button class="btn btn-outline-danger btn-sm" title="Delete"
                                                        @click="OpenStockDeleteModal(item.itemID)">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <ComponentPagination :total-items="items.totalCount" :page-size="items.pageSize"
                        :current-page="items.currentPage" :total-pages="items.totalPages" @go="fetchInventory"
                        @next="fetchInventory(items.currentPage + 1)" @prev="fetchInventory(items.currentPage - 1)" />

                </div>
            </main>
        </div>

    </div>
    <div v-if="isAddItem" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">Add New Item</h5>
                    <button type="button" class="btn-close" @click="hideStocksAddModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <form @submit.prevent="saveItem">
                        <ComponentLoader v-if="loading" class="loader-overlay" />

                        <!-- Item Image (Full width) -->
                        <div class="mb-4">
                            <label class="form-label small fw-bold text-secondary mb-2">
                                Item Image
                            </label>
                            <div class="upload-container d-flex flex-column align-items-center justify-content-center border-dashed rounded-3 p-4"
                                :class="{ 'border-primary bg-light': isAddDragging }"
                                @dragover.prevent="isAddDragging = true" @dragleave.prevent="isAddDragging = false"
                                @drop.prevent="handleAddFileDrop" @click="$refs.fileAddInput.click()">

                                <input type="file" ref="fileAddInput" class="d-none" accept="image/*"
                                    @change="handleAddFileSelect">

                                <div v-if="previewAddUrl" class="text-center">
                                    <img :src="previewAddUrl" class="img-preview mb-2 rounded shadow-sm">
                                    <p class="small text-muted mb-0">Click to replace image</p>
                                </div>

                                <div v-else class="text-center">
                                    <i class="bi bi-cloud-arrow-up fs-2 text-primary"></i>
                                    <p class="mb-1 fw-medium">Click or drag image here</p>
                                    <p class="x-small text-muted">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3">
                            <!-- Item Code -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Item Code</label>
                                <input type="text" class="form-control" v-model="Items.ItemCode" required>
                            </div>

                            <!-- Type -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Type</label>
                                <input type="text" class="form-control" v-model="Items.Type"
                                    placeholder="e.g. Electronics" required>
                            </div>

                            <!-- Description -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Description</label>
                                <textarea class="form-control" v-model="Items.Description" required></textarea>
                            </div>

                            <!-- Unit of Measure -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Unit of Measure</label>
                                <input type="text" class="form-control" v-model="Items.UnitOfMeasure"
                                    placeholder="e.g. pcs, kg" required>
                            </div>

                            <!-- Storage -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Storage</label>
                                <input type="text" class="form-control" v-model="Items.Storage"
                                    placeholder="e.g. Warehouse A" required>
                            </div>

                            <!-- Serial Number -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Serial Number</label>
                                <input type="text" class="form-control" v-model="Items.SerialNumber"
                                    placeholder="Optional" required>
                            </div>

                            <!-- Available Stocks -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Available Stocks</label>
                                <input type="number" class="form-control" v-model="Items.AvailableStocks" min="0">
                            </div>

                            <!-- Related Release Stocks -->
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Remarks</label>
                                <input type="text" class="form-control" v-model="Items.Remarks" required>
                            </div>

                            <!-- Item Description -->


                            <!-- Stock Status -->

                        </div>

                        <!-- Submit -->
                        <div class="modal-footer border-top-0 px-0 pb-0 mt-3">
                            <button type="submit" class="btn btn-primary px-4">Save Item</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <div v-if="isAddItem" class="modal-backdrop fade show"></div>
    <!--Update-->
    <div v-if="isUpdateItem" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content border-0 shadow">

                    <!-- Modal Header -->
                    <div class="modal-header border-bottom-0 pb-0">
                        <h5 class="modal-title fw-bold">Update Item</h5>
                        <button type="button" class="btn-close" @click="hideStocksUpdateModal"
                            aria-label="Close"></button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <form @submit.prevent="updateItem">
                            <ComponentLoader v-if="loading" class="loader-overlay" />

                            <!-- Item Image (Full width) -->
                            <div class="mb-4">
                                <label class="form-label small fw-bold text-secondary mb-2">
                                    Item Image
                                </label>
                                <div class="upload-container d-flex flex-column align-items-center justify-content-center border-dashed rounded-3 p-4"
                                    :class="{ 'border-primary bg-light': isAddDragging }"
                                    @dragover.prevent="isAddDragging = true" @dragleave.prevent="isAddDragging = false"
                                    @drop.prevent="handleAddFileDrop" @click="$refs.fileAddInput.click()">

                                    <input type="file" ref="fileAddInput" class="d-none" accept="image/*"
                                        @change="handleAddFileSelect">

                                    <div v-if="previewAddUrl" class="text-center">
                                        <img :src="previewAddUrl" class="img-preview mb-2 rounded shadow-sm">
                                        <p class="small text-muted mb-0">Click to replace image</p>
                                    </div>

                                    <div v-else class="text-center">
                                        <i class="bi bi-cloud-arrow-up fs-2 text-primary"></i>
                                        <p class="mb-1 fw-medium">Click or drag image here</p>
                                        <p class="x-small text-muted">PNG, JPG up to 5MB</p>
                                    </div>
                                </div>
                            </div>

                            <div class="row g-3">
                                <!-- Item Code -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Item Code</label>
                                    <input type="text" class="form-control" v-model="currentItem.itemCode" required>
                                </div>

                                <!-- Type -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Type</label>
                                    <input type="text" class="form-control" v-model="currentItem.type"
                                        placeholder="e.g. Electronics" required>
                                </div>

                                <!-- Description -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Description</label>
                                    <textarea class="form-control" v-model="currentItem.description"
                                        required></textarea>
                                </div>

                                <!-- Unit of Measure -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Unit of Measure</label>
                                    <input type="text" class="form-control" v-model="currentItem.unitOfMeasure"
                                        placeholder="e.g. pcs, kg" required>
                                </div>

                                <!-- Storage -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Storage</label>
                                    <input type="text" class="form-control" v-model="currentItem.storage"
                                        placeholder="e.g. Warehouse A" required>
                                </div>

                                <!-- Serial Number -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Serial Number</label>
                                    <input type="text" class="form-control" v-model="currentItem.serialNumber"
                                        placeholder="Optional" required>
                                </div>

                                <!-- Available Stocks -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Available Stocks</label>
                                    <input type="number" class="form-control" v-model="currentItem.availableStocks"
                                        min="0">
                                </div>

                                <!-- Related Release Stocks -->
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Remarks</label>
                                    <input type="text" class="form-control" v-model="currentItem.remarks" required>
                                </div>

                                <!-- Item Description -->


                                <!-- Stock Status -->

                            </div>

                            <!-- Submit -->
                            <div class="modal-footer border-top-0 px-0 pb-0 mt-3">
                                <button type="submit" class="btn btn-primary px-4">Save Item</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div v-if="isUpdateItem" class="modal-backdrop fade show"></div>
    <div v-if="isDeleteItem" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">Delete Item!!</h5>
                    <button type="button" class="btn-close" @click="hideStocksDeleteModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <div>
                        <ComponentLoader v-if="loading" class="loader-overlay" />
                        <div class="delete-container">
                            <div class="delete-icon">!</div>

                            <p class="delete-text">Are you sure you want to delete this stock item?</p>

                            <div class="modal-footer border-top-0 p-0">
                                <button type="button" @click="deleteItem()" class="btn btn-delete-confirm">
                                    Delete Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import ComponentAuthSidebar from '@/components/auth/sidebar.vue'
import ComponentAuthNavigation from '@/components/auth/navigation.vue'
import ComponentLoader from './components/loading.vue'
import ComponentSuccessModal from './components/successModal.vue'
import ComponentPagination from '../../views/auth/components/pagination.vue';
import ComponentSearch from '../../views/auth/components/search.vue';
import ComponentFilter from '../../views/auth/components/filter.vue';
import ComponentSorting from '../../views/auth/components/sorting.vue';
export default {
    name: 'StockManagement',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentLoader,
        ComponentSuccessModal,
        ComponentPagination,
        ComponentSearch,
        ComponentFilter,
        ComponentSorting,
    },
    data() {
        return {
            isAddItem: false,
            isUpdateItem: false,
            isDeleteItem: false,
            isAddDragging: false,
            previewAddUrl: null,
            fileAddInput: null,
            search: '',
            sortOrder: 'asc',
            filterStatus: '',
            statusOptions: [
                { value: 'inStock', label: 'In Stock', class: '', circleClass: 'bg-success' },
                { value: 'outOfStock', label: 'Out of Stock', class: 'text-danger', circleClass: 'bg-danger' },
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
            showSuccess: false,
            itemID: 0,
            countItem: 0,
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
            }
        }
    },
    methods: {
        async OpenStocksAddModal() {

            this.isAddItem = true;
        },
        hideStocksAddModal() {
            this.isAddItem = false;
        },
        async OpenStocksUpdateModal(ItemCode) {
            this.isUpdateItem = true;
            this.getItem(ItemCode);

        },
        hideStocksUpdateModal() {
            this.isUpdateItem = false;

        },
        async OpenStockDeleteModal(ItemCode) {

            this.isDeleteItem = true;
            this.getItem(ItemCode);
            this.itemID = ItemCode;

        },
        hideStocksDeleteModal() {
            this.isDeleteItem = false;
        },
        getTodayLocal() {
            const d = new Date();
            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            return d.toISOString().split('T')[0];
        },
        handleAddFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                this.previewAddUrl = URL.createObjectURL(file);
                this.Items.Image = file; // ✅ store the file
            }
        },

        handleAddFileDrop(event) {
            this.isAddDragging = false;
            const file = event.dataTransfer.files[0];
            if (file) {
                this.previewAddUrl = URL.createObjectURL(file);
                this.Items.Image = file; // ✅ store the file
                this.$refs.fileAddInput.files = event.dataTransfer.files;
            }
        },
        onsearch() {
            this.fetchInventory(1);

        },
        async AllItems() {
            const response = await axios.get('https://localhost:7050/api/Items/countItems',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.data.success) {
                this.countItem = response.data.data;
                this.search = '';
                this.fetchInventory();

            }
        },
        async fetchInventory(page = 1) {
            try {
                this.loading = true;

                const response = await axios.get('https://localhost:7050/api/Items/listItems',
                    {
                        params: {
                            pageNumber: page,
                            pageSize: this.items.pageSize,
                            search: this.search,
                            sortBy: this.sortBy,
                            filter: this.filterStatus,
                            sortOrder: this.sortOrder
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                const res = response.data.data;

                this.items.ListItems = res; // adjust if needed
                this.items.currentPage = res.currentPage;
                this.items.totalPages = res.totalPages;
                this.items.totalCount = res.totalCount;
            } catch (error) {
                console.error('Fetch inventory error:', error);
            }
            finally {
                this.loading = false;

            }

        },
        async saveItem() {
            try {
                this.loading = true;

                const formData = new FormData();

                formData.append('ItemCode', this.Items.ItemCode || '');
                formData.append('Type', this.Items.Type || '');
                formData.append('Description', this.Items.Description || '');
                formData.append('SerialNumber', this.Items.SerialNumber || '');
                formData.append('UnitOfMeasure', this.Items.UnitOfMeasure || '');
                formData.append('Storage', this.Items.Storage || '');
                formData.append('AvailableStocks', Number(this.Items.AvailableStocks) || 0);
                formData.append('Remarks', this.Items.Remarks || '');
                formData.append('StockStatus', true);
                const response = await axios.post(
                    'https://localhost:7050/api/Items/addItems',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                console.log(response.data);

            } catch (error) {
                console.log("ERROR:", error.response.data.errors);
            } finally {
                this.loading = false;
            }
        },
        async updateItem() {
            this.loading = true;
            try {
                const formData = new FormData();
                formData.append('ItemID', this.itemID)
                formData.append('ItemCode', this.currentItem.itemCode || '');
                formData.append('Type', this.currentItem.type || '');
                formData.append('Description', this.currentItem.description || '');
                formData.append('SerialNumber', this.currentItem.serialNumber || '');
                formData.append('UnitOfMeasure', this.currentItem.unitOfMeasure || '');
                formData.append('Storage', this.currentItem.storage || '');
                formData.append('AvailableStocks', Number(this.currentItem.availableStocks) || 0);
                formData.append('Remarks', this.currentItem.remarks || '');
                const response = await axios.put(
                    'https://localhost:7050/api/Items/editItem',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    this.currentItem = {
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
                    };
                    this.title = 'Success!';
                    this.message = 'Item has been Updated successfully!';
                    this.isUpdateItem = false;
                    this.showSuccess = true;
                    this.fetchInventory();

                } else {
                    alert("Failed to update item: " + response.data.message);
                }

            } catch (error) {
                console.error(error);
                alert("An error occurred while updating the item.");
            } finally {
                this.loading = false;
            }
        },
        async getItem(itemID) {
            this.loading = true;
            try {
                const response = await axios.get(`https://localhost:7050/api/Items/GetItem`, {
                    params: { itemID: itemID },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const currentItem = response.data.data;
                    this.currentItem = currentItem;
                    this.itemID = itemID;
                } else {
                    alert("Item not found.");
                }
            } catch (error) {
                console.error("Error fetching item:", error);
                alert("Failed to load item details.");
            }
            finally {
                this.loading = false;

            }
        },
        async deleteItem() {
            this.loading = true;

            try {
                const response = await axios.delete(
                    `https://localhost:7050/api/Items/deleteItem/${this.itemID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                // ✅ Check response
                if (response.data.success) {
                    this.title = 'Success!';
                    this.message = 'Item has been Deleted!';
                    this.showSuccess = true;
                    this.isDeleteItem = false;
                    this.fetchInventory();

                } else {
                    alert("Delete failed: " + response.data.message);
                }

            } catch (error) {
                console.error(error);
                alert("Error deleting item.");
            } finally {
                this.loading = false;
            }
        },
        async exportItems() {
            try {
                this.loading = true;
                const response = await axios.get('https://localhost:7050/api/Items/exportItems', {
                    responseType: 'blob'
                });
                const blob = new blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Items.xlsx');
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
            }
            catch (error) {
                console.error('Error downloading Excel:', error);

            }
            finally {
                this.loading = false;
            }
        },
        async exportItems() {
            try {
                this.loading = true;
                const token = localStorage.getItem('token'); // get your JWT

                const response = await axios.get('https://localhost:7050/api/Items/exportItems', {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', 'Items.xlsx');

                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
                this.loading = false

            } catch (error) {
                console.error('Error downloading Excel:', error);
            }
        }

    },
    mounted() {
        this.fetchInventory();
        this.AllItems();
        document.title = 'Items Management | MISO INVENTORY SYSTEM'

    },
    watch: {
        filterStatus(newFilter) {
            this.fetchInventory(1); // reset to first page on filter change
        },
        sortBy(newVal) {
            this.fetchInventory(1); // reset to page 1
        }
    }
}
</script>
<style scoped src="../../src/assets/styles/stockmanagement.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
<style scoped src="../../src/assets/styles/actions/action.css"></style>
<style scoped>
.x-small {
    font-size: 0.75rem;
}

.table-row-hover:hover {
    background-color: #f8f9fa !important;
    transition: background-color 0.2s ease;
}

.bg-info-soft {
    background-color: rgba(13, 202, 240, 0.1);
}

.btn-group .btn {
    padding: 0.25rem 0.5rem;
}

/* Optional: Make the table header sticky */
thead th {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #f8f9fa;
}
</style>
