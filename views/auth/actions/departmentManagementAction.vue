<template>
    <form @submit.prevent="saveDepartment" v-if="actionType === 'add'">

        <!-- DEPARTMENT NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="departmentName">DEPARTMENT NAME</label>
            <input type="text" id="departmentName" class="form-control" placeholder="e.g. Electronics Department"
                required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="departmentCode">DEPARTMENT CODE</label>
            <input type="text" id="departmentCode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="departmentHead">DEPARTMENT HEAD</label>
            <input type="text" id="departmentHead" class="form-control" placeholder="e.g. John Doe" required>
        </div>



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">SAVE DEPARTMENT</button>
        </div>

    </form>
    <!--EDIT FORM-->
    <form @submit.prevent="saveDepartment" v-if="actionType === 'edit'">

        <!-- DEPARTMENT NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="itemCode">DEPARTMENT NAME</label>
            <input type="text" id="itemCode" class="form-control" placeholder="e.g. MO-9923" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="departmentCode">DEPARTMENT CODE</label>
            <input type="text" id="departmentCode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="departmentHead">DEPARTMENT HEAD</label>
            <input type="text" id="departmentHead" class="form-control" placeholder="e.g. John Doe" required>
        </div>

        <!-- OUM -->



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">EDIT DEPARTMENT</button>
        </div>
    </form>
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
    name: 'DepartmentManagementActions',

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
