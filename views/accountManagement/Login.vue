<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 py-3">
        <div class="container-fluid">
            <!-- Logo and Brand -->
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="../../src/assets/images/miso-logo.jpg" alt="Logo" width="60" height="60"
                    class="d-inline-block align-text-top rounded me-2 shadow-sm">
                <span class="fw-bold h5 mb-0 text-dark">MISO Inventory System</span>
            </a>

            <!-- Optional Links -->

        </div>
    </nav>


    <!-- Login Card -->
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="card p-4 shadow" style="max-width: 400px; width: 100%;">

            <!-- Logo -->
            <div class="text-center mb-3">
                <img src="../../src/assets/images/miso-logo.jpg" alt="Logo" class="img-fluid rounded-circle"
                    style="width:80px; height:80px;">
            </div>

            <!-- Welcome Text -->
            <div class="text-center mb-3">
                <h4 class="fw-bold">Welcome Back!</h4>
                <small class="text-muted">Sign in to access your dashboard</small>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin">
                <!-- Username -->
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username"
                        placeholder="Enter username" required />

                </div>

                <!-- Password -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                        v-model="password" placeholder="Enter password" required />
                </div>

                <!-- Show password toggle -->
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="showPassword" v-model="showPassword" />
                    <label class="form-check-label" for="showPassword">
                        Show password
                    </label>
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary w-100">
                    Sign In
                </button>
            </form>

            <!-- Footer -->
            <div class="text-center mt-3">
                <small class="text-muted">Forgot your password? Contact admin.</small>
            </div>

            <!-- Extra Info / Branding -->
            <div class="text-center mt-2">
                <small class="text-secondary">MISO Inventory System © 2026</small>
            </div>
        </div>
        <ErrorToast ref="errorToast" :message="error" />
    </div>
</template>
<script>
import axios from "axios";
import ErrorToast from "@/components/toast/ToastError.vue";

export default {
    name: "LoginPage",
    components: {
        ErrorToast
    },
    data() {
        return {
            username: "",
            password: "",
            error: "",
            message: "",
            showPassword: false,
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post(
                    "https://localhost:7050/api/user/auth",
                    {
                        Username: this.username,
                        Password: this.password
                    }
                );
                localStorage.setItem("token", response.data.data.token);
                alert('token: ' + response.data.token);
                this.$router.push("/dashboard");

            } catch (error) {
                if (error.response) {
                    this.error =
                        error.response.data.error ||
                        error.response.data.message ||
                        "Invalid username or password";
                } else {
                    this.error = "Server not reachable.";
                }

                this.$refs.errorToast.show();
            }

        }
    },
    mounted() {
        document.title = "Login | MISO INVENTORY SYSTEM";
    }
};
</script>

<style scoped src="../../src/assets/styles/login.css"></style>
