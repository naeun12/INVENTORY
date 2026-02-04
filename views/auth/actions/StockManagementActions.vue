<template>
    <form @submit.prevent="saveStock" v-if="actionType === 'add'">

        <!-- Item Code -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="itemCode">Item Code</label>
            <input type="text" id="itemCode" class="form-control" placeholder="e.g. MO-9923" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="itemDescription">Item Description</label>
            <textarea type="text" id="itemDescription" class="form-control" placeholder="e.g. High-End Wireless Mouse"
                required></textarea>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="onHand">On-Hand</label>
            <input type="number" id="onHand" class="form-control" min="0" required>
        </div>

        <!-- OUM -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="oum">OUM</label>
            <input type="text" id="oum" class="form-control" placeholder="e.g. units, pcs" required>
        </div>

        <!-- Serial No. -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="serialNo">Serial No.</label>
            <input type="text" id="serialNo" class="form-control" placeholder="Optional">
        </div>

        <!-- Location -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="location">Location</label>
            <input type="text" id="location" class="form-control" placeholder="e.g. Warehouse A" required>
        </div>

        <!-- Remarks -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="remarks">Remarks</label>
            <input type="text" id="remarks" class="form-control" placeholder="Optional">
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">Save Item</button>
        </div>

    </form>
    <!--EDIT FORM-->
    <form @submit.prevent="saveStock" v-if="actionType === 'edit'">

        <!-- Item Code -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="itemCode">Item Code</label>
            <input type="text" id="itemCode" class="form-control" placeholder="e.g. MO-9923" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="itemDescription">Item Description</label>
            <textarea type="text" id="itemDescription" class="form-control" placeholder="e.g. High-End Wireless Mouse"
                required></textarea>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="onHand">On-Hand</label>
            <input type="number" id="onHand" class="form-control" min="0" required>
        </div>

        <!-- OUM -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="oum">OUM</label>
            <input type="text" id="oum" class="form-control" placeholder="e.g. units, pcs" required>
        </div>

        <!-- Serial No. -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="serialNo">Serial No.</label>
            <input type="text" id="serialNo" class="form-control" placeholder="Optional">
        </div>

        <!-- Location -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="location">Location</label>
            <input type="text" id="location" class="form-control" placeholder="e.g. Warehouse A" required>
        </div>

        <!-- Remarks -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="remarks">Remarks</label>
            <input type="text" id="remarks" class="form-control" placeholder="Optional">
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">Save Item</button>
        </div>
    </form>
    <!--DELETE FORM-->
    <div v-if="actionType === 'delete'">
        <div class="delete-container">
            <div class="delete-icon">!</div>

            <p class="delete-text">Are you sure you want to delete this stock item?</p>

            <div class="modal-footer border-top-0 p-0">
                <button type="button" class="btn btn-delete-confirm" @click="deleteStock">
                    Delete Item
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'StockManagementActions',

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
            stockItems: [],

        }
    }
}
</script>
<style scoped src="../../../src/assets/styles/actions/StockManagementActions.css"></style>