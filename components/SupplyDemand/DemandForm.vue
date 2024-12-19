<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{ initializationData: any }>()

const demandFormRef = useTemplateRef<FormInstance>('demandFormRef')
const demandFormModel = ref<Record<string, any>>({})
const demandFormRules: FormRules = {
  demandName: [{ required: true, message: '请输入需求/项目名称' }],
  industry: [{ required: true, message: '请选择所属行业' }],
  updType: [{ required: true, message: '请选择设备更新和技改类别' }],
  projectContent: [{ required: true, message: '请输入项目建设内容' }],
  updateContent: [{ required: true, message: '请输入设备更新和技术改造需求' }],
  linkman: [{ required: true, message: '请输入可对外公布联系人' }],
  contactNumber: [{ required: true, message: '请输入可对外公布联系电话' }],
  image: [{ required: true, message: '请上传主图' }],
  area: [{ required: true, message: '请选择地区' }],
}

const { lazyLoadCityData, userInfo, supplyDemandCategories, UPLOAD_FILE_URL, TOKEN } = toRefs(props.initializationData)

onMounted(() => {
  nextTick(() => {
    const { user_city, user_district } = userInfo.value
    if (user_city && user_district) {
      demandFormModel.value.area = [user_city, user_district]
    }
  })
})

defineExpose({
  async validate() {
    await demandFormRef.value?.validate()
    return demandFormModel.value
  },
})
</script>

<template>
  <ElForm
    ref="demandFormRef"
    label-width="150px"
    :model="demandFormModel"
    :rules="demandFormRules"
  >
    <div class="mt-28px flex items-center mb-30px">
      <div class="w-4px h-28px bg-#3F80E4 rounded-2px" />
      <div class="text-#030718 text-20px ml-16px">
        需求详情
      </div>
    </div>

    <ElRow>
      <ElCol :span="12">
        <ElFormItem label="项目名称" prop="demandName">
          <ElInput v-model="demandFormModel.demandName" placeholder="请输入需求/项目名称" />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="12">
        <ElFormItem label="所属行业" prop="industry">
          <ElSelect v-model="demandFormModel.industry" placeholder="请选择所属行业">
            <ElOption v-for="item in supplyDemandCategories?.demandHall.industries" :key="item" :value="item">
              {{ item }}
            </ElOption>
          </ElSelect>
        </ElFormItem>
      </ElCol>

      <ElCol :span="12">
        <ElFormItem label="设备更新和技改类别" prop="updType">
          <ElSelect v-model="demandFormModel.updType" placeholder="请选择设备更新和技改类别">
            <ElOption v-for="item in supplyDemandCategories?.demandHall.services" :key="item" :value="item">
              {{ item }}
            </ElOption>
          </ElSelect>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="24">
        <ElFormItem label="项目建设内容" prop="projectContent">
          <ElInput
            v-model="demandFormModel.projectContent"
            type="textarea"
            :rows="5"
            :maxlength="500"
            show-word-limit
            placeholder="请输入项目建设内容，500字以内"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="24">
        <ElFormItem label="设备更新和技术改造需求" prop="updateContent">
          <ElInput
            v-model="demandFormModel.updateContent"
            type="textarea"
            :rows="5"
            :maxlength="200"
            show-word-limit
            placeholder="请描述您的需求，200字以内"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="12">
        <ElFormItem label="可对外公布的联系人" prop="linkman">
          <ElInput v-model="demandFormModel.linkman" placeholder="可对外公布的联系人" />
        </ElFormItem>
      </ElCol>

      <ElCol :span="12">
        <ElFormItem label="可对外公布的联系电话" prop="contactNumber">
          <ElInput v-model="demandFormModel.contactNumber" placeholder="可对外公布的联系电话" />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="24">
        <ElFormItem label="主图" prop="image">
          <ElUpload
            :limit="1"
            :action="UPLOAD_FILE_URL"
            :headers="{
              'Hulk-Auth': TOKEN,
              'Authorization': 'Basic ZmFsY29uOmZhbGNvbl9zZWNyZXQ=',
            }"
            list-type="picture-card"
            :on-success="(res) => demandFormModel.image = res.data.link"
            :on-remove="() => demandFormModel.image = undefined"
          >
            <span class="i-tabler:plus text-30px" />
          </ElUpload>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <div class="mt-28px flex items-center mb-30px">
      <div class="w-4px h-28px bg-#3F80E4 rounded-2px" />
      <div class="text-#030718 text-20px ml-16px">
        服务补充
      </div>
    </div>

    <ElRow>
      <ElCol :span="12">
        <ElFormItem label="企业名称">
          {{ userInfo?.enterprise_name }}
        </ElFormItem>
      </ElCol>

      <ElCol :span="12">
        <ElFormItem label="所在地区" prop="area">
          <ClientOnly>
            <ElCascader
              v-model="demandFormModel.area"
              placeholder="请选择所在地区"
              :props="{
                label: 'dictValue',
                value: 'dictValue',
                lazy: true,
                lazyLoad: lazyLoadCityData,
              }"
              class="w-full"
            />
          </ClientOnly>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="12">
        <ElFormItem label="预计开工时间" prop="expectedStartTime">
          <ElDatePicker
            v-model="demandFormModel.expectedStartTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="预计开工时间"
            class="w-full!"
          />
        </ElFormItem>
      </ElCol>

      <ElCol :span="12">
        <ElFormItem label="预计竣工时间" prop="expectedCompletionTime">
          <ElDatePicker
            v-model="demandFormModel.expectedCompletionTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="预计竣工时间"
            class="w-full!"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="12">
        <ElFormItem label="项目总投资" prop="totalInvestment">
          <div flex="~ items-center" class="w-full">
            <ElInputNumber v-model="demandFormModel.totalInvestment" :min="0" class="flex-1 w-0 mr-5px" />
            <span class="font-bold">万元</span>
          </div>
        </ElFormItem>
      </ElCol>

      <ElCol :span="12">
        <ElFormItem label="明年计划投资" prop="nextYearInvestment">
          <div flex="~ items-center" class="w-full">
            <ElInputNumber v-model="demandFormModel.nextYearInvestment" :min="0" class="flex-1 w-0 mr-5px" />
            <span class="font-bold">万元</span>
          </div>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow>
      <ElCol :span="24">
        <ElFormItem label="融资需求" prop="financingRequirement">
          <ElInput
            v-model="demandFormModel.financingRequirement"
            type="textarea"
            :rows="5"
            :maxlength="200"
            show-word-limit
            placeholder="请描述你的需求，200字以内"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>
