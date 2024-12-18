<script setup lang="ts">
import type { FormInstance, FormRules, UploadFile, UploadProps, UploadUserFile } from 'element-plus'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'
import { reactive, ref } from 'vue'

export interface InfoFormData {
  enterpriseType: string
  enterpriseName: string
  creditCode: string
  organImg: string
  legalPersonName: string
  legalPersonNum: string
  cityCode: string
  districtCode: string
  enterpriseAddress: string
  agreement: boolean
}

interface CityItem {
  code: string
  dictKey: string
  dictValue: string
  id: string
  parentId: string
}
interface RegionListItem {
  cityCode: string
  cityName: string
  code: string
  districtCode: string
  districtName: string
  name: string
  parentCode: string
  id: string
}

const emit = defineEmits<{
  nextStep: [InfoFormData]
}>()
const uploadUrl = `${
  import.meta.env.VITE_GLOB_API_URL
}/hulk-resource/oss/endpoint/no-auth/put-file`
const ruleFormRef = ref<FormInstance>()
const form = reactive<InfoFormData>({
  enterpriseType: '',
  enterpriseName: '',
  creditCode: '',
  organImg: '',
  legalPersonName: '',
  legalPersonNum: '',
  cityCode: '',
  districtCode: '',
  enterpriseAddress: '',
  agreement: false,
})

const rules = reactive<FormRules>({
  enterpriseType: [{ required: true, message: '请选择单位企业类型', trigger: 'change' }],
  enterpriseName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  creditCode: [
    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }
        const type = form.enterpriseType
        const code = value.substring(0, 2)

        const typeCodeMap: Record<string, string> = {
          1: '91', // 企业
          2: '92', // 个体工商户
          3: '51', // 社会组织
          4: '11', // 机关单位
          5: '12', // 事业单位
        }

        if (type && type !== '0' && code !== typeCodeMap[type]) {
          callback(new Error(`统一社会信用代码需以 ${typeCodeMap[type]} 开头`))
        }
        else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  organImg: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
  legalPersonName: [{ required: true, message: '请输入法定代表人姓名', trigger: 'blur' }],
  legalPersonNum: [{ required: true, message: '请输入法定代表人身份证号', trigger: 'blur' }],
  cityCode: [{ required: true, message: '请选择所在地区', trigger: 'change' }],
  districtCode: [{ required: true, message: '请选择区县', trigger: 'change' }],
  enterpriseAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
  agreement: [{ required: true, message: '请阅读并同意用户注册协议', trigger: 'change' }],
})

// 0:其他 1:企业 2:个体工商户 3:社会组织 4: 机关单位 5:事业单位
const enterpriseTypes = [
  { label: '企业法人', value: '1' },
  { label: '个体工商户', value: '2' },
  { label: '社会组织', value: '3' },
  { label: '事业单位', value: '5' },
  { label: '机关单位', value: '4' },
  { label: '其他', value: '0' },
]

const cityList = ref<CityItem[]>([])
const regionList = ref<RegionListItem[]>([])

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      if (!form.agreement) {
        ElMessage.warning('请阅读并同意用户注册协议')
        return
      }
      emit('nextStep', form)
    }
  })
}

const handleBannerSuccess: UploadProps['onSuccess'] = (response) => {
  form.organImg = response.data.link
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg'
    && rawFile.type !== 'image/jpg'
    && rawFile.type !== 'image/png'
  ) {
    ElMessage.error('上传头像图片只能是 JPG/JPEG/PNG 格式!\'')
    return false
  }
  else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('上传头像图片大小不能超过 5MB!')
    return false
  }
  return true
}

function changeCity(value: any) {
  form.districtCode = ''
  request('/hulk-system/region/select/region', {
    method: 'get',
    params: {
      code: value,
    },
    headers: {
      Authorization: `Basic ${CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse('falcon:falcon_secret'),
      )}`,
    },
  }).then((res) => {
    regionList.value = res.data
  })
}

function initData() {
  request('/hulk-system/dict/dictionary/city', {
    method: 'get',
    headers: {
      Authorization: `Basic ${CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse('falcon:falcon_secret'),
      )}`,
    },
  }).then((res) => {
    cityList.value = res.data
  })
}

onMounted(() => {
  initData()
})
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="170px"
    class="lg:w-500px w-350px"
  >
    <el-form-item label="单位企业类型：" prop="enterpriseType" required>
      <el-select v-model="form.enterpriseType" placeholder="请选择单位企业类型" class="w-full">
        <el-option
          v-for="item in enterpriseTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="position-absolute right--28px top-5px">
        <el-tooltip
          class="box-item"
          raw-content
          content="<div>请根据提示选择相应的类型：</div><div>企业：以91开头</div><div>个体工商户：以92开头</div><div>社会组织：以51开头</div><div>机关单位：以11开头</div><div>事业单位：以12开头</div>"
          placement="top-start"
        >
          <el-icon :size="22" color="#3F80E4">
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </div>
    </el-form-item>

    <el-form-item label="企业名称：" prop="enterpriseName" required>
      <el-input v-model="form.enterpriseName" placeholder="请输入企业名称" />
    </el-form-item>

    <el-form-item label="统一社会信用代码：" prop="creditCode" required>
      <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码" />
    </el-form-item>

    <el-form-item label="营业执照：" prop="organImg" required>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleBannerSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.organImg" :src="form.organImg" class="avatar">
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item label="法定代表人姓名：" prop="legalPersonName" required>
      <el-input v-model="form.legalPersonName" placeholder="请输入法定代表人姓名" />
    </el-form-item>

    <el-form-item label="法定代表人身份证号：" prop="legalPersonNum" required>
      <el-input v-model="form.legalPersonNum" placeholder="请输入法定代表人身份证号" />
    </el-form-item>

    <el-form-item label="所在地区：" required>
      <div class="flex w-100% gap-4">
        <el-form-item prop="cityCode" class="mb-0 flex-1">
          <el-select
            v-model="form.cityCode"
            placeholder="请选择地市"
            class="w-full"
            @change="changeCity"
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="districtCode" class="mb-0 flex-1">
          <el-select v-model="form.districtCode" placeholder="区县" class="w-full">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.districtName"
              :value="item.districtCode"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form-item>

    <el-form-item label="详细地址：" prop="enterpriseAddress" required>
      <el-input
        v-model="form.enterpriseAddress"
        type="textarea"
        placeholder="请输入详细地址"
        :rows="3"
      />
    </el-form-item>

    <!-- <el-form-item prop="agreement"> -->
    <el-checkbox v-model="form.agreement">
      我已阅读并同意
      <NuxtLink style="color: #1A69DE;" class="font-normal hover:text-#4080f9 break-word" to="">
        《济南市都市圈产业协作创新发展公共服务平台用户注册协议》
      </NuxtLink>
    </el-checkbox>
    <!-- </el-form-item> -->

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        信息认证
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.register-form-wrap {
  width: 100%;
}

.register-form {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.el-form-item__label) {
  font-weight: normal;
}

.break-word {
  display: inline-block;
  word-wrap: break-word;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
