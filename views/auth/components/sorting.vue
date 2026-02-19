<template>
    <div class="dropdown">
        <button class="btn btn-white border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted" type="button"
            data-bs-toggle="dropdown">
            <i class="bi bi-sort-down me-1"></i> Sort By
        </button>
        <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
            <li>
                <h6 class="dropdown-header small text-uppercase fw-bold text-muted" style="letter-spacing: 0.5px;">
                    Order By
                </h6>
            </li>
            <li v-for="option in options" :key="option.value">
                <a class="dropdown-item small d-flex align-items-center" href="#" @click.prevent="selectOption(option)">
                    <i :class="option.icon + ' me-2'"></i> {{ option.label }}
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'ComponentSort',
    props: {
        modelValue: { type: String, default: '' }, // selected sort key
        options: {
            type: Array,
            default: () => [
                { value: 'recentlyUpdated', label: 'Recently Updated', icon: 'bi bi-calendar-check' },
                { value: 'nameAsc', label: 'Name: A to Z', icon: 'bi bi-sort-alpha-down' },
                { value: 'nameDesc', label: 'Name: Z to A', icon: 'bi bi-sort-alpha-up' },
            ]
        }
    },

    computed: {
        selectedLabel() {
            const selected = this.options.find(o => o.value === this.modelValue);
            return selected ? selected.label : 'Sort By';
        }
    },
    methods: {
        selectOption(option) {
            this.$emit('update:modelValue', option.value);
        }
    }
}
</script>