<template>
    <Transition name="toast-fade">
        <div v-if="visible" class="modern-toast" role="alert" aria-live="assertive">
            <div class="toast-content">
                <div class="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>
                </div>

                <span class="message">{{ message }}</span>

                <button class="close-btn" @click="hide" aria-label="Close">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div v-if="duration > 0" class="progress-bar" :style="{ animationDuration: duration + 'ms' }"></div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: "Something went wrong"
    },
    duration: {
        type: Number,
        default: 4000
    }
});

const visible = ref(false);
let timeout = null;

const show = () => {
    visible.value = true;
    if (props.duration > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(hide, props.duration);
    }
};

const hide = () => {
    visible.value = false;
};

// Expose methods to parent components
defineExpose({ show, hide });

onBeforeUnmount(() => clearTimeout(timeout));
</script>

<style scoped>
.modern-toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    min-width: 300px;
    max-width: 450px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-left: 4px solid #ef4444;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    z-index: 9999;
}

.toast-content {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 0.75rem;
}

.icon-wrapper {
    color: #ef4444;
    display: flex;
    flex-shrink: 0;
}

.message {
    flex-grow: 1;
    color: #1f2937;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
}

.close-btn {
    background: transparent;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
}

.close-btn:hover {
    background: #f3f4f6;
    color: #1f2937;
}

/* Progress Bar Logic */
.progress-bar {
    height: 3px;
    background: #ef4444;
    width: 100%;
    transform-origin: left;
    animation: shrink linear forwards;
}

@keyframes shrink {
    from {
        transform: scaleX(1);
    }

    to {
        transform: scaleX(0);
    }
}

/* Vue Transition Animations */
.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-fade-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
}

.toast-fade-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>