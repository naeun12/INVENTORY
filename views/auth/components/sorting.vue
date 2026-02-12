<template>
    <div class="col-6 col-md-3 col-lg-2">
        <div class="dropdown">
            <button
                class="btn btn-white w-100 border-0 shadow-sm rounded-pill px-3 fw-semibold text-muted dropdown-toggle"
                type="button" data-bs-toggle="dropdown">
                <i class="bi bi-sort-alpha-down me-1 text-blue"></i> Sort
            </button>

            <ul class="dropdown-menu border-0 shadow mt-2 rounded-3">
                <li>
                    <h6 class="dropdown-header small text-uppercase fw-bold text-muted">
                        Sort Order
                    </h6>
                </li>

                <a class="dropdown-item small d-flex align-items-center" href="#"
                    @click.prevent="selectSort('name', 'asc')">
                    <i class="bi bi-sort-alpha-down me-2 text-primary"></i>
                    Name: Ascending
                </a>

                <a class="dropdown-item small d-flex align-items-center" href="#"
                    @click.prevent="selectSort('name', 'desc')">
                    <i class="bi bi-sort-alpha-up me-2"></i>
                    Name: Descending
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        selectSort(sortBy, sortOrder) {
            this.$emit('sort-changed', { sortBy, sortOrder })
        }
    }
}
</script>