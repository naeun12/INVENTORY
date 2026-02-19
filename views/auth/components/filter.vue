<template>
    <div class="dropdown">
        <button class="btn btn-white border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted" type="button"
            data-bs-toggle="dropdown">
            <i class="bi bi-funnel me-1"></i> {{ displayName }}
        </button>

        <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
            <li>
                <h6 class="dropdown-header small text-uppercase fw-bold text-muted">
                    Availability Status
                </h6>
            </li>

            <li v-for="option in options" :key="option.value">
                <a class="dropdown-item small d-flex align-items-center" href="#" :class="option.class"
                    @click.prevent="selectFilter(option.value, option.label)">
                    <span :class="['p-1', 'rounded-circle', 'me-2', option.circleClass]"></span>
                    {{ option.label }}
                </a>
            </li>

            <li>
                <hr class="dropdown-divider">
            </li>

            <li>
                <a class="dropdown-item small text-center text-muted" href="#"
                    @click.prevent="selectFilter('', 'Filter')">
                    Clear Selection
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        options: {
            type: Array,
            default: () => [
                { value: 'inStock', label: 'In Stock', class: '', circleClass: 'bg-success' },
                { value: 'outOfStock', label: 'Out of Stock', class: 'text-danger', circleClass: 'bg-danger' }
            ]
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            displayName: 'Filter'
        }
    },
    methods: {
        selectFilter(value, label) {
            this.$emit('update:modelValue', value)
            this.displayName = label
        }
    }
}
</script>