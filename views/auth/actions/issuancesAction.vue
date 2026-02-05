<template>
    <div class="mb-5 modal-body p-4 pt-0">
        <form>
            <div class="mb-5 row g-3 mb-4 p-3 rounded-4 bg-light-subtle border border-dashed">
                <div class="col-md-6">
                    <label class="form-label text-muted small fw-bold mb-1">
                        <i class="bi bi-hash me-1"></i> ISSUANCE ID
                    </label>
                    <input type="text" class="form-control custom-input bg-white shadow-none" value="ISS-001" readonly>
                </div>
                <div class="col-md-6">
                    <label class="form-label text-muted small fw-bold mb-1">ISSUANCE NO.</label>
                    <input type="text" class="form-control custom-input shadow-sm" placeholder="e.g. 2024-105">
                </div>
            </div>

            <h6 class="fw-bold mb-3 text-dark small"><i class="bi bi-box-seam me-2"></i>Item Information</h6>
            <div class="row g-3 mb-4">
                <div class="col-md-8">
                    <label class="form-label text-muted small fw-bold">ITEM NAME</label>
                    <div class="input-group">

                        <input type="text" class="form-control custom-input border-start-0"
                            placeholder="Search item...">
                    </div>
                </div>
                <div class="col-md-2">
                    <label class="form-label text-muted small fw-bold">QTY</label>
                    <input type="number" class="form-control custom-input text-center" value="1">
                </div>
                <div class="col-md-2">
                    <label class="form-label text-muted small fw-bold">UNIT</label>
                    <select class="form-select custom-input px-2">
                        <option>pcs</option>
                        <option>sets</option>
                        <option>kg</option>
                    </select>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <label class="form-label text-muted small fw-bold"><i class="bi bi-person me-1"></i> ISSUED
                        TO</label>
                    <input type="text" class="form-control custom-input" placeholder="Name of employee">
                </div>
                <div class="col-md-6">
                    <label class="form-label text-muted small fw-bold"><i class="bi bi-geo-alt me-1"></i>
                        LOCATION</label>
                    <select class="form-select custom-input">
                        <option selected disabled>Select Site</option>
                        <option>Site A</option>
                        <option>Warehouse 1</option>
                    </select>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-4">
                    <label class="form-label text-muted small fw-bold text-blue">ISSUED DATE</label>
                    <input type="date" class="form-control custom-input border-blue-subtle">
                </div>
                <div class="col-md-4">
                    <label class="form-label text-muted small fw-bold">EXPECTED RETURN</label>
                    <input type="date" class="form-control custom-input">
                </div>
                <div class="col-md-4">
                    <label class="form-label text-muted small fw-bold">STATUS</label>
                    <select class="form-select custom-input-status">
                        <option class="text-warning fw-bold">● Pending</option>
                        <option class="text-success fw-bold">● Returned</option>
                        <option class="text-danger fw-bold">● Overdue</option>
                    </select>
                </div>
            </div>

            <div class="mb-2">
                <label class="form-label text-muted small fw-bold">PURPOSE / REMARKS</label>
                <textarea class="form-control custom-input" rows="3"
                    placeholder="Describe the reason for issuance..."></textarea>
            </div>
        </form>
    </div>

    <div class="modal-footer border-0 p-4 bg-light-subtle rounded-bottom-4">
        <button type="button" class="btn btn-link text-muted fw-bold text-decoration-none me-auto"
            data-bs-dismiss="modal">Discard</button>
        <button type="button" class="btn btn-blue text-white rounded-pill px-4 fw-bold shadow">
            Confirm Issuance <i class="bi bi-arrow-right ms-1"></i>
        </button>
    </div>


    <!--DELETE FORM-->
    <div v-if="actionType === 'delete'">
        <div class="delete-container">
            <div class="delete-icon">!</div>

            <p class="delete-text">Are you sure you want to delete this department?</p>

            <div class="modal-footer border-top-0 p-0">
                <button type="button" class="btn btn-delete-confirm" @click="deleteDepartment">
                    Delete Department
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'issuancesAction',

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
<style scoped src="../../../src/assets/styles/issuances.css"></style>
<style scoped src="../../../src/assets/styles/components/button.css"></style>
<style scoped src="../../../src/assets/styles/components/pagination.css"></style>
