<template>
    <div class="d-flex" id="dashboard">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Dashboard" />

            <main class="p-4">
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card border-0 shadow-sm p-3 rounded-4">
                            <div
                                class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">

                                <div class="d-flex align-items-center flex-grow-1">
                                    <div class="bg-blue-light p-2 rounded-3 me-3 d-none d-md-block">
                                        <i class="bi bi-calendar-check text-blue"></i>
                                    </div>
                                    <div>
                                        <label class="text-muted small fw-bold text-uppercase d-block mb-1"
                                            style="font-size: 0.7rem; letter-spacing: 1px;">Report Date</label>
                                        <input type="date" class="form-control custom-input border-0" value="2023-10-27"
                                            style="width: 200px;">
                                    </div>
                                </div>

                                <div class="text-end">
                                    <button class="btn btn-blue px-4 py-2 fw-bold text-white rounded-pill shadow-sm">
                                        <i class="bi bi-file-earmark-bar-graph me-2"></i>Generate Report
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row g-4">

                    <div class="col-lg-9">
                        <div class="row g-4 mb-4">
                            <div class="col-md-6">
                                <div class="card border-0 shadow-sm border-start border-success border-4 p-2 h-100">
                                    <div class="card-body d-flex align-items-center justify-content-between">
                                        <!-- Text -->
                                        <div>
                                            <h6 class="text-muted small text-uppercase mb-1">Total Deliveries</h6>
                                            <h2 class="fw-bold mb-0">4,520</h2>
                                        </div>

                                        <!-- Icon -->
                                        <div class="fs-1 text-primary opacity-75">
                                            🚚
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card border-0 shadow-sm border-start border-success border-4 p-2 h-100">
                                    <div class="card-body d-flex align-items-center justify-content-between">
                                        <!-- Text -->
                                        <div>
                                            <h6 class="text-muted small text-uppercase mb-1">Total Items</h6>
                                            <h2 class="fw-bold mb-0">12,891</h2>
                                        </div>

                                        <!-- Icon -->
                                        <div class="fs-1 text-success opacity-75">
                                            📦
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-4 d-flex align-items-center  justify-content-center">
                                <div class="card border-0 border-start border-primary border-4  shadow-sm p-3 h-100 ">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 class="text-muted small text-uppercase">Total Active Admins</h6>
                                            <h2 class="fw-bold mb-0">24</h2>
                                        </div>
                                        <div class="fs-1 text-primary opacity-50">👤</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class=" col-12 card border-0 border-top border-bottom border-primary border-4  shadow-sm overflow-hidden w-100 h-75 ">
                            <div
                                class="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                                <h6 class="fw-bold mb-0">Recent Inventory Transactions</h6>
                                <span class="badge bg-light text-dark border">Last 24 Hours</span>
                            </div>
                            <div class="table-responsive ">
                                <table class="table table-hover align-middle mb-0 w-100 h-100">
                                    <thead class="bg-light text-muted small uppercase">
                                        <tr>
                                            <th class="ps-4">Item Code</th>
                                            <th>Item Name</th>
                                            <th>Description</th>
                                            <th>On Hand</th>
                                            <th>UoM</th>
                                            <th>Serial No.</th>
                                            <th>Location</th>
                                            <th class="text-end">Date</th>
                                            <th class="pe-4">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in transactions" :key="index">
                                            <td class="ps-4 fw-bold text-primary small">#IC-{{ 100 + index }}</td>
                                            <td class="fw-medium">{{ item.name }}</td>
                                            <td class="text-muted small">Standard inventory item...</td>
                                            <td>
                                                <span class="badge bg-primary-subtle text-primary">{{ item.qty }}
                                                    pcs</span>
                                            </td>
                                            <td>Unit</td>
                                            <td class="small font-monospace text-muted">SN-982{{ index }}</td>
                                            <td>Warehouse A</td>
                                            <td class="text-end text-muted small">{{ item.date }}</td>
                                            <td class="pe-4"><span class="text-success">●</span> <small>Active</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-3">
                        <div class="card border-0 shadow-sm mb-4 border-top border-warning border-4">
                            <div class="card-body text-center py-5 border-dashed border-2 rounded m-2">
                                <h6 class="text-muted mb-4 small text-uppercase">Primary Analytics</h6>
                                <div class="d-flex align-items-end justify-content-center gap-2" style="height: 120px;">
                                    <div class="bg-primary opacity-25" style="width: 15px; height: 40%;"></div>
                                    <div class="bg-primary opacity-50" style="width: 15px; height: 70%;"></div>
                                    <div class="bg-primary" style="width: 15px; height: 100%;"></div>
                                    <div class="bg-primary opacity-75" style="width: 15px; height: 60%;"></div>
                                </div>
                                <p class="small text-muted mt-4 mb-0">Reports Generated: <strong>1,284</strong></p>
                            </div>
                        </div>

                        <div class="card border-0 shadow-sm border-top border-warning border-4">
                            <div class="card-header bg-white py-3 border-0">
                                <h6 class="fw-bold mb-0">System Summary</h6>
                            </div>
                            <div class="list-group list-group-flush">
                                <div v-for="stat in statsCards" :key="stat.id"
                                    class="list-group-item d-flex justify-content-between align-items-center py-3 border-0 mx-2 mb-1 rounded bg-light-hover">
                                    <span class="text-muted small">{{ stat.title }}</span>
                                    <span :class="['badge rounded-pill shadow-sm px-3', stat.bg]">{{ stat.value
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>
</template>

<script>
import ComponentAuthSidebar from '../../src/components/auth/sidebar.vue';
import ComponentAuthNavigation from '@/components/auth/navigation.vue'

export default {
    name: "Dashboard",
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation
    },
    data() {
        return {
            statsCards: [
                { id: 1, title: 'Total Products', value: 120, bg: 'bg-primary text-white' },
                { id: 2, title: 'Orders', value: 75, bg: 'bg-success text-white' },
                { id: 3, title: 'Suppliers', value: 15, bg: 'bg-warning text-dark' },
                { id: 4, title: 'Customers', value: 60, bg: 'bg-danger text-white' },
            ],
            transactions: [
                { name: 'Pens', qty: 20, date: '2026-01-28' },
                { name: 'Paper', qty: 50, date: '2026-01-27' },
                { name: 'Notebooks', qty: 15, date: '2026-01-26' },
                { name: 'Staplers', qty: 5, date: '2026-01-25' },
                { name: 'Markers', qty: 12, date: '2026-01-24' },
            ],
        };
    },
    mounted() {
        document.title = 'Dashboard | MISO INVENTORY SYSTEM';
    }
};
</script>
<style scoped src="../../src/assets/styles/dashboard.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>
