<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { SmsType } from '~/enums/common'

export interface FormData {
  adminAccount: string
  password: string
  phone: string
  smsCode: string
}

withDefaults(defineProps<{
  isSubmitLoading: boolean
}>(), {
  isSubmitLoading: false
})

const emit = defineEmits<{
  nextStep: [FormData]
}>()
const formRef = ref<FormInstance>()
const countdown = ref(60)
const isCountingDown = ref(false)
const countDownText = ref('发送验证码')
const isLoading = ref(false)

const formData = reactive<FormData>({
  adminAccount: '',
  password: '',
  phone: '',
  smsCode: '',
})

const rules = reactive<FormRules>({
  adminAccount: [
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
  smsCode: [
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

async function sendSmsCode() {
  if (isLoading.value)
    return

  try {
    isLoading.value = true
    await formRef.value?.validateField('phone')
    await request('/enterprise/sendSms', {
      method: 'POST',
      body: {
        phone: formData.phone,
        type: SmsType.REGISTER,
      },
    })
    ElMessage.success('验证码已发送')
    startCountDown()
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (error) {
    // 手机号验证失败
  }
  finally {
    isLoading.value = false
  }
}

async function handleSubmit() {
  if (!formRef.value)
    return

  await formRef.value.validate()
  // 表单验证通过，在这里添加提交逻辑
  emit('nextStep', formData)
}

const windowWidth = ref(window.innerWidth)

function handleResize() {
  windowWidth.value = window.innerWidth
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <el-form
    ref="formRef"
    :label-position="windowWidth < 1024 ? 'top' : 'right'"
    :model="formData"
    :rules="rules"
    label-width="110px"
    class="account-form"
  >
    <el-form-item label="账号：" prop="adminAccount">
      <el-input
        v-model="formData.adminAccount"
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

    <el-form-item label="短信验证码：" prop="smsCode">
      <div class="verify-code">
        <el-input
          v-model="formData.smsCode"
          placeholder="请输入验证码"
        />
        <el-button
          type="primary"
          :loading="isLoading"
          :disabled="isCountingDown"
          @click="sendSmsCode"
        >
          {{ countDownText }}
        </el-button>
      </div>
    </el-form-item>

    <el-button
      type="primary"
      class="submit-btn"
      :loading="isSubmitLoading"
      @click="handleSubmit"
    >
      下一步
    </el-button>
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
