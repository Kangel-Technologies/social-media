<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import api from '@/services/api';

const auth = useAuthStore();
const form = reactive({
    name: '',
    bio: '',
    avatar: null,
});
const loading = ref(false);

const onFileChange = (e) => {
    form.avatar = e.target.files[0];
};

onMounted(() => {
    if (auth.user) {
        form.name = auth.user.name;
        form.bio = auth.user.bio;
    }
});

const updateProfile = async () => {
    loading.value = true;
    try {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('bio', form.bio);
        if (form.avatar) fd.append('avatar', form.avatar);

        await api.post('/profile/update', fd, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        await auth.getUser();
        alert('Profile updated!');
    } catch (err) {
        console.error("Update failed:", err);
        alert(err?.message || 'Profile update failed.');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="bg-gradient-to-r from-blue-50 via-white to-blue-50 min-h-screen py-12 px-6">
        <div class="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-lg border border-gray-200">
            <h2 class="text-3xl font-bold text-blue-700 mb-8">Edit Profile</h2>

            <form @submit.prevent="updateProfile" enctype="multipart/form-data" class="space-y-8">
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        v-model="form.name"
                        placeholder="Enter your name"
                        class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                </div>

                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea 
                        v-model="form.bio"
                        placeholder="Write something about yourself..."
                        rows="4"
                        class="w-full px-5 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    ></textarea>
                </div>

                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input 
                        type="file" 
                        @change="onFileChange"
                        class="block w-full text-sm text-gray-600 
                               file:mr-4 file:py-3 file:px-5 
                               file:border file:border-gray-300 
                               file:rounded-lg file:bg-gray-100 
                               file:text-sm file:font-semibold 
                               hover:file:bg-gray-200"
                    />
                </div>

                <button
                    :disabled="loading"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300 font-semibold text-lg shadow-md"
                >
                    {{ loading ? 'Updating...' : 'Update Profile' }}
                </button>
            </form>
        </div>
    </div>
</template>
