<template>
    <form @submit.prevent="saveStock" v-if="actionType === 'add'">

        <!-- Item Code -->
        <div class="mb-4">
            <label class="form-label small fw-bold text-secondary mb-2" for="itemImage">
                Item Image
            </label>
            <div class="upload-container d-flex flex-column align-items-center justify-content-center border-dashed rounded-3 p-4"
                :class="{ 'border-primary bg-ligth': isAddDragging }" @dragover.prevent="isAddDragging = true"
                @dragleave.prevent="isAddDragging = false" @drop.prevent="handleAddFileDrop"
                @click="$refs.fileAddInput.click()">

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
            <label class="form-label small fw-bold" for="itemCode">Item Code</label>
            <input type="text" id="itemCode" class="form-control" placeholder="e.g. MO-9923" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold" for="itemName">Item Name</label>
            <input type="text" id="itemName" class="form-control" placeholder="e.g. Wireless Mouse" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="category">Category</label>
            <input type="text" id="category" class="form-control" placeholder="e.g. Electronics, Tools" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="itemDetails">Item Details</label>
            <textarea type="text" id="itemDetails" class="form-control" placeholder="e.g. High-End Wireless Mouse"
                required></textarea>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="onHand">QUANTITY</label>
            <input type="number" id="onHand" class="form-control" min="0" required>
        </div>

        <!-- OUM -->


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
            <label class="form-label small fw-bold" for="auditDate">Audit Date</label>
            <input type="date" id="auditDate" class="form-control" placeholder="Optional">
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">Save Item</button>
        </div>

    </form>
    <!--EDIT FORM-->
    <form @submit.prevent="saveStock" v-if="actionType === 'edit'">

        <!-- Item Code -->
        <div class="mb-4">
            <label class="form-label small fw-bold text-secondary mb-2" for="itemImage">
                Item Image
            </label>
            <div class="upload-container d-flex flex-column align-items-center justify-content-center border-dashed rounded-3 p-4"
                :class="{ 'border-primary bg-ligth': isAddDragging }" @dragover.prevent="isAddDragging = true"
                @dragleave.prevent="isAddDragging = false" @drop.prevent="handleAddFileDrop"
                @click="$refs.fileAddInput.click()">

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
            <label class="form-label small fw-bold" for="itemCode">Item Code</label>
            <input type="text" id="itemCode" class="form-control" placeholder="e.g. MO-9923" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold" for="itemName">Item Name</label>
            <input type="text" id="itemName" class="form-control" placeholder="e.g. Wireless Mouse" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="category">Category</label>
            <input type="text" id="category" class="form-control" placeholder="e.g. Electronics, Tools" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="itemDetails">Item Details</label>
            <textarea type="text" id="itemDetails" class="form-control" placeholder="e.g. High-End Wireless Mouse"
                required></textarea>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="onHand">QUANTITY</label>
            <input type="number" id="onHand" class="form-control" min="0" required>
        </div>

        <!-- OUM -->


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
            <label class="form-label small fw-bold" for="auditDate">Audit Date</label>
            <input type="date" id="auditDate" class="form-control" placeholder="Optional">
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
import { ref } from 'vue';
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
            isAddDragging: false,
            previewAddUrl: null,
            fileAddInput: null,
        }

    },
    methods:
    {
        handleAddFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                this.previewAddUrl = URL.createObjectURL(file);
            }
        },
        handleAddFileDrop(event) {
            this.isAddDragging = false;
            const file = event.dataTransfer.files[0];
            if (file) {
                this.previewAddUrl = URL.createObjectURL(file);
                this.$refs.fileAddInput.files = event.dataTransfer.files;
            }
        },
        saveStock() {
            // Implement save logic here
            alert('Stock item saved!');
        },
        deleteStock() {
            // Implement delete logic here
            alert('Stock item deleted!');
        }
    }
}
</script>
<style scoped src="../../../src/assets/styles/actions/StockManagementActions.css"></style>
<style scoped>
.border-dashed {
    border: 2px dashed #dee2e6;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.border-dashed:hover {
    border-color: #0d6efd;
    background-color: #f8f9fa;
}

.img-preview {
    max-height: 150px;
    width: auto;
    object-fit: contain;
}

.x-small {
    font-size: 0.75rem;
}
</style>