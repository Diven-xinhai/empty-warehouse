<script setup lang="ts">
import type { FormData as CreateAccountFormData } from './components/CreateAccountForm.vue'
import type { InfoFormData } from './components/InfoForm.vue'
import StepIndicator from '@/components/AppSteps/index.vue'
import { ref } from 'vue'
import CreateAccountForm from './components/CreateAccountForm.vue'
import InfoForm from './components/InfoForm.vue'

interface FormDataAll extends InfoFormData, CreateAccountFormData {
}
const currentStep = ref(1)
const formDataAll = ref<FormDataAll>({} as FormDataAll)
const isSubmitLoading = ref(false)

function handleNextStep(formData: InfoFormData | CreateAccountFormData, step: number) {
  // 合并表单数据
  formDataAll.value = {
    ...formDataAll.value,
    ...formData,
  }

  if (step === 2) {
    isSubmitLoading.value = true
    request('/enterprise/register', {
      method: 'POST',
      body: formDataAll.value,
    }).then(() => {
      currentStep.value++
      isSubmitLoading.value = false
    })
  }
  else {
    currentStep.value++
  }
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
          <InfoForm v-if="currentStep === 1" @next-step="handleNextStep($event, 1)" />
          <CreateAccountForm v-else-if="currentStep === 2" :isSubmitLoading="isSubmitLoading" @next-step="handleNextStep($event, 2)" />
          <div v-else class="flex flex-col items-center mt-20px">
            <img class="mb-20px" src="@/assets/images/login/success.png" alt="">
            注册成功
            <div class="color-#999 mt-20px">
              感谢注册，您的账户在管理员审核成功后即可
            </div>
            <div class="mt-20px">
              <el-button
                class="w-200px"
                type="primary"
                style="background: linear-gradient(90deg, #68A9FD 0%, #3A7BE1 100%)"
                @click="$router.push('/manage/login')"
              >
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
