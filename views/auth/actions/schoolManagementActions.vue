<template>
    <form @submit.prevent="saveBARANGAY" v-if="actionType === 'add'">

        <!-- SCHOOL NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="SCHOOLName">SCHOOL NAME</label>
            <input type="text" id="SCHOOLName" class="form-control" placeholder="e.g. Electronics SCHOOL" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="SCHOOLCode">SCHOOL CODE</label>
            <input type="text" id="SCHOOLCode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="contactperson">CONTACT PERSON</label>
            <input type="text" id="contactperson" class="form-control" placeholder="e.g. John Doe" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold" for="SCHOOLContactNo">CONTACT NO.</label>
            <input type="text" id="SCHOOLContactNo" class="form-control" placeholder="e.g. 09123456789" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold" for="email">EMAIL ADDRESS</label>
            <input type="text" id="email" class="form-control" placeholder="e.g. john.doe@school.edu.ph" required>
        </div>



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">SAVE SCHOOL</button>
        </div>

    </form>
    <!--EDIT FORM-->
    <form @submit.prevent="saveSCHOOL" v-if="actionType === 'edit'">

        <!-- SCHOOL NAME -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="school">SCHOOL NAME</label>
            <input type="text" id="school" class="form-control" placeholder="e.g. MO-9923" required>
        </div>

        <!-- Item Description -->
        <div class="mb-3">
            <label class="form-label small fw-bold h-100" for="schoolCode">SCHOOL CODE</label>
            <input type="text" id="schoolCode" class="form-control" placeholder="e.g. DEPT-001" required></input>
        </div>

        <!-- On-Hand Quantity -->
        <div class="mb-3">
            <label class="form-label small fw-bold" for="contactperson">CONTACT PERSON</label>
            <input type="text" id="contactperson" class="form-control" placeholder="e.g. John Doe" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold" for="SCHOOLContactNo">CONTACT NO.</label>
            <input type="text" id="SCHOOLContactNo" class="form-control" placeholder="e.g. 09123456789" required>
        </div>
        <div class="mb-3">
            <label class="form-label small fw-bold" for="email">EMAIL ADDRESS</label>
            <input type="text" id="email" class="form-control" placeholder="e.g. john.doe@school.edu.ph" required>
        </div>


        <!-- OUM -->



        <!-- Modal Footer -->
        <div class="modal-footer border-top-0 px-0 pb-0">
            <button type="submit" class="btn btn-primary px-4">EDIT SCHOOL</button>
        </div>
    </form>
    <!--DELETE FORM-->
    <div v-if="actionType === 'delete'">
        <div class="delete-container">
            <div class="delete-icon">!</div>

            <p class="delete-text">Are you sure you want to delete this School?</p>

            <div class="modal-footer border-top-0 p-0">
                <button type="button" class="btn btn-delete-confirm" @click="deleteSCHOOL">
                    DELETE SCHOOL
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
            schools: [],

        }
    }
}
</script>
<style scoped src="../../../src/assets/styles/actions/StockManagementActions.css"></style>