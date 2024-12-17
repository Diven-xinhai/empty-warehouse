<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

export interface FormData {
  username: string
  password: string
  phone: string
  verifyCode: string
}

const emit = defineEmits<{
  'next-step': [FormData]
}>()
const formRef = ref<FormInstance>()
const countdown = ref(60)
const isCountingDown = ref(false)
const countDownText = ref('发送验证码')

const formData = reactive<FormData>({
  username: '',
  password: '',
  phone: '',
  verifyCode: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度应为6位', trigger: 'blur' },
  ],
})

function startCountDown() {
  isCountingDown.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    countDownText.value = `${countdown.value}秒后重试`
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCountingDown.value = false
      countDownText.value = '发送验证码'
    }
  }, 1000)
}

async function sendVerifyCode() {
  try {
    // 在这里添加发送验证码的逻辑
    await formRef.value?.validateField('phone')
    startCountDown()
  }
  catch (error) {
    // 手机号验证失败
  }
}

async function handleSubmit() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    // 表单验证通过，在这里添加提交逻辑
    emit('next-step', formData)
    console.log('Form submitted:', formData)
  }
  catch (error) {
    console.error('Form validation failed')
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="110px"
    class="account-form"
  >
    <el-form-item label="账号：" prop="username">
      <el-input
        v-model="formData.username"
        placeholder="请输入账号"
      />
    </el-form-item>

    <el-form-item label="密码：" prop="password">
      <el-input
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>

    <el-form-item label="手机号：" prop="phone">
      <el-input
        v-model="formData.phone"
        placeholder="请输入手机号"
      />
    </el-form-item>

    <el-form-item label="短信验证码：" prop="verifyCode">
      <div class="verify-code">
        <el-input
          v-model="formData.verifyCode"
          placeholder="请输入验证码"
        />
        <el-button
          type="primary"
          :disabled="isCountingDown"
          @click="sendVerifyCode"
        >
          {{ countDownText }}
        </el-button>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="handleSubmit"
      >
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.account-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.verify-code {
  display: flex;
  gap: 12px;
}

.verify-code :deep(.el-input) {
  flex: 1;
}

.submit-btn {
  width: 100%;
}
</style>
