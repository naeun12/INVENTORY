<template>
    <div class="col-12 col-lg-3">
        <div class="input-group bg-light rounded-pill px-3">
            <span class="input-group-text bg-transparent border-0 text-muted">
                <i class="bi bi-search"></i>
            </span>

            <input type="text" class="form-control bg-transparent border-0 shadow-none ps-0" :placeholder="placeholder"
                style="font-size: 0.9rem;" :value="modelValue" @input="updateSearch">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: "Search....."
        }
    },
    methods: {
        updateSearch(event) {
            this.$emit('update:modelValue', event.target.value)
            this.$emit('search') // trigger parent search
        }
    }
}
</script>