<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

export interface FormData {
  password: string
  confirmPassword: string
}

const emit = defineEmits<{
  'next-step': [FormData]
}>()
const formRef = ref<FormInstance>()
const formData = reactive<FormData>({
  password: '',
  confirmPassword: '',
})

function validateConfirmPassword(_rule: any, value: string, callback: any) {
  if (value !== formData.password) {
    callback(new Error('两次输入的密码不一致'))
  }
  else {
    callback()
  }
}

const rules = {
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
}

async function handleSubmit() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    emit('next-step', formData)
  }
  catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    :style="{ width: '380px' }"
    :model="formData"
    :rules="rules"
    label-position="right"
    label-width="80px"
  >
    <el-form-item label="新密码" prop="password" required>
      <el-input
        v-model="formData.password"
        type="password"
        placeholder="请设置新密码"
        show-password
      />
    </el-form-item>

    <el-form-item label="确认密码" prop="confirmPassword" required>
      <el-input
        v-model="formData.confirmPassword"
        type="password"
        placeholder="请重新输入新密码"
        show-password
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="handleSubmit"
      >
        确认
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.submit-btn {
  width: 100%;
  margin-top: 20px;
}

:deep(.el-form-item__label) {
  color: #666;
}

:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
