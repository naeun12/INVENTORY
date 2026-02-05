<template>
    <div class="modal-body p-4 pt-0">
        <form class="needs-validation">
            <div
                class="d-flex align-items-center justify-content-between mb-4 p-3 rounded-4 bg-primary-subtle border border-primary border-opacity-25">
                <div>
                    <label class="form-label text-primary-emphasis small fw-bold mb-0 block">
                        <i class="bi bi-fingerprint me-1"></i> ITEM CODE
                    </label>
                    <div class="h5 mb-0 fw-bold text-primary">ISS-001</div>
                </div>
                <div class="text-end">
                    <label class="form-label text-muted small fw-bold mb-1">SERIAL NO.</label>
                    <input type="text"
                        class="form-control form-control-sm custom-input shadow-none border-0 text-end fw-bold"
                        placeholder="e.g. 2024-105" style="background: transparent;">
                </div>
            </div>

            <div class="section-card mb-4 p-3 border rounded-4 bg-white shadow-sm">
                <h6 class="fw-bold mb-3 text-dark d-flex align-items-center">
                    <span
                        class="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style="width:24px; height:24px;">
                        <i class="bi bi-box-seam small"></i>
                    </span>
                    Item Details
                </h6>

                <div class="row g-3">
                    <div class="col-md-7">
                        <label class="form-label text-muted extra-small fw-bold text-uppercase">Item Name</label>
                        <div class="input-group">
                            <span class="input-group-text bg-light border-end-0 text-muted"><i
                                    class="bi bi-search"></i></span>
                            <input type="text" class="form-control border-start-0 ps-0 shadow-none"
                                placeholder="Search inventory...">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label text-muted extra-small fw-bold text-uppercase">Qty</label>
                        <input type="number" class="form-control text-center shadow-none" value="1">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label text-muted extra-small fw-bold text-uppercase">Unit</label>
                        <select class="form-select shadow-none">
                            <option>Pieces (pcs)</option>
                            <option>Sets</option>
                            <option>Kilograms (kg)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <div class="form-floating">
                        <input type="text" class="form-control shadow-none border-0 border-bottom rounded-0 px-0"
                            id="issuedTo" placeholder="Name">
                        <label for="issuedTo" class="ps-0 text-muted small fw-bold"><i class="bi bi-person me-1"></i>
                            ISSUED TO</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <select class="form-select shadow-none border-0 border-bottom rounded-0 px-0" id="location">
                            <option selected disabled>Select Site</option>
                            <option>Site A - Main Campus</option>
                            <option>Warehouse 1 - North</option>
                        </select>
                        <label for="location" class="ps-0 text-muted small fw-bold"><i class="bi bi-geo-alt me-1"></i>
                            LOCATION</label>
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4 p-3 rounded-4 border bg-light-subtle">
                <div class="col-md-4">
                    <label class="form-label text-muted extra-small fw-bold text-uppercase">Issued Date</label>
                    <input type="date" class="form-control form-control-sm border-0 shadow-none bg-transparent">
                </div>
                <div class="col-md-4">
                    <label class="form-label text-muted extra-small fw-bold text-uppercase text-info">Return
                        Date</label>
                    <input type="date" class="form-control form-control-sm border-0 shadow-none bg-transparent">
                </div>

            </div>

            <div class="mb-2">
                <label class="form-label text-muted small fw-bold"><i class="bi bi-chat-left-text me-1"></i> PURPOSE /
                    REMARKS</label>
                <textarea class="form-control shadow-none border-light-subtle" rows="3"
                    placeholder="Describe the reason for issuance..."
                    style="resize: none; border-radius: 12px;"></textarea>
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-primary rounded-3 py-2 fw-bold shadow-sm w-25">
                    <i class="bi bi-truck me-2"></i>Dispatch
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.extra-small {
    font-size: 0.7rem;
}

.form-control:focus,
.form-select:focus {
    border-color: #0d6efd;
    background-color: #fff;
}

.section-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.section-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

/* Custom styling for the floating inputs to look like a modern dashboard */
.form-floating>.form-control:focus~label,
.form-floating>.form-control:not(:placeholder-shown)~label {
    transform: scale(0.85) translateY(-0.5rem) translateX(0rem);
    color: #0d6efd !important;
}
</style>
<script>
import axios from 'axios';
export default {
    name: 'deliveryAction',

    props: {
        actionType: {
            type: String,
            required: true
        },
        actionTypeTitle: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            departments: [],

        }
    }
}
</script>
<style scoped src="../../../src/assets/styles/components/button.css"></style>
<style scoped src="../../../src/assets/styles/components/pagination.css"></style>
