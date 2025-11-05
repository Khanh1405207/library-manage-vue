<template>
  <!-- Dùng Teleport để đưa modal ra ngoài <App> -->
  <Teleport to="body">
    <!-- Modal chỉ hiện khi showModal = true -->
    <div v-if="showModal" class="modal-overlay" @click="close">
      <!-- Form ở giữa -->
      <div class="modal-content" @click.stop>
        <h2 class="modal-title">Đăng nhập</h2>
        
        <form @submit.prevent="login" class="login-form">
          <input 
            v-model="form.username" 
            type="text" 
            placeholder="Tên đăng nhập" 
            required 
            class="input"
          />
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="Mật khẩu" 
            required 
            class="input"
          />
          <button type="submit" class="btn-login">Đăng nhập</button>
        </form>

        <button class="close-btn" @click="close">×</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { authAPI } from '@/api'
import { useRouter } from 'vue-router'

const {appContext}= getCurrentInstance();
const emitter = appContext.app.config.globalProperties.$emitter

const router = useRouter()
const showModal = ref(false)
const form = ref({
  username: '',
  password: ''
})

// Mở/đóng modal
const open = () => { showModal.value = true }
const close = () => { 
  showModal.value = false 
  form.value = { username: '', password: '' }
}

// Gọi API đăng nhập
const login = async () => {
  try {
    const res = await authAPI.login(form.value)
    alert('Đăng nhập thành công!')
    emitter.emit('login-success')
    close()
    router.push('/')
  } catch (err) {
    alert('Sai tài khoản hoặc mật khẩu')
  }
}

// Expose để dùng ở ngoài
defineExpose({ open, close })
</script>

<style scoped>
/* Nền mờ */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

/* Form chính */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease;
}

.modal-title {
  margin: 0 0 1.5rem;
  text-align: center;
  color: #2c3e50;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
}

.btn-login {
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.btn-login:hover {
  background: #0056b3;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #aaa;
  cursor: pointer;
}

.close-btn:hover {
  color: #000;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>