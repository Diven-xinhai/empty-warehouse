<script setup lang="tsx">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import CryptoJS from 'crypto-js'

definePageMeta({
  layout: 'empty',
})

const loginType = ref('1')
const loginTypeList = [
  {
    label: '企业用户登陆',
    value: '1',
  },
  {
    label: '政务用户登陆',
    value: '2',
  },
]
interface RuleForm {
  username: string
  password: string
  code: string
  codeKey: string
  grant_type: string
}

const formSize = ref<ComponentSize>('default')
const captcha = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  code: '',
  codeKey: '',
  grant_type: 'captcha',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入账号/手机号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      const params = {
        username: ruleForm.username,
        password: CryptoJS.MD5(ruleForm.password).toString(),
        grant_type: ruleForm.grant_type,
      }
      request('/hulk-auth/oauth/token', {
        method: 'POST',
        params,
        headers: {
          'Captcha-Key': ruleForm.codeKey,
          'Captcha-Code': ruleForm.code,
          'Authorization': `Basic ${CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse('falcon:falcon_secret'),
          )}`,
        },
      })
        .then((res) => {
          setLocalStore({ name: 'token', content: res.access_token })
          setLocalStore({ name: 'userInfo', content: res })
          setLocalStore({ name: 'tenantId', content: res.tenant_id })
          const router = useRouter()
          router.replace(`/`)
        })
        .catch(() => {})
    }
  })
}

function getCaptcha() {
  request('/hulk-auth/oauth/captcha', {
  })
    .then((res) => {
      captcha.value = res.image
      ruleForm.codeKey = res.key
    })
    .catch(() => {})
}

getCaptcha()
</script>

<template>
  <div class="login-wrap flex lg:items-center justify-center bg-#fff">
    <div class="w-900px lg:flex flex-wrap">
      <NuxtImg class="lg:block hidden lg:w-1/2 w-100%" src="images/pc/login/left.png" />
      <NuxtImg class="lg:hidden block lg:w-1/2 w-100%" src="images/mb/login/left.png" />
      <div class="lg:w-1/2 lg:m-0 lg:relative lg:top-0 lg:left-0 lg:rounded-0 bg-#fff w-100%  p-40px box-border absolute top-280px left-0 rounded-15px">
        <div class="flex justify-between mt-10px">
          <div
            v-for="(item, index) in loginTypeList"
            :key="index"
            class="w-50% text-center cursor-pointer login-type-item"
            :class="loginType === item.value ? 'color-#1A69DE' : ''"
            @click="loginType = item.value"
          >
            {{ item.label }}
          </div>
        </div>

        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          class="login-form mt-40px"
          :size="formSize"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入账号/手机号">
              <template #prepend>
                <el-icon :size="18">
                  <img class="w-18px" src="@/assets/icons/img/user.png">
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              clearable
              placeholder="请输入密码"
            >
              <template #prepend>
                <el-icon :size="18">
                  <img class="w-18px" src="@/assets/icons/img/password.png">
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="ruleForm.code"
              clearable
              placeholder="请输入验证码"
              @keyup.enter="submitForm(ruleFormRef)"
            >
              <template #prepend>
                <el-icon :size="18">
                  <img class="w-18px" src="@/assets/icons/img/code.png">
                </el-icon>
              </template>
              <template #append>
                <div @click="getCaptcha">
                  <img class="w-80px cursor-pointer" :src="`${captcha}`">
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="w-100%"
              type="primary"
              size="large"
              @click="submitForm(ruleFormRef)"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
        <div class="flex justify-between mt-40px text-14px">
          <div class="w-50%">
            <span>还没有账号？</span><NuxtLink style="color: #1A69DE ;" class="font-normal hover:text-#4080f9" to="/manage/register">
              立即注册
            </NuxtLink>
          </div>
          <div class="cursor-pointer">
            <NuxtLink style="color: #1A69DE ;" class="font-normal hover:text-#4080f9" to="/manage/retrievePassword">
              找回密码
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-20px text-14px text-#999 p-20px">
      主办单位：济南市工业和信息化局 济南市新一代信息技术产业协会
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-wrap {
  width: 100vw;
  height: 100vh;
  

  .login-type-item:not(:last-child) {
    border-right: 1px solid #e6e6e6;
  }
}

@media (min-width: 1024px) {
  .login-wrap {
    background-image: url('/public/images/pc/login/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
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
  .el-form-item__error {
    padding-left: 60px;
  }
}
</style>
