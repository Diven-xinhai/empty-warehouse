<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { SmsType } from '~/enums/common';

export interface FormData {
  phone: string
  verifyCode: string
}

// 添加 defineEmits
const emit = defineEmits<{
  nextStep: [FormData]
}>()
const formRef = ref<FormInstance>()
const formData = reactive<FormData>({
  phone: '',
  verifyCode: '',
})

const isLoading = ref(false)
// 倒计时相关
const isCountingDown = ref(false)
const countdown = ref(60)
const countDownText = ref('获取验证码')

const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
  ],
}

// 获取验证码

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
        type: SmsType.FORGET_PASSWORD,
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


// 提交表单
async function handleSubmit() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    emit('nextStep', formData)
  }
  catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    class="lg:w-400px w-280px"
    :model="formData"
    :rules="rules"
    label-position="right"
    label-width="70px"
  >
    <el-form-item label="手机号" prop="phone" required>
      <el-input
        v-model="formData.phone"
        placeholder="请输入手机号"
        maxlength="11"
      />
    </el-form-item>

    <el-form-item label="验证码" prop="verifyCode" required>
      <div class="verify-code-container">
        <el-input
          v-model="formData.verifyCode"
          style="width: calc(100% - 80px);"
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
.verify-code-container {
  width: calc(100% - 10px);
  display: flex;
  align-items: center;
  gap: 10px;
}

.submit-btn {
  width: 100%;
  margin-top: 20px;
}

:deep(.el-form-item__label) {
  color: #666;
}

:deep(.el-form-item__label-wrap) {
  margin-left: 0;
}

:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
