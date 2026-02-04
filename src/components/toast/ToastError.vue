<template>
    <div class="toast show align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3"
        role="alert" aria-live="assertive" aria-atomic="true" v-if="visible">
        <div class="d-flex">
            <div class="toast-body">
                {{ message }}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"
                @click="hide"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorToast",
    props: {
        message: {
            type: String,
            default: "Something went wrong"
        },
        duration: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            visible: false,
            timeout: null
        }
    },
    methods: {
        show() {
            clearTimeout(this.timeout);
            this.visible = true;

            if (this.duration > 0) {
                this.timeout = setTimeout(this.hide, this.duration);
            }
        },
        hide() {
            this.visible = false;
            clearTimeout(this.timeout);
        }
    }
}

</script>
