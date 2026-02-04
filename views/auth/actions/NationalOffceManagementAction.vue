<template>
    <form @submit.prevent="saveOFFICE" v-if="actionType === 'add'">

        <!-- OFFICE NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="OFFICEName">OFFICE NAME</label>
            <input type="text" id="OFFICEName" class="form-control" placeholder="e.g. Electronics OFFICE" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="OFFICECode">OFFICE CODE</label>
            <input type="text" id="OFFICECode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="OFFICEHead">OFFICE HEAD</label>
            <input type="text" id="OFFICEHead" class="form-control" placeholder="e.g. John Doe" required>
        </div>



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">SAVE OFFICE</button>
        </div>

    </form>
    <!--EDIT FORM-->
    <form @submit.prevent="saveOFFICE" v-if="actionType === 'edit'">

        <!-- OFFICE NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="itemCode">OFFICE NAME</label>
            <input type="text" id="itemCode" class="form-control" placeholder="e.g. MO-9923" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="OFFICECode">OFFICE CODE</label>
            <input type="text" id="OFFICECode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="officeHead">OFFICE HEAD</label>
            <input type="text" id="officeHead" class="form-control" placeholder="e.g. John Doe" required>
        </div>

        <!-- OUM -->



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">EDIT OFFICE</button>
        </div>
    </form>
    <!--DELETE FORM-->
    <div v-if="actionType === 'delete'">
        <div class="delete-container">
            <div class="delete-icon">!</div>

            <p class="delete-text">Are you sure you want to delete this office?</p>

            <div class="modal-footer border-top-0 p-0">
                <button type="button" class="btn btn-delete-confirm" @click="deleteOffice">
                    Delete Office
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'NationalOfficeManagementAction',

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
            offices: [],

        }
    }
}
</script>
<style scoped src="../../../src/assets/styles/actions/StockManagementActions.css"></style>