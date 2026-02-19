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
                        <div class="mb-3 d-flex justify-content-end gap-2">
                            <!-- Export Button -->
                            <button class="btn btn-blue text-white rounded-pill px-3 shadow-sm fw-bold border-0"
                                @click="exportInventory">
                                <i class="bi bi-download me-2"></i> Export Data
                            </button>

                            <!-- Import Button -->
                        </div>
                        <table class="table table-hover align-middle mb-0">
                            <ComponentLoader v-if="loading" class="loader-overlay" />
                            <thead class="bg-light" v-else>
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
                                <tr class="align-middle" v-for="item in items.ListItems.items" :key="item.itemCode">
                                    <td><span class="badge bg-light text-dark border">#{{ item.itemCode }}</span>
                                    </td>
                                    <td class="fw-bold">{{ item.itemName }}</td>
                                    <td>
                                        <div class="small text-dark">{{ item.category }}</div>
                                        <div class="x-small text-muted text-truncate" style="max-width: 150px;">
                                            {{ item.details }}</div>
                                    </td>
                                    <td class="text-center"><span class="fw-bold">{{ item.quantity }}</span> <small
                                            class="text-muted">pcs</small></td>
                                    <td class="text-center">
                                        <span :class="{
                                            'badge rounded-pill bg-success-subtle text-success': item.quantity > 0,
                                            'badge rounded-pill bg-danger-subtle text-danger': item.quantity === 0
                                        }">
                                            {{ item.quantity > 0 ? 'In Stock' : 'Out of Stock' }}
                                        </span>
                                    </td>
                                    <td><code class="small">{{ item.serialNo }}</code></td>
                                    <td class="text-center"><i class="bi bi-geo-alt text-danger"></i>{{ item.location }}
                                    </td>
                                    <td class="small text-muted">
                                        {{ new Date(item.lastAudit).toLocaleDateString('en-PH', {
                                            year: 'numeric',
                                            month: 'short', day: '2-digit'
                                        }) }}
                                    </td>
                                    <td class="text-end pe-4">
                                        <button class="btn btn-light btn-sm border me-1"
                                            @click="OpenStocksUpdateModal(item.itemCode)"><i
                                                class="bi bi-pencil"></i></button>
                                        <button class="btn btn-light btn-sm border text-danger"
                                            @click="OpenStockDeleteModal(item.itemCode)"><i
                                                class="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                        <!-- Item Code -->
                        <div class="mb-4">
                            <label class="form-label small fw-bold text-secondary mb-2" for="itemImage">
                                Item Image
                            </label>
                            <div class="upload-container d-flex flex-column align-items-center justify-content-center border-dashed rounded-3 p-4"
                                :class="{ 'border-primary bg-ligth': isAddDragging }"
                                @dragover.prevent="isAddDragging = true" @dragleave.prevent="isAddDragging = false"
                                @drop.prevent="handleAddFileDrop" @click="$refs.fileAddInput.click()">

                                <input type="file" id="itemCode" ref="fileAddInput" class="d-none" accept="image/*"
                                    @change="handleAddFileSelect">
                                <div v-if="previewAddUrl" class="text-center">
                                    <img :src="previewAddUrl" class="img-preview mb-2 rounded shadow-sm" alt="Preview">
                                    <p class="small text-muted mb-0">Click to replace image</p>
                                </div>
                                <div v-else class="text-center">
                                    <i class="bi bi-cloud-arrow-up fs-2 text-primary"></i>
                                    <p class="mb-1 fw-medium">Click or drag image here</p>
                                    <p class="x-small text-muted">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="itemName">Item Name</label>
                            <input type="text" id="itemName" class="form-control" v-model="Items.ItemName"
                                placeholder="e.g. Wireless Mouse" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="category">Category</label>
                            <input type="text" id="category" class="form-control" v-model="Items.Category"
                                placeholder="e.g. Electronics, Tools" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold h-100" for="itemDetails">Item Details</label>
                            <textarea type="text" id="itemDetails" class="form-control" v-model="Items.Details"
                                placeholder="e.g. High-End Wireless Mouse" required></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="onHand">QUANTITY</label>
                            <input type="number" id="onHand" v-model="Items.Quantity" class="form-control" min="0"
                                required>
                        </div>



                        <!-- Serial No. -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="serialNo">Serial No.</label>
                            <input type="text" id="serialNo" class="form-control" v-model="Items.SerialNo"
                                placeholder="Optional">
                        </div>

                        <!-- Location -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="location">Location</label>
                            <input type="text" id="location" class="form-control" v-model="Items.Location"
                                placeholder="e.g. Warehouse A" required>
                        </div>

                        <!-- Remarks -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="auditDate">Audit Date</label>
                            <input type="date" id="auditDate" class="form-control" v-model="Items.AuditDate"
                                placeholder="Optional">
                        </div>

                        <!-- Modal Footer -->
                        <div class="modal-footer border-top-0 px-0 pb-0">
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
            <ComponentLoader v-if="loading" class="loader-overlay" />
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">Update Item</h5>
                    <button type="button" class="btn-close" @click="hideStocksUpdateModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <form @submit.prevent="updateItem">

                        <!-- Item Code -->
                        <div class="mb-4">
                            <label class="form-label small fw-bold text-secondary mb-2" for="itemImage">
                                Item Image
                            </label>
                            <div class="upload-container d-flex flex-column align-items-center justify-content-center border-dashed rounded-3 p-4"
                                :class="{ 'border-primary bg-ligth': isAddDragging }"
                                @dragover.prevent="isAddDragging = true" @dragleave.prevent="isAddDragging = false"
                                @drop.prevent="handleAddFileDrop" @click="$refs.fileAddInput.click()">

                                <input type="file" id="itemCode" ref="fileAddInput" class="d-none" accept="image/*"
                                    @change="handleAddFileSelect">
                                <div v-if="previewAddUrl" class="text-center">
                                    <img :src="previewAddUrl" class="img-preview mb-2 rounded shadow-sm" alt="Preview">
                                    <p class="small text-muted mb-0">Click to replace image</p>
                                </div>
                                <div v-else class="text-center">
                                    <i class="bi bi-cloud-arrow-up fs-2 text-primary"></i>
                                    <p class="mb-1 fw-medium">Click or drag image here</p>
                                    <p class="x-small text-muted">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="itemName">Item Name</label>
                            <input type="text" id="itemName" class="form-control" v-model="currentItem.itemName"
                                placeholder="e.g. Wireless Mouse" required>
                        </div>
                        <!-- Item Description -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="category">Category</label>
                            <input type="text" id="category" class="form-control" placeholder="e.g. Electronics, Tools"
                                v-model="currentItem.category" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold h-100" for="itemDetails">Item Details</label>
                            <textarea type="text" id="itemDetails" class="form-control"
                                placeholder="e.g. High-End Wireless Mouse" v-model="currentItem.details"
                                required></textarea>
                        </div>

                        <!-- On-Hand Quantity -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="onHand">QUANTITY</label>
                            <input type="number" id="onHand" class="form-control" min="0" v-model="currentItem.quantity"
                                required>
                        </div>

                        <!-- OUM -->


                        <!-- Serial No. -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="serialNo">Serial No.</label>
                            <input type="text" id="serialNo" class="form-control" placeholder="Optional"
                                v-model="currentItem.serialNo">
                        </div>

                        <!-- Location -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="location">Location</label>
                            <input type="text" id="location" class="form-control" placeholder="e.g. Warehouse A"
                                v-model="currentItem.location" required>
                        </div>
                        <!-- Remarks -->
                        <div class="mb-3">
                            <label class="form-label small fw-bold" for="lastAudit">Last Audit</label>
                            <input type="date" id="lastAudit" class="form-control" v-model="currentItem.lastAudit"
                                placeholder="Optional">
                        </div>

                        <!-- Modal Footer -->
                        <div class="modal-footer border-top-0 px-0 pb-0">
                            <button type="submit" class="btn btn-primary px-4">Save Item</button>
                        </div>

                    </form>
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
                pageSize: 10,
                totalCount: 0,
                totalPages: 1,
            },
            Items: {
                ItemName: '',
                Category: '',
                Details: '',
                Quantity: 0,
                SerialNo: '',
                Location: '',
                AuditDate: this.getTodayLocal(),
                ItemImage: null
            },
            currentItem: {
                itemName: '',
                category: '',
                details: '',
                quantity: 0,
                serialNo: '',
                location: '',
                lastAudit: '',
                ItemImage: null
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
                this.Items.ItemImage = file; // ✅ store the file
            }
        },

        handleAddFileDrop(event) {
            this.isAddDragging = false;
            const file = event.dataTransfer.files[0];
            if (file) {
                this.previewAddUrl = URL.createObjectURL(file);
                this.Items.ItemImage = file; // ✅ store the file
                this.$refs.fileAddInput.files = event.dataTransfer.files;
            }
        },
        onsearch() {
            this.fetchInventory(1);

        },
        async AllItems() {
            const response = await axios.get('https://localhost:7050/api/Inventory/countItems',
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

                const response = await axios.get('https://localhost:7050/api/Inventory/listInventory',
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
                formData.append('ItemName', this.Items.ItemName);
                formData.append('Category', this.Items.Category);
                formData.append('Details', this.Items.Details || '');
                formData.append('Quantity', this.Items.Quantity);
                formData.append('SerialNo', this.Items.SerialNo || '');
                formData.append('Location', this.Items.Location || '');
                if (this.Items.AuditDate) {
                    formData.append('LastAudit', this.Items.AuditDate);
                }
                if (this.Items.ItemImage) {
                    formData.append('ItemImage', this.Items.ItemImage);
                }
                const response = await axios.post(
                    'https://localhost:7050/api/Inventory/addInventory',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                this.Items = {
                    ItemName: '',
                    Category: '',
                    Details: '',
                    Quantity: 0,
                    SerialNo: '',
                    Location: '',
                    AuditDate: '',
                    ItemImage: null
                };
                alert(this.filterStatus);
                this.previewAddUrl = null;
                this.title = 'Success!';
                this.message = 'Item has been saved successfully!';
                this.isAddItem = false;
                this.showSuccess = true;
                this.fetchInventory();

            } catch (error) {
                console.error('Error saving item:', error.response?.data || error.message);
                alert('Failed to save stock item.');
            }
            finally {
                this.loading = false;

            }
        },
        async updateItem() {
            this.loading = true;
            try {
                const payload = {
                    itemCode: this.currentItem.itemCode, // make sure to include the primary key
                    itemName: this.currentItem.itemName,
                    category: this.currentItem.category,
                    details: this.currentItem.details || '',
                    quantity: this.currentItem.quantity,
                    serialNo: this.currentItem.serialNo || '',
                    location: this.currentItem.location || '',
                    lastAudit: this.currentItem.auditDate || null
                };

                const response = await axios.put(
                    'https://localhost:7050/api/Inventory/editItem',
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    this.currentItem = {
                        ItemName: '',
                        Category: '',
                        Details: '',
                        Quantity: 0,
                        SerialNo: '',
                        Location: '',
                        AuditDate: '',
                        ItemImage: null
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
        async getItem(ItemCode) {
            this.loading = true;
            try {
                // Make sure to include the correct API URL and pass the ItemCode as a query parameter
                const response = await axios.get(`https://localhost:7050/api/Inventory/GetItem`, {
                    params: { ItemCode: ItemCode },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const currentItem = response.data.data;

                    if (currentItem.lastAudit) {
                        currentItem.lastAudit = currentItem.lastAudit.split('T')[0];
                    }

                    this.currentItem = currentItem;
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
                    `https://localhost:7050/api/Inventory/deleteItem/${this.itemID}`,
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
        }

    },
    mounted() {
        this.fetchInventory();
        this.AllItems();
        document.title = 'Stock Management | MISO INVENTORY SYSTEM'

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
