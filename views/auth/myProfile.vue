<template>
    <div class="d-flex" id="my-profile-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="My Profile" />

            <div class="container-fluid py-4">
                <div class="row g-4">

                    <div class="col-lg-3">
                        <div class="card shadow-sm border-0 mb-4 text-center p-4">
                            <div class="bg-secondary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white shadow-sm"
                                style="width: 100px; height: 100px;">
                                <i class="bi bi-person-fill fs-1"></i>
                            </div>
                            <h5 class="fw-bold mb-0">Lance Monsanto</h5>
                            <small class="text-muted fw-semibold uppercase">Administrator</small>
                        </div>

                        <div class="card shadow-sm border-0 p-3 h-100">
                            <h6 class="fw-bold text-uppercase small text-muted mb-3">System Analytics</h6>
                            <div class="bg-light rounded d-flex align-items-end justify-content-around p-2"
                                style="height: 150px;">
                                <div class="bg-primary rounded-top" style="width: 15%; height: 40%; opacity: 0.8;">
                                </div>
                                <div class="bg-primary rounded-top" style="width: 15%; height: 70%; opacity: 0.9;">
                                </div>
                                <div class="bg-info rounded-top" style="width: 15%; height: 50%;"></div>
                                <div class="bg-primary rounded-top" style="width: 15%; height: 90%;"></div>
                            </div>
                            <div class="text-center mt-2 small text-muted">Weekly Activity</div>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="card border-0 shadow-sm p-4">
                                    <div class="row g-3 align-items-center">

                                        <div class="col-md-4">
                                            <h5 class="mb-0 fw-bold">Analytics Report</h5>
                                            <p class="text-muted small mb-0">Select a date to view detailed statistics.
                                            </p>
                                        </div>

                                        <div class="col-sm-7 col-md-5">
                                            <div class="input-group">
                                                <span class="input-group-text bg-white border-end-0">
                                                    <i class="bi bi-calendar-event"></i>
                                                </span>
                                                <input type="date" class="form-control border-start-0 ps-0" />
                                            </div>
                                        </div>

                                        <div class="col-sm-5 col-md-3 d-grid">
                                            <button class="btn btn-blue px-4 py-2 fw-semibold">
                                                View Report
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 mb-4">
                            <div class="col-md-6">
                                <div class="card shadow-sm border-0 p-4 border-start border-primary border-5 rounded-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div class="text-muted small fw-bold text-uppercase">Delivery</div>
                                            <h2 class="fw-black mb-0 mt-1">60</h2>
                                        </div>
                                        <div class="bg-primary bg-opacity-10 p-3 rounded">
                                            <i class="bi bi-truck fs-2 text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card shadow-sm border-0 p-4 border-start border-success border-5 rounded-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div class="text-muted small fw-bold text-uppercase">Total Stocks</div>
                                            <h2 class="fw-black mb-0 mt-1">60</h2>
                                        </div>
                                        <div class="bg-success bg-opacity-10 p-3 rounded">
                                            <i class="bi bi-box-seam fs-2 text-success"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card shadow-sm border-0 mb-4 overflow-hidden">
                            <div class="card-header bg-white py-3 border-bottom-0">
                                <h6 class="m-0 fw-bold text-dark"><i class="bi bi-list-ul me-2"></i>Inventory Management
                                </h6>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">
                                    <thead class="table-light border-bottom">
                                        <tr>
                                            <th class="ps-4">Item</th>
                                            <th>Category</th>
                                            <th>Stock</th>
                                            <th class="pe-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="fw-bold ps-4">Office Desk</td>
                                            <td>Furniture</td>
                                            <td>15</td>
                                            <td class="pe-4"><span
                                                    class="badge bg-success-subtle text-success border border-success-subtle">Active</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold ps-4">Laptop Pro</td>
                                            <td>Electronics</td>
                                            <td>05</td>
                                            <td class="pe-4"><span
                                                    class="badge bg-warning-subtle text-warning border border-warning-subtle">Low</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="card shadow-sm border-0 overflow-hidden">
                            <div class="card-header bg-white py-3 border-bottom-0">
                                <h6 class="m-0 fw-bold text-dark"><i class="bi bi-clock-history me-2"></i>Recent
                                    Activity</h6>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">
                                    <thead class="table-light border-bottom">
                                        <tr>
                                            <th class="ps-4">Ref ID</th>
                                            <th>Location</th>
                                            <th class="pe-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-primary fw-semibold ps-4">#99201</td>
                                            <td>Cebu Office</td>
                                            <td class="pe-4"><span
                                                    class="badge rounded-pill bg-primary px-3">Processing</span></td>
                                        </tr>
                                        <tr>
                                            <td class="text-primary fw-semibold ps-4">#99202</td>
                                            <td>Manila Hub</td>
                                            <td class="pe-4"><span
                                                    class="badge rounded-pill bg-secondary px-3">Shipped</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ComponentAuthSidebar from '@/components/auth/sidebar.vue';
import ComponentAuthNavigation from '@/components/auth/navigation.vue';
export default {
    name: 'MyProfile',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
    },
}
</script>

<style scoped src="../../src/assets/styles/components/card.css"></style>
<style scoped src="../../src/assets/styles/components/button.css"></style>