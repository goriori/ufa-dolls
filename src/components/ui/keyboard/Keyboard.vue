<script setup lang="ts">
import {computed, ref} from "vue";
import Backspace from "@/components/ui/svg/Backspace.vue";

type KEmits = {
  (name: 'onPress', key: string): void
  (name: 'onEnter'): void
  (name: 'onBackspace'): void
}

const keysRu = ref([
  ["й", "ц", "у", "к", "е", "н", "г", "ш", 'щ', "з", "х", "ъ", "<="],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", 'д', "ж", "э", "Enter"],
  ["&123", 'shift', "я", "ч", "с", "м", "и", "т", "ь", 'б', "ю", ".", 'ENG'],
  ['space']
])

const keysEn = ref([
  ["q", "w", "e", "r", "t", "y", "u", "i", 'o', "p", "[", "]", "<="],
  ["a", "s", "d", "f", "g", "h", "j", "k", 'l', ";", "'", "Enter"],
  ["&123", 'shift', "z", "x", "c", "v", "b", "n", "m", ',', ".", "/", 'RU'],
  ['space']
])

const keyNums = ref([
  ['1', '2', '3', '!', '@', '#'],
  ['4', '5', '6', '$', '%', '^'],
  ['7', '8', '9', '&', '*', '('],
  ['ABC', '0', '<=', '_', '=', ')']
])

const lang = ref<string>('RU')
const shift = ref<boolean>(false)

const targetKeys = computed(() => {
  if (lang.value === 'RU') return keysRu.value
  else if (lang.value === 'ENG') return keysEn.value
  else if (lang.value === '&123') return keyNums.value
  return keysRu.value
})

const emits = defineEmits<KEmits>()
const changeLanguage = (newLang: string) => lang.value = newLang
const changeShift = () => shift.value = !shift.value
const onEnter = () => emits('onEnter')
const onBackspace = () => emits('onBackspace')
const onKey = (key: string, shift: boolean) => {
  if (shift) emits('onPress', key.toUpperCase())
  else emits('onPress', key.toLowerCase())
}
const onPressKey = (key: string) => {
  switch (key) {
    case 'Enter':
      onEnter()
      break;
    case 'ENG':
      changeLanguage('ENG')
      break;
    case 'RU':
      changeLanguage('RU')
      break;
    case '&123':
      changeLanguage('&123')
      break;
    case 'ABC':
      changeLanguage('RU')
      break;
    case 'shift':
      changeShift()
      break;
    case '<=':
      onBackspace()
      break;
    case 'space':
      onKey(' ', shift.value)
      break;
    default:
      onKey(key, shift.value)
  }
}
</script>

<template>
  <div
      :class="{ 'keyboard-shifted': shift }"
      class="keyboard keyboard__block"
  >
    <div class="keyboard__row" v-for="(row, index) in targetKeys" :key="index">
      <div
          v-for="key in row" :key="key"
          :class="['keyboard__btn',{
             space:key === 'space',
             setting:key === '<=' || key === '&123' || key === 'Enter' || key === 'ENG'
           }]"
          @click="onPressKey(key)"
          v-ripple
      >
        <Backspace v-if="key === '<='"/>
        <p v-if="key !== 'space' && key !== '<='">{{ key }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.keyboard {
  position: absolute;
  z-index: 1000000;
  margin: 0 auto;
  transform: translateX(-50%);

  &-shifted {
    text-transform: uppercase;
  }

  &__block {
    border-radius: 48px;
    padding: 48px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: rgba(209, 209, 209, 1);
  }

  &__row {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  &__btn {
    user-select: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-family: Arial, serif;
    background-color: rgba(255, 255, 255, 1);
    color: #000;
    font-weight: 500;
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 17px;

    @media (max-width: $md4k + px) {
      width: 96px;
      height: 96px;
      font-size: 32px;
    }
    @media (max-width: $md0 + px) {
      width: 52px;
      height: 52px;
      font-size: 16px;
    }

    &.big {
      width: 150px;
    }

    &.space {
      width: 100%;
      max-width: 1024px;
    }

    &.setting {
      width: 184px;
    }
  }
}

.keyboard .active {
  background-color: #ddd;
}

.shift-active {
  fill: #000;
}

.shift {
  margin-right: 5px;
}

</style>