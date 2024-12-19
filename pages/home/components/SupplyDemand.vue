<script setup lang="ts">
import AppImgTitle from "@/components/AppImgTitle/index.vue";
import IconTop1 from "@/assets/icons/img/top1.png";
import IconTop2 from "@/assets/icons/img/top2.png";
import IconTop3 from "@/assets/icons/img/top3.png";

const tableData = ref([
  {
    date: '山东青鸟工业互联网有限公司',
    name: '济南市历下区',
    address: '11',
  },
  {
    date: '山东青鸟工业互联网有限公司',
    name: '济南市历下区',
    address: '11',
  },
  {
    date: '山东青鸟工业互联网有限公司',
    name: '济南市历下区',
    address: '11',
  },
  {
    date: '山东青鸟工业互联网有限公司',
    name: '济南市历下区',
    address: '11',
  },
])

const hotList = ref([
  {
    img: '',
    title: '企业数字化诊断',
    desc: '以“提高企业精益、柔性或敏捷制造能力，改善盈利水平”为目标，以“诊断评价”为手段以“提高企业精益、柔性或敏捷制造能力，改善盈利水平”为目标，以“诊断评价”为手段'
  },
  {
    img: '',
    title: '企业数字化诊断',
    desc: '以“提高企业精益、柔性或敏捷制造能力，改善盈利水平”为目标，以“诊断评价”为手段以“提高企业精益、柔性或敏捷制造能力，改善盈利水平”为目标，以“诊断评价”为手段'
  },
  {
    img: '',
    title: '企业数字化诊断',
    desc: '以“提高企业精益、柔性或敏捷制造能力，改善盈利水平”为目标，以“诊断评价”为手段以“提高企业精益、柔性或敏捷制造能力，改善盈利水平”为目标，以“诊断评价”为手段'
  }
])
</script>

<template>
  <div class="supply-demand container mx-auto p-15px lg:p-0 box-border">
      <AppImgTitle 
        pc-img="images/pc/home/gxdj.png" 
        mb-img="images/mb/home/gxdj.png"
      />

      <div class="flex justify-between flex-wrap lg:mt-30px mt-15px">
        <!-- 当前活跃服务商 -->
        <div class="lg:w-[calc(50%-10px)] w-100% bg-#fff p-20px box-border item-box">
          <div class="flex items-center pb-10px" border="none 0 b-1px solid #eee">
            <img class="w-18px mr-10px" src="@/assets/icons/img/sheng.png" alt="">
            <div class="text-18px font-bold">当前活跃服务商</div>
          </div>

          <el-table class="mt-20px" :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="企业名称" align="center" />
            <el-table-column prop="name" label="归属地" width="140" align="center" />
            <el-table-column prop="address" label="发布服务数" width="100" align="center" />
          </el-table>
        </div>

        <!-- 完成注册，获取热门服务 -->
        <div class="lg:w-[calc(50%-10px)] lg:mt-0 mt-15px w-100% bg-#fff p-20px box-border item-box">
          <div class="flex justify-between items-center pb-10px" border="none 0 b-1px solid #eee">
            <div class="flex items-center">
              <img class="w-18px mr-10px" src="@/assets/icons/img/edit.png" alt="">
              <div class="text-18px font-bold">完成注册，获取热门服务</div>
            </div>
            <div class="text-14px color-#999 cursor-pointer">查看更多 ></div>
          </div>

          <div class="px-10px">
            <div class="flex justify-between items-center mt-20px relative cursor-pointer" v-for="(item, index) in hotList" :key="index">
              <img v-if="index === 0" class="w-30px absolute top--8px left--15px" :src="IconTop1" alt="">
              <img v-if="index === 1" class="w-30px absolute top--8px left--15px" :src="IconTop2" alt="">
              <img v-if="index === 2" class="w-30px absolute top--8px left--15px" :src="IconTop3" alt="">
              
              <img class="w-70px mr-10px rounded-10px" src="@/assets/images/consult.png" alt="">
              <div class="w-[calc(100%-85px)]" >
                <div class="text-16px font-bold">{{item.title}}</div>
                <div class="text-14px color-#999 mt-10px line-clamp-2">{{item.desc}}</div>
              </div>
            </div>
            <img class="w-280px mx-auto mt-20px cursor-pointer" src="@/assets/images/btn1.png" alt="">
          </div>
        </div>
      </div>
      
    </div>
</template>

<style lang="scss">
.supply-demand {
  .el-table th.el-table__cell {
    background-color: #F7F9FB;
  }
  .item-box {
    position: relative;
    border-top: 2px solid rgba($color: #3F80E4, $alpha: 0.6);
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0;
      width: 40%;
      height: 3px;
      border-radius: 0 5px 5px 0;
      background-color: rgba($color: #3F80E4, $alpha: 0.6)
    }
  }
}
</style>
