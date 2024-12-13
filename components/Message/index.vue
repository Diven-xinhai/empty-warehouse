<script setup lang="ts">
const messages = ref<{ id: string, type: 'error' | 'warning', content: string }[]>([])

let __id = 0
defineExpose({
  message(content: { type: 'error' | 'warning', content: string }) {
    const id = `${__id++}`
    const length = messages.value.push({
      id,
      ...content
    })

    setTimeout(() => {
      const index = messages.value.findIndex(item => item.id === id)
      messages.value.splice(index, 1)
    }, 3000)
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed z-9999 left-50% -translate-x-50% top-65px flex flex-col flex-gap-10px">
      <div
        v-for="item in messages" :key="item.id"
        class="bg-white shadow-xl px-13px py-8px rounded text-black flex items-center gap-10px"
      >
        <span class="i-tabler:alert-circle-filled" :class="{'error': ' text-red', 'warning': 'text-amber'}[item.type]"></span>
        <span text="14px">{{ item.content }}</span>
      </div>
    </div>
  </Teleport>
</template>