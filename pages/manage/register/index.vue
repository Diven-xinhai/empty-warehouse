<script setup lang="ts">
import type { RegisterForm } from './components/InfoForm.vue'
import StepIndicator from '@/components/AppSteps/index.vue'
import { reactive, ref } from 'vue'
import CreateAccountForm from './components/CreateAccountForm.vue'
import InfoForm from './components/InfoForm.vue'

const currentStep = ref(1)

function handleNextStep(formData: RegisterForm) {
  // 处理下一步逻辑
  console.log(formData)
  currentStep.value++
}
</script>

<template>
  <div class="register-wrap flex items-center justify-center">
    <div class="lg:w-900px lg:p-60px flex flex-col items-center bg-white box-border">
      <div class="lg:w-90% bg-#fff w-95% box-border">
        <div class="text-24px">
          用户注册
        </div>
        <div class="lg:p-20px w-100% mt-30px border-1px border-solid border-#e6e6e6 box-border flex flex-col items-center">
          <StepIndicator
            :steps="['信息认证', '创建用户', '注册成功']"
            :current-step="currentStep"
          />
          <InfoForm v-if="currentStep === 1" @next-step="handleNextStep" />
          <CreateAccountForm v-else-if="currentStep === 2" @next-step="handleNextStep" />
          <div v-else class="flex flex-col items-center mt-20px">
            <img class="mb-20px" src="@/assets/images/login/success.png" alt="">
            注册成功
            <div class="color-#999 mt-20px">
              感谢注册，您的账户在管理员审核成功后即可
            </div>
            <div class="mt-20px">
              <el-button class="w-200px" type="primary" style="background: linear-gradient(90deg, #68A9FD 0%, #3A7BE1 100%)">
                确定
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-wrap {
  width: 100vw;
  padding-top: 70px;
  background-color: #F5F8F9;
}
</style>
