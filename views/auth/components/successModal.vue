<template>
    <div v-if="showSuccess" class="modal d-block" style="background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(5px);"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
            <div class="modal-content border-0 text-center" style="border-radius: 1.5rem; overflow: hidden;">

                <!-- Header -->
                <div class="modal-header border-0 d-flex flex-column align-items-center p-4 pb-0">
                    <div class="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-3"
                        style="width: 80px; height: 80px;">
                        <span class="display-4 text-success fw-bold">✓</span>
                    </div>
                    <h3 class="modal-title fw-bold text-dark">{{ title }}</h3>
                </div>

                <!-- Body -->
                <div class="modal-body p-4 pt-2">
                    <p class="text-muted mb-0">{{ message }}</p>
                </div>

                <!-- Footer -->
                <div class="modal-footer border-0 p-4 pt-0">
                    <button type="button" class="btn btn-success w-100 py-2 fw-bold shadow-sm"
                        style="border-radius: 0.75rem;" @click="$emit('close')">
                        {{ buttonText }}
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SuccessModal",
    props: {
        showSuccess: Boolean,
        title: String,
        message: String,
        buttonText: String
    }
};
</script>