<template>
    <div class="d-flex align-items-center justify-content-between mt-4 px-4 pb-4">
        <div class="text-secondary small fw-medium">
            Showing
            <span class="text-dark fw-bold">{{ start }}</span>
            to
            <span class="text-dark fw-bold">{{ end }}</span>
            of
            <span class="text-dark fw-bold">{{ totalItems }}</span>
            entries
        </div>

        <nav aria-label="Page navigation">
            <ul class="pagination pagination-custom gap-1 mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="$emit('prev')">
                        <i class="bi bi-chevron-left"></i>
                    </a>
                </li>

                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="$emit('go', page)">
                        {{ page }}
                    </a>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="$emit('next')">
                        <i class="bi bi-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        totalItems: Number,
        pageSize: Number,
        currentPage: Number,
        totalPages: Number
    },
    computed: {
        start() {
            return (this.currentPage - 1) * this.pageSize + 1;
        },
        end() {
            return Math.min(this.currentPage * this.pageSize, this.totalItems);
        }
    }
};
</script>
<style scoped src="../../../src/assets/styles/components/pagination.css"></style>
<style scoped src="../../../src/assets/styles/components/card.css"></style>
<style scoped src="../../../src/assets/styles/components/button.css"></style>
