<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/store/auth';

    const auth = useAuthStore();
    const router = useRouter();
    const form = reactive({
        email: '',
        password: '',
    });
    const loading = ref(false);

    const login = async () => {
        loading.value = true;
        try {
            await auth.login(form);
            router.push('/profile');
        } catch (err) {
            console.error("Login failed:", err);
            alert(err?.message || 'Login failed');
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
        <form
            @submit.prevent="login"
            class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-gray-200"
        >
            <h2 class="text-3xl font-bold text-center text-blue-700 tracking-wide">
                Welcome Back
            </h2>
            <p class="text-center text-gray-500">Please log in to continue</p>

            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                    class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                />
            </div>

            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                    class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                />
            </div>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300 font-semibold text-lg shadow-md"
            >
                {{ loading ? 'Loading...' : 'Login' }}
            </button>

            <p class="text-center text-sm text-gray-500">
                Don't have an account?
                <a href="/register" class="text-blue-600 hover:underline font-medium">Sign up</a>
            </p>
        </form>
    </div>
</template>