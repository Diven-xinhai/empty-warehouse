export default defineEventHandler(() => {
  const cities = [
    '全部城市',
    '济南',
    '淄博',
    '泰安',
    '德州',
    '聊城',
    '滨州',
  ]

  const industries = [
    '石化化工',
    '钢铁行业',
    '有色金属',
    '建材',
    '汽车',
    '工程机械装备',
    '重型机械',
    '基础零部件与基础制造工业',
    '工业机器人',
    '工业母机',
    '船舶',
    '航空',
    '石油石化装备',
    '轨道交通装备',
    '农机装备',
    '医疗配备',
    '电力装备',
    '食品',
    '纺织',
    '轻工',
    '医药',
    '电子组装',
    '电子元器件和电子材料',
    '锂电池',
    '仪器仪表',
    '光伏',
    '民爆',
    '其他',
  ]

  const prices: { min: number, max?: number }[] = [
    {
      min: 0,
      max: 10000,
    },
    {
      min: 10000,
      max: 50000,
    },
    {
      min: 50000,
      max: 100000,
    },
    {
      min: 100000,
    },
  ]

  return {
    serviceHall: {
      cities,
      services: [
        '优秀设备',
        '优秀工业软件',
        '设备供应商',
        '技术改造和数字化转型服务商',
        '金融机构',
        '解决方案',
      ],
      industries,
      prices,
    },
    demandHall: {
      cities,
      services: [
        '先进设备更新',
        '数字化转型',
        '绿色装备推广',
        '本质安全水平提升',
      ],
      industries,
      prices,
    },
  }
})
