<template>

    <div class="d-flex" id="location">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light mb-2" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Location" />
            <main>
                <ComponentSuccessModal :showSuccess="showSuccess" :title="title" :message="message" buttonText="OK"
                    @close="showSuccess = false" />
                <div class="card border-0 shadow-sm mx-4 my-3 p-3 rounded-4">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">

                        <ComponentSearch placeholder="Search locations..." v-model="search" @search="onsearch" />

                        <div class="d-flex align-items-center gap-2 flex-wrap">

                            <div class="btn-group bg-light p-1 rounded-pill">
                                <button
                                    class="btn btn-blue text-white rounded-pill px-3 shadow-sm fw-bold border-0 w-100">
                                    All Locations <span class="badge bg-white text-black ms-1"
                                        @click="CountLocations()">{{
                                            countItem }}</span>
                                </button>

                            </div>
                            <button class="btn btn-blue text-white rounded-pill px-4 fw-bold shadow-sm"
                                @click="OpenLocationAddModal()">
                                <i class="bi bi-plus-lg me-1"></i> Add Location
                            </button>

                        </div>
                    </div>
                </div>
                <div
                    class="w-100 card border-0 shadow-sm overflow-hidden container-fluid w-75 py-3 mt-3 px-4 border-0 border-start border-primary">
                    <div class="table-responsive">
                        <ComponentLoader v-if="loading" class="loader-overlay" />
                        <div class="card border-0 shadow-sm">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">

                                    <thead class="bg-light">
                                        <tr>
                                            <th class="ps-4 py-3 text-uppercase x-small fw-bold text-secondary">Location
                                                ID
                                            </th>
                                            <th class="py-3 text-uppercase x-small fw-bold text-secondary">
                                                Locations</th>
                                            <th
                                                class="py-3 text-uppercase x-small fw-bold text-secondary text-end pe-4">
                                                Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(loc, index) in Locations.ListLocations" :key="loc.locationID"
                                            class="table-row-hover">
                                            <!-- Numbering based on pagination -->
                                            <td class="ps-4">
                                                #{{ loc.locationID }}

                                            </td>
                                            <td class="small text-muted text-truncate" style="max-width: 200px;">
                                                {{ loc.location }}
                                            </td>
                                            <!-- Action buttons -->
                                            <td class="text-end pe-4">
                                                <div class="btn-group">
                                                    <button class="btn btn-outline-primary btn-sm" title="Edit"
                                                        @click="OpenLocationUpdateModal(loc.locationID)">
                                                        <i class="bi bi-pencil-square"></i>
                                                    </button>

                                                    <button class="btn btn-outline-danger btn-sm" title="Delete"
                                                        @click="OpenLocationDeleteModal(loc.locationID)">
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


                    <ComponentPagination :total-locations="Locations.totalCount" :page-size="Locations.pageSize"
                        :current-page="Locations.currentPage" :total-pages="Locations.totalPages" @go="fetchLocations"
                        @next="fetchLocations(Locations.currentPage + 1)"
                        @prev="fetchLocations(Locations.currentPage - 1)" />

                </div>
            </main>
        </div>

    </div>
    <div v-if="isAddLocation" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">Add New Location</h5>
                    <button type="button" class="btn-close" @click="hideLocationModal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <form @submit.prevent="saveLocation">
                        <ComponentLoader v-if="loading" class="loader-overlay" />
                        <div class="mb-4">
                            <input type="text" class="form-control" name="locationName" id="locationName"
                                placeholder="Location Name" v-model="Location.Location" required>
                        </div>
                        <div class="modal-footer border-top-0 px-0 pb-0 mt-3">
                            <button type="submit" class="btn btn-primary px-4">Save Location</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <div v-if="isAddLocation" class="modal-backdrop fade show"></div>
    <!--Update-->
    <div v-if="isUpdateLocation" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">Update Location</h5>
                    <button type="button" class="btn-close" @click="hideLocationUpdateModal"
                        aria-label="Close"></button>
                </div>
                <!-- Modal Body -->
                <div class="modal-body">
                    <form @submit.prevent="updateLocation()">
                        <ComponentLoader v-if="loading" class="loader-overlay" />
                        <div class="mb-4">
                            <input type="text" class="form-control w-100" name="locationName" id="locationName"
                                placeholder="Location Name" v-model="currentLocation.location" required>
                        </div>

                        <div class="modal-footer border-top-0 px-0 pb-0 mt-3">
                            <button type="submit" class="btn btn-primary px-4">Update Location</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <div v-if="isUpdateLocation" class="modal-backdrop fade show"></div>
    <div v-if="isDeleteLocation" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">

                <!-- Modal Header -->
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold">Delete Location!!</h5>
                    <button type="button" class="btn-close" @click="hideLocationDeleteModal"
                        aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <div>
                        <ComponentLoader v-if="loading" class="loader-overlay" />
                        <div class="delete-container">
                            <div class="delete-icon">!</div>

                            <p class="delete-text">Are you sure you want to delete this location?</p>

                            <div class="modal-footer border-top-0 p-0">
                                <button type="button" @click="deleteLocation()" class="btn btn-delete-confirm">
                                    Delete Location
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
export default {
    name: 'LocationManagement',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
        ComponentLoader,
        ComponentSuccessModal,
        ComponentPagination,
        ComponentSearch,
    },
    data() {
        return {
            isAddLocation: false,
            isUpdateLocation: false,
            isDeleteLocation: false,
            search: '',
            sortOrder: 'asc',
            loading: false,
            message: '',
            title: '',
            showSuccess: false,
            LocationID: 0,
            countItem: 0,
            Locations: {
                ListLocations: [],
                currentPage: 1,
                pageSize: 20,
                totalCount: 0,
                totalPages: 1,
            },
            Location: {
                Location: '',
            },
            currentLocation: {
                location: '',
            }
        }
    },
    methods: {
        async OpenLocationAddModal() {
            this.isAddLocation = true;
        },
        hideLocationModal() {
            this.isAddLocation = false;
        },
        async OpenLocationUpdateModal(LocationID) {
            this.isUpdateLocation = true;
            await this.getLocation(LocationID);
        },
        hideLocationUpdateModal() {
            this.isUpdateLocation = false;

        },
        async OpenLocationDeleteModal(LocationID) {
            this.isDeleteLocation = true;
            await this.getLocation(LocationID);
        },
        hideLocationDeleteModal() {
            this.isDeleteLocation = false;
        },
        onsearch() {
            this.fetchLocations(1);
        },
        async CountLocations() {
            const response = await axios.get('https://localhost:7050/api/Location/countLocation',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.data.success) {
                this.countItem = response.data.data;
                this.search = '';
                this.fetchLocations();
            }
        },
        async fetchLocations(page = 1) {
            try {
                this.loading = true;

                const response = await axios.get('https://localhost:7050/api/Location/listLocations', {
                    params: {
                        pageNumber: page,
                        pageSize: this.Locations.pageSize,
                        search: this.search,
                        sortBy: this.sortBy,
                        filter: this.filterStatus,
                        sortOrder: this.sortOrder
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const data = response.data.data; // PaginatedListHelper object

                // Assign properly
                this.Locations.ListLocations = data.items; // ✅ loop sa items array
                this.Locations.currentPage = data.currentPage;
                this.Locations.totalPages = data.totalPages;
                this.Locations.totalCount = data.totalCount;

            } catch (error) {
                console.error('Fetch locations error:', error);
            } finally {
                this.loading = false;
            }
        },
        async saveLocation() {
            try {
                this.loading = true;

                const formData = new FormData();
                formData.append('Location', this.Location.Location || '');
                const response = await axios.post(
                    'https://localhost:7050/api/Location/addLocations',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.data.success) {
                    this.Location.Location = '';
                    this.title = 'Success!';
                    this.message = 'Location has been added successfully!';
                    this.showSuccess = true;
                    this.isAddLocation = false;
                    this.fetchLocations();

                } else {
                    alert("Failed to add location: " + response.data.message);
                }
            } catch (error) {
                console.log("ERROR:", error.response.data.errors);
            } finally {
                this.loading = false;
            }
        },
        async updateLocation() {
            console.log("Updating Location with ID:", this.LocationID);
            this.loading = true;
            try {
                const formData = new FormData();
                formData.append('LocationID', this.LocationID);
                formData.append('Location', this.currentLocation.location || '');
                const response = await axios.put(
                    'https://localhost:7050/api/Location/editLocation',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    this.currentLocation = {
                        location: '',
                    };
                    this.title = 'Success!';
                    this.message = 'Location has been Updated successfully!';
                    this.isUpdateLocation = false;
                    this.showSuccess = true;
                    this.fetchLocations();

                } else {
                    alert("Failed to update location: " + response.data.message);
                }

            } catch (error) {
                console.error(error);
                alert("An error occurred while updating the Location.");
            } finally {
                this.loading = false;
            }
        },
        async getLocation(locationID) {
            this.loading = true;
            try {
                const response = await axios.get(`https://localhost:7050/api/Location/getLocation`, {
                    params: { LocationID: locationID },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const currentLocation = response.data.data;
                    this.currentLocation = currentLocation;
                    this.LocationID = locationID;
                    console.log("Fetched Location:", this.LocationID);
                } else {
                    alert("Location not found.");
                }
            } catch (error) {
                console.error("Error fetching item:", error);
                alert("Failed to load item details.");
            }
            finally {
                this.loading = false;

            }
        },
        async deleteLocation() {
            this.loading = true;

            try {
                const response = await axios.delete(
                    `https://localhost:7050/api/Location/deleteLocation/${this.LocationID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.data.success) {
                    this.title = 'Success!';
                    this.message = 'Location has been Deleted!';
                    this.showSuccess = true;
                    this.isDeleteLocation = false;
                    this.fetchLocations();

                } else {
                    alert("Delete failed: " + response.data.message);
                }

            } catch (error) {
                console.error(error);
                alert("Error deleting location.");
            } finally {
                this.loading = false;
            }
        },

    },
    mounted() {
        this.fetchLocations();
        this.CountLocations();
        document.title = 'Locations Management | MISO INVENTORY SYSTEM'

    },
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
