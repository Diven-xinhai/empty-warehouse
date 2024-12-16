/* eslint-disable ts/ban-ts-comment */

export default defineNuxtPlugin(() => {
  // @ts-expect-error
  if (!console.warn.__isOverridden) {
    const originalWarn = console.warn

    console.warn = (...args: any[]) => {
      originalWarn(`[${formatDate(new Date())}]`, ...args)
    }

    // @ts-expect-error
    console.warn.__isOverridden = true
  }

  // @ts-expect-error
  if (!console.error.__isOverridden) {
    const originalWarn = console.error

    console.error = (...args: any[]) => {
      originalWarn(`[${formatDate(new Date())}]`, ...args)
    }

    // @ts-expect-error
    console.error.__isOverridden = true
  }

  function formatDate(date: Date): string {
    const padZero = (num: number) => (num < 10 ? `0${num}` : num)
    const replacements = {
      YYYY: date.getFullYear().toString(),
      MM: padZero(date.getMonth() + 1), // 月份从0开始，所以需要加1
      DD: padZero(date.getDate()),
      HH: padZero(date.getHours()),
      mm: padZero(date.getMinutes()),
      ss: padZero(date.getSeconds()),
    }
    return `${replacements.YYYY}-${replacements.MM}-${replacements.DD} ${replacements.HH}:${replacements.mm}:${replacements.ss}`
  }
})
