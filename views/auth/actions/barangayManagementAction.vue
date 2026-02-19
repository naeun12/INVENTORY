<template>
    <form @submit.prevent="saveBARANGAY" v-if="actionType === 'add'">

        <!-- BARANGAY NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="BARANGAYName">BARANGAY NAME</label>
            <input type="text" id="BARANGAYName" class="form-control" placeholder="e.g. Electronics BARANGAY" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="BARANGAYCode">BARANGAY CODE</label>
            <input type="text" id="BARANGAYCode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="BARANGAYHead">BARANGAY HEAD</label>
            <input type="text" id="BARANGAYHead" class="form-control" placeholder="e.g. John Doe" required>
        </div>



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">SAVE BARANGAY</button>
        </div>

    </form>
    <!--EDIT FORM-->
    <form @submit.prevent="saveBARANGAY" v-if="actionType === 'edit'">

        <!-- BARANGAY NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="barangay">BARANGAY NAME</label>
            <input type="text" id="barangay" class="form-control" placeholder="e.g. MO-9923" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="barangayCode">BARANGAY CODE</label>
            <input type="text" id="barangayCode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="barangayHead">BARANGAY HEAD</label>
            <input type="text" id="barangayHead" class="form-control" placeholder="e.g. John Doe" required>
        </div>

        <!-- OUM -->



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">EDIT BARANGAY</button>
        </div>
    </form>
    <!--DELETE FORM-->
    <div v-if="actionType === 'delete'">
        <div class="delete-container">
            <div class="delete-icon">!</div>

            <p class="delete-text">Are you sure you want to delete this BARANGAY?</p>

            <div class="modal-footer border-top-0 p-0">
                <button type="button" class="btn btn-delete-confirm" @click="deleteBARANGAY">
                    DELETE BARANGAY
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'BARANGAYManagementActions',

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
            barangays: [],

        }
    }
}
</script>
