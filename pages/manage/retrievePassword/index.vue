<script setup lang="ts">
import StepIndicator from '@/components/AppSteps/index.vue'
import { ref } from 'vue'
import ResetPasswordForm from './components/ResetPasswordForm.vue'
import VerifyForm from './components/VerifyForm.vue'

const currentStep = ref(1)

function handleNextStep() {
  currentStep.value++
}
</script>

<template>
  <div class="login-wrap flex items-center justify-center">
    <div class="lg:w-900px lg:p-60px flex flex-col items-center bg-white box-border">
      <div class="lg:w-90% bg-#fff w-95% box-border">
        <div class="text-24px">
          找回密码
        </div>
        <div class="lg:p-20px w-100% mt-30px border-1px border-solid border-#e6e6e6 box-border flex flex-col items-center">
          <StepIndicator
            :steps="['手机号验证', '设置密码', '修改成功']"
            :current-step="currentStep"
          />
          <VerifyForm
            v-if="currentStep === 1"
            class="mt-20px"
            @next-step="handleNextStep"
          />
          <ResetPasswordForm
            v-else-if="currentStep === 2"
            class="mt-20px"
            @next-step="handleNextStep"
          />
          <div v-else class="flex flex-col items-center mt-20px">
            <img class="mb-20px" src="@/assets/images/login/success.png" alt="">
            密码修改成功
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-wrap {
  width: 100vw;
  padding-top: 70px;
  background-color: #F5F8F9;

  .login-type-item:not(:last-child) {
    border-right: 1px solid #e6e6e6;
  }
}
</style>

<style lang="scss">
.login-form {
  .el-input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
    --el-input-border: none;
    --el-input-hover-border-color: #fff;
    --el-input-focus-border-color: #fff;
    --el-input-hover-border: #1a69de;
    --el-input-focus-border: #1a69de;
    --el-input-border-radius: 0;
    --el-input-border-color: #fff;
  }
  .el-input-group__prepend {
    background-color: #fff;
  }
  .el-input-group__append {
    padding: 0;
  }
}
</style>
