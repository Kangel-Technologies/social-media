<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
const router = useRouter();
const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});
const loading = ref(false);

const register = async () => {
    loading.value = true;
    try {
        await auth.register(form);
        alert('Registration successful! Now login.');
        router.push('/profile');
    } catch (err) {
        console.error("Registration failed:", err);
        alert(err?.message || 'Registration failed. Cannot be login.');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
        <form
            @submit.prevent="register"
            class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-gray-200"
        >
            <h2 class="text-3xl font-bold text-center text-blue-700 tracking-wide">
                Create Your Account
            </h2>
            <p class="text-center text-gray-500">Join us today — it's quick and easy!</p>

            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700" for="name">Name</label>
                <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                />
            </div>

            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                    class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                />
            </div>

            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700" for="password">Password</label>
                <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                    class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                />
            </div>

            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700" for="password_confirmation">Confirm Password</label>
                <input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm your password"
                    class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                />
            </div>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300 font-semibold text-lg shadow-md"
            >
                {{ loading ? 'Now login...' : 'Register' }}
            </button>

            <p class="text-center text-sm text-gray-500">
                Already have an account?
                <a href="/login" class="text-blue-600 hover:underline font-medium">Login</a>
            </p>
        </form>
    </div>
</template>