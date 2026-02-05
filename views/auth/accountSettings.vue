<template>
    <div class="d-flex" id="account-settings-page">
        <ComponentAuthSidebar />

        <div class="header-content w-100 d-flex flex-column bg-light" style="height: 100vh; overflow-y: auto;">
            <ComponentAuthNavigation pageTitle="Account Settings" />
            <main>
                <div class="container-fluid py-5 ">
                    <div class="row mx-auto">

                        <div class="col-lg-3 mb-4">
                            <div class="card border-0 shadow-sm p-4 text-center rounded-4 h-100">
                                <div class="position-relative d-inline-block mx-auto mb-3">
                                    <img src="https://i.pravatar.cc/150?u=roland"
                                        class="rounded-circle border border-4 border-white shadow-sm" width="120"
                                        height="120" alt="Profile">
                                    <div class="position-absolute bottom-0 end-0 bg-warning rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                        style="width: 32px; height: 32px;">
                                        <i class="bi bi-pencil-fill text-white small"></i>
                                    </div>
                                </div>

                                <h5 class="fw-bold mb-0">Lance Monsantp</h5>
                                <p class="text-muted small mb-4">Administrator</p>

                                <nav class="nav flex-column gap-2 text-start">
                                    <a href="#"
                                        class="nav-link bg-blue-light text-blue rounded-pill px-4 py-2 fw-semibold">
                                        <i class="bi bi-person-fill me-2"></i> Personal Information
                                    </a>

                                    <a href="#" class="nav-link text-muted px-4 py-2">
                                        <i class="bi bi-box-arrow-left me-2"></i> og Out
                                    </a>
                                </nav>
                            </div>
                        </div>

                        <div class="col-lg-9">
                            <div class="card border-0 shadow-sm p-4 p-md-5 rounded-4 h-100">
                                <h4 class="fw-bold mb-4">Personal Information</h4>

                                <div class="row g-4">
                                    <div class="col-12 mb-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="male"
                                                checked>
                                            <label class="form-check-label" for="male">Male</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="female">
                                            <label class="form-check-label" for="female">Female</label>
                                        </div>L
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">First Name</label>
                                        <input type="text" class="form-control custom-input" value="Roland">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Last Name</label>
                                        <input type="text" class="form-control custom-input" value="Donald">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Middle Name</label>
                                        <input type="text" class="form-control custom-input" value="Roland">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Salutation</label>
                                        <select class="form-select custom-input">
                                            <option value="" disabled>Select title</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Atty" selected>Atty</option>
                                            <option value="Engr">Engr</option>
                                            <option value="Dr">Dr</option>
                                        </select>
                                    </div>

                                    <div class="col-12">
                                        <label class="form-label text-muted small fw-semibold">Email</label>
                                        <div class="input-group">
                                            <input type="email" class="form-control custom-input border-end-0"
                                                value="rolandDonald@mail.com">

                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Age</label>
                                        <input type="text" class="form-control custom-input" value="36">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Date of Birth</label>
                                        <input type="date" class="form-control custom-input" value="1 Feb, 1995">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Phone Number</label>
                                        <input type="text" class="form-control custom-input" value="(405) 555-0128">
                                    </div>




                                    <div class="col-12 mt-5">
                                        <div class="row g-3">
                                            <div class="col-sm-6">
                                                <button
                                                    class="btn btn-outline-blue w-100 py-2 fw-bold rounded-pill">Discard
                                                    Changes</button>
                                            </div>
                                            <div class="col-sm-6">
                                                <button
                                                    class="btn btn-blue w-100 py-2 fw-bold rounded-pill text-white shadow-sm">Save
                                                    Changes</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </main>
        </div>
    </div>
</template>
<script>
import ComponentAuthSidebar from '@/components/auth/sidebar.vue';
import ComponentAuthNavigation from '@/components/auth/navigation.vue';
export default {
    name: 'AccountSettings',
    components: {
        ComponentAuthSidebar,
        ComponentAuthNavigation,
    },
}
</script>
<style scoped src="../../src/assets/styles/accountSettings.css"></style>
<style scoped src="../../src/assets/styles/components/card.css"></style>