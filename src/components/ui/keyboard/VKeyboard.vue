<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  string: {
    type: String,
    default: '',
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  inputRef: {
    type: Object,
  },
  type: {
    type: String,
    default: null,
  },
})

const isShiftActive = ref(props.type !== 'email')
const isTyped = ref(true)

const lang = ref('ru')
const emits = defineEmits(['update:isOpen', 'update:string', 'handleClick'])

const onInput = (e) => {
  console.log(props.inputRef)
  props.inputRef.input.focus()
  const startPos = props.inputRef.input.selectionStart
  const endPos = props.inputRef.input.selectionEnd
  const text = props.string
  isTyped.value = false

  let newText = ''
  const inputChar = isShiftActive.value ? e.toUpperCase() : e.toLowerCase()
  newText = text.substring(0, startPos) + inputChar + text.substring(endPos)

  emits('update:string', `${newText}`)
  setTimeout(() => {
    props.inputRef.input.setSelectionRange(startPos + 1, startPos + 1)
  }, 0)

  // Деактивация Shift после первой буквы
  if (newText.length === 1 && props.type !== 'email') {
    isShiftActive.value = false
  }
}

const backspace = () => {
  props.inputRef.input.focus()
  const startPos = props.inputRef.input.selectionStart
  const text = props.string

  let newText = ''
  const end = text.substring(startPos)
  newText = text.slice(0, startPos - 1) + end

  emits('update:string', `${newText}`)
  setTimeout(() => {
    props.inputRef.input.setSelectionRange(startPos - 1, startPos - 1)
  }, 0)

  // Активируем Shift, если после backspace строка пуста
  if (newText === '') {
    isShiftActive.value = props.type !== 'email'
  }
}

const enter = () => {
  props.inputRef.input.blur()
  emits('handleClick')
  close()
}

const clearInput = () => {
  emits('update:string', '')
  isShiftActive.value = props.type !== 'email'
}

const shift = () => {
  if (props.string === '' && props.type !== 'email') {
    return (isShiftActive.value = true)
  }
  isShiftActive.value = !isShiftActive.value
  props.inputRef.input.focus()
}

const close = () => {
  emits('update:isOpen', false)
}

watch(
    () => props.string,
    (newString) => {
      if (newString === '' && props.type !== 'email') {
        isShiftActive.value = true
      }
    },
    { immediate: true }
)
</script>

<template>
  <div
      v-if="isOpen"
      :class="{
      'keyboard-shifted': isShiftActive || (isTyped && props.type !== 'email'),
    }"
      class="keyboard"
  >
    <div v-if="type === 'phone'" class="keyboard__block">
      <div class="keyboard__row phone">
        <div @click="onInput('1')" class="keyboard__btn" v-ripple>1</div>
        <div @click="onInput('2')" class="keyboard__btn" v-ripple>2</div>
        <div @click="onInput('3')" class="keyboard__btn" v-ripple>3</div>
        <div @click="onInput('4')" class="keyboard__btn" v-ripple>4</div>
        <div @click="onInput('5')" class="keyboard__btn" v-ripple>5</div>
        <div @click="onInput('6')" class="keyboard__btn" v-ripple>6</div>
        <div @click="onInput('7')" class="keyboard__btn" v-ripple>7</div>
        <div @click="onInput('8')" class="keyboard__btn" v-ripple>8</div>
        <div @click="onInput('9')" class="keyboard__btn" v-ripple>9</div>
        <div @click="onInput('0')" class="keyboard__btn" v-ripple>0</div>
        <div @click="backspace" class="keyboard__btn big backspace" v-ripple>
          <svg
              width="52"
              height="44"
              viewBox="0 0 32 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M20.7173 11.76L20.2526 12.2247C20.0534 12.4239 19.7215 12.4239 19.5223 12.2247L16.8667 9.5691L14.2111 12.2247C14.0119 12.4239 13.68 12.4239 13.4808 12.2247L13.0161 11.76C12.8169 11.5608 12.8169 11.2289 13.0161 11.0297L15.6717 8.37408L13.0161 5.71848C12.8169 5.51931 12.8169 5.18736 13.0161 4.98819L13.4808 4.52346C13.68 4.32429 14.0119 4.32429 14.2111 4.52346L16.8667 7.17906L19.5223 4.52346C19.7215 4.32429 20.0534 4.32429 20.2526 4.52346L20.7173 4.98819C20.9165 5.18736 20.9165 5.51931 20.7173 5.71848L18.0617 8.37408L20.7173 11.0297C20.9165 11.2289 20.9165 11.5608 20.7173 11.76Z"
                fill="#474747"
            />
            <path
                d="M29.3131 0.874084H6.45139C5.87032 0.874084 5.48295 1.13957 5.16013 1.60417L0.963544 8.1086C0.834418 8.30771 0.834418 8.50683 0.963544 8.63957L5.16013 15.144C5.48295 15.5422 5.87032 15.8741 6.45139 15.8741H29.2486C30.1524 15.8741 30.8626 15.144 30.8626 14.2148V2.53338C30.9272 1.60417 30.217 0.874084 29.3131 0.874084Z"
                stroke="#474747"
                stroke-width="1.5"
                stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-else-if="type === 'email'" class="keyboard__block">
      <div class="keyboard__row">
        <div @click="onInput('1')" class="keyboard__btn" v-ripple>1</div>
        <div @click="onInput('2')" class="keyboard__btn" v-ripple>2</div>
        <div @click="onInput('3')" class="keyboard__btn" v-ripple>3</div>
        <div @click="onInput('4')" class="keyboard__btn" v-ripple>4</div>
        <div @click="onInput('5')" class="keyboard__btn" v-ripple>5</div>
        <div @click="onInput('6')" class="keyboard__btn" v-ripple>6</div>
        <div @click="onInput('7')" class="keyboard__btn" v-ripple>7</div>
        <div @click="onInput('8')" class="keyboard__btn" v-ripple>8</div>
        <div @click="onInput('9')" class="keyboard__btn" v-ripple>9</div>
        <div @click="onInput('0')" class="keyboard__btn" v-ripple>0</div>
        <div @click="onInput('-')" class="keyboard__btn" v-ripple>-</div>
        <div @click="onInput('_')" class="keyboard__btn" v-ripple>_</div>

        <div @click="backspace" class="keyboard__btn big backspace" v-ripple>
          <svg
              width="52"
              height="37"
              viewBox="0 0 32 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M20.7173 11.76L20.2526 12.2247C20.0534 12.4239 19.7215 12.4239 19.5223 12.2247L16.8667 9.5691L14.2111 12.2247C14.0119 12.4239 13.68 12.4239 13.4808 12.2247L13.0161 11.76C12.8169 11.5608 12.8169 11.2289 13.0161 11.0297L15.6717 8.37408L13.0161 5.71848C12.8169 5.51931 12.8169 5.18736 13.0161 4.98819L13.4808 4.52346C13.68 4.32429 14.0119 4.32429 14.2111 4.52346L16.8667 7.17906L19.5223 4.52346C19.7215 4.32429 20.0534 4.32429 20.2526 4.52346L20.7173 4.98819C20.9165 5.18736 20.9165 5.51931 20.7173 5.71848L18.0617 8.37408L20.7173 11.0297C20.9165 11.2289 20.9165 11.5608 20.7173 11.76Z"
                fill="#474747"
            />
            <path
                d="M29.3131 0.874084H6.45139C5.87032 0.874084 5.48295 1.13957 5.16013 1.60417L0.963544 8.1086C0.834418 8.30771 0.834418 8.50683 0.963544 8.63957L5.16013 15.144C5.48295 15.5422 5.87032 15.8741 6.45139 15.8741H29.2486C30.1524 15.8741 30.8626 15.144 30.8626 14.2148V2.53338C30.9272 1.60417 30.217 0.874084 29.3131 0.874084Z"
                stroke="#474747"
                stroke-width="1.5"
                stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="keyboard__row">
        <div @click="onInput('q')" class="keyboard__btn" v-ripple>q</div>
        <div @click="onInput('w')" class="keyboard__btn" v-ripple>w</div>
        <div @click="onInput('e')" class="keyboard__btn" v-ripple>e</div>
        <div @click="onInput('r')" class="keyboard__btn" v-ripple>r</div>
        <div @click="onInput('t')" class="keyboard__btn" v-ripple>t</div>
        <div @click="onInput('y')" class="keyboard__btn" v-ripple>y</div>
        <div @click="onInput('u')" class="keyboard__btn" v-ripple>u</div>
        <div @click="onInput('i')" class="keyboard__btn" v-ripple>i</div>
        <div @click="onInput('o')" class="keyboard__btn" v-ripple>o</div>
        <div @click="onInput('p')" class="keyboard__btn" v-ripple>p</div>
        <div @click="onInput('@')" class="keyboard__btn" v-ripple>@</div>
      </div>
      <div class="keyboard__row">
        <div @click="onInput('a')" class="keyboard__btn" v-ripple>a</div>
        <div @click="onInput('s')" class="keyboard__btn" v-ripple>s</div>
        <div @click="onInput('d')" class="keyboard__btn" v-ripple>d</div>
        <div @click="onInput('f')" class="keyboard__btn" v-ripple>f</div>
        <div @click="onInput('g')" class="keyboard__btn" v-ripple>g</div>
        <div @click="onInput('h')" class="keyboard__btn" v-ripple>h</div>
        <div @click="onInput('j')" class="keyboard__btn" v-ripple>j</div>
        <div @click="onInput('k')" class="keyboard__btn" v-ripple>k</div>
        <div @click="onInput('l')" class="keyboard__btn" v-ripple>l</div>
        <div @click="enter" class="keyboard__btn big" v-ripple>Enter</div>
      </div>
      <div class="keyboard__row">
        <div
            @click="shift"
            :class="['keyboard__btn', 'big', { active: isShiftActive }]"
            v-ripple
        >
          <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="shiftIconTitle"
              stroke="#000000"
              stroke-width="1"
              stroke-linecap="square"
              stroke-linejoin="miter"
              :class="['shift', { 'shift-active': isShiftActive }]"
              fill="none"
              color="#000000"
          >
            <title id="shiftIconTitle">Shift</title>
            <path
                d="M5,21 L19,21 L5,21 Z M16,12 L16,17 L8,17 L8,12 L3,12 L12,3 L21,12 L16,12 Z"
            />
          </svg>
          Shift
        </div>
        <div @click="onInput('z')" class="keyboard__btn" v-ripple>z</div>
        <div @click="onInput('x')" class="keyboard__btn" v-ripple>x</div>
        <div @click="onInput('c')" class="keyboard__btn" v-ripple>c</div>
        <div @click="onInput('v')" class="keyboard__btn" v-ripple>v</div>
        <div @click="onInput('b')" class="keyboard__btn" v-ripple>b</div>
        <div @click="onInput('n')" class="keyboard__btn" v-ripple>n</div>
        <div @click="onInput('m')" class="keyboard__btn" v-ripple>m</div>
        <div @click="onInput('.')" class="keyboard__btn" v-ripple>.</div>
        <div @click="onInput(',')" class="keyboard__btn" v-ripple>,</div>
      </div>
    </div>
    <div v-else class="div">
      <div v-if="lang === 'ru'" class="keyboard__block">
        <div class="keyboard__row">
          <div @click="onInput('й')" class="keyboard__btn" v-ripple>й</div>
          <div @click="onInput('ц')" class="keyboard__btn" v-ripple>ц</div>
          <div @click="onInput('у')" class="keyboard__btn" v-ripple>у</div>
          <div @click="onInput('к')" class="keyboard__btn" v-ripple>к</div>
          <div @click="onInput('е')" class="keyboard__btn" v-ripple>е</div>
          <div @click="onInput('н')" class="keyboard__btn" v-ripple>н</div>
          <div @click="onInput('г')" class="keyboard__btn" v-ripple>г</div>
          <div @click="onInput('ш')" class="keyboard__btn" v-ripple>ш</div>
          <div @click="onInput('щ')" class="keyboard__btn" v-ripple>щ</div>
          <div @click="onInput('з')" class="keyboard__btn" v-ripple>з</div>
          <div @click="onInput('х')" class="keyboard__btn" v-ripple>х</div>
          <div @click="onInput('ъ')" class="keyboard__btn" v-ripple>ъ</div>
          <div @click="backspace" class="keyboard__btn big backspace" v-ripple>
            <svg
                width="52"
                height="44"
                viewBox="0 0 32 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M20.7173 11.76L20.2526 12.2247C20.0534 12.4239 19.7215 12.4239 19.5223 12.2247L16.8667 9.5691L14.2111 12.2247C14.0119 12.4239 13.68 12.4239 13.4808 12.2247L13.0161 11.76C12.8169 11.5608 12.8169 11.2289 13.0161 11.0297L15.6717 8.37408L13.0161 5.71848C12.8169 5.51931 12.8169 5.18736 13.0161 4.98819L13.4808 4.52346C13.68 4.32429 14.0119 4.32429 14.2111 4.52346L16.8667 7.17906L19.5223 4.52346C19.7215 4.32429 20.0534 4.32429 20.2526 4.52346L20.7173 4.98819C20.9165 5.18736 20.9165 5.51931 20.7173 5.71848L18.0617 8.37408L20.7173 11.0297C20.9165 11.2289 20.9165 11.5608 20.7173 11.76Z"
                  fill="#474747"
              />
              <path
                  d="M29.3131 0.874084H6.45139C5.87032 0.874084 5.48295 1.13957 5.16013 1.60417L0.963544 8.1086C0.834418 8.30771 0.834418 8.50683 0.963544 8.63957L5.16013 15.144C5.48295 15.5422 5.87032 15.8741 6.45139 15.8741H29.2486C30.1524 15.8741 30.8626 15.144 30.8626 14.2148V2.53338C30.9272 1.60417 30.217 0.874084 29.3131 0.874084Z"
                  stroke="#474747"
                  stroke-width="1.5"
                  stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="keyboard__row">
          <div @click="onInput('ф')" class="keyboard__btn" v-ripple>ф</div>
          <div @click="onInput('ы')" class="keyboard__btn" v-ripple>ы</div>
          <div @click="onInput('в')" class="keyboard__btn" v-ripple>в</div>
          <div @click="onInput('а')" class="keyboard__btn" v-ripple>а</div>
          <div @click="onInput('п')" class="keyboard__btn" v-ripple>п</div>
          <div @click="onInput('р')" class="keyboard__btn" v-ripple>р</div>
          <div @click="onInput('о')" class="keyboard__btn" v-ripple>о</div>
          <div @click="onInput('л')" class="keyboard__btn" v-ripple>л</div>
          <div @click="onInput('д')" class="keyboard__btn" v-ripple>д</div>
          <div @click="onInput('ж')" class="keyboard__btn" v-ripple>ж</div>
          <div @click="onInput('э')" class="keyboard__btn" v-ripple>э</div>
          <div @click="enter" class="keyboard__btn big" v-ripple>Enter</div>
        </div>
        <div class="keyboard__row">
          <div
              @click="shift"
              :class="['keyboard__btn', 'big', { active: isShiftActive }]"
              v-ripple
          >
            <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="shiftIconTitle"
                stroke="#000000"
                stroke-width="1"
                stroke-linecap="square"
                stroke-linejoin="miter"
                :class="['shift', { 'shift-active': isShiftActive }]"
                fill="none"
                color="#000000"
            >
              <title id="shiftIconTitle">Shift</title>
              <path
                  d="M5,21 L19,21 L5,21 Z M16,12 L16,17 L8,17 L8,12 L3,12 L12,3 L21,12 L16,12 Z"
              />
            </svg>
            Shift
          </div>

          <div @click="onInput('я')" class="keyboard__btn" v-ripple>я</div>
          <div @click="onInput('ч')" class="keyboard__btn" v-ripple>ч</div>
          <div @click="onInput('с')" class="keyboard__btn" v-ripple>с</div>
          <div @click="onInput('м')" class="keyboard__btn" v-ripple>м</div>
          <div @click="onInput('и')" class="keyboard__btn" v-ripple>и</div>
          <div @click="onInput('т')" class="keyboard__btn" v-ripple>т</div>
          <div @click="onInput('ь')" class="keyboard__btn" v-ripple>ь</div>
          <div @click="onInput('б')" class="keyboard__btn" v-ripple>б</div>
          <div @click="onInput('ю')" class="keyboard__btn" v-ripple>ю</div>
          <div @click="lang = 'num'" class="keyboard__btn" v-ripple>&123</div>
          <div @click="lang = 'en'" class="keyboard__btn" v-ripple>ENG</div>
        </div>
        <div class="keyboard__row">
          <div @click="onInput(' ')" class="keyboard__btn space" v-ripple></div>
        </div>
      </div>
      <div v-if="lang === 'en'" class="keyboard__block">
        <div class="keyboard__row">
          <div @click="onInput('q')" class="keyboard__btn" v-ripple>q</div>
          <div @click="onInput('w')" class="keyboard__btn" v-ripple>w</div>
          <div @click="onInput('e')" class="keyboard__btn" v-ripple>e</div>
          <div @click="onInput('r')" class="keyboard__btn" v-ripple>r</div>
          <div @click="onInput('t')" class="keyboard__btn" v-ripple>t</div>
          <div @click="onInput('y')" class="keyboard__btn" v-ripple>y</div>
          <div @click="onInput('u')" class="keyboard__btn" v-ripple>u</div>
          <div @click="onInput('i')" class="keyboard__btn" v-ripple>i</div>
          <div @click="onInput('o')" class="keyboard__btn" v-ripple>o</div>
          <div @click="onInput('p')" class="keyboard__btn" v-ripple>p</div>
          <div @click="backspace" class="keyboard__btn big backspace" v-ripple>
            <svg
                width="52"
                height="44"
                viewBox="0 0 32 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M20.7173 11.76L20.2526 12.2247C20.0534 12.4239 19.7215 12.4239 19.5223 12.2247L16.8667 9.5691L14.2111 12.2247C14.0119 12.4239 13.68 12.4239 13.4808 12.2247L13.0161 11.76C12.8169 11.5608 12.8169 11.2289 13.0161 11.0297L15.6717 8.37408L13.0161 5.71848C12.8169 5.51931 12.8169 5.18736 13.0161 4.98819L13.4808 4.52346C13.68 4.32429 14.0119 4.32429 14.2111 4.52346L16.8667 7.17906L19.5223 4.52346C19.7215 4.32429 20.0534 4.32429 20.2526 4.52346L20.7173 4.98819C20.9165 5.18736 20.9165 5.51931 20.7173 5.71848L18.0617 8.37408L20.7173 11.0297C20.9165 11.2289 20.9165 11.5608 20.7173 11.76Z"
                  fill="#474747"
              />
              <path
                  d="M29.3131 0.874084H6.45139C5.87032 0.874084 5.48295 1.13957 5.16013 1.60417L0.963544 8.1086C0.834418 8.30771 0.834418 8.50683 0.963544 8.63957L5.16013 15.144C5.48295 15.5422 5.87032 15.8741 6.45139 15.8741H29.2486C30.1524 15.8741 30.8626 15.144 30.8626 14.2148V2.53338C30.9272 1.60417 30.217 0.874084 29.3131 0.874084Z"
                  stroke="#474747"
                  stroke-width="1.5"
                  stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="keyboard__row">
          <div @click="onInput('a')" class="keyboard__btn" v-ripple>a</div>
          <div @click="onInput('s')" class="keyboard__btn" v-ripple>s</div>
          <div @click="onInput('d')" class="keyboard__btn" v-ripple>d</div>
          <div @click="onInput('f')" class="keyboard__btn" v-ripple>f</div>
          <div @click="onInput('g')" class="keyboard__btn" v-ripple>g</div>
          <div @click="onInput('h')" class="keyboard__btn" v-ripple>h</div>
          <div @click="onInput('j')" class="keyboard__btn" v-ripple>j</div>
          <div @click="onInput('k')" class="keyboard__btn" v-ripple>k</div>
          <div @click="onInput('l')" class="keyboard__btn" v-ripple>l</div>
          <div @click="enter" class="keyboard__btn big" v-ripple>Enter</div>
        </div>
        <div class="keyboard__row">
          <div
              @click="shift"
              :class="['keyboard__btn', 'big', { active: isShiftActive }]"
              v-ripple
          >
            <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="shiftIconTitle"
                stroke="#000000"
                stroke-width="1"
                stroke-linecap="square"
                stroke-linejoin="miter"
                :class="['shift', { 'shift-active': isShiftActive }]"
                fill="none"
                color="#000000"
            >
              <title id="shiftIconTitle">Shift</title>
              <path
                  d="M5,21 L19,21 L5,21 Z M16,12 L16,17 L8,17 L8,12 L3,12 L12,3 L21,12 L16,12 Z"
              />
            </svg>
            Shift
          </div>

          <div @click="onInput('z')" class="keyboard__btn" v-ripple>z</div>
          <div @click="onInput('x')" class="keyboard__btn" v-ripple>x</div>
          <div @click="onInput('c')" class="keyboard__btn" v-ripple>c</div>
          <div @click="onInput('v')" class="keyboard__btn" v-ripple>v</div>
          <div @click="onInput('b')" class="keyboard__btn" v-ripple>b</div>
          <div @click="onInput('n')" class="keyboard__btn" v-ripple>n</div>
          <div @click="onInput('m')" class="keyboard__btn" v-ripple>m</div>
          <div @click="lang = 'num'" class="keyboard__btn" v-ripple>&123</div>
          <div @click="lang = 'ru'" class="keyboard__btn" v-ripple>RU</div>
        </div>
        <div class="keyboard__row">
          <div @click="onInput(' ')" class="keyboard__btn space" v-ripple></div>
        </div>
      </div>
      <div v-if="lang === 'num'" class="keyboard__block">
        <div class="keyboard__row">
          <div @click="onInput('1')" class="keyboard__btn" v-ripple>1</div>
          <div @click="onInput('2')" class="keyboard__btn" v-ripple>2</div>
          <div @click="onInput('3')" class="keyboard__btn" v-ripple>3</div>
          <div @click="onInput('4')" class="keyboard__btn" v-ripple>4</div>
          <div @click="onInput('5')" class="keyboard__btn" v-ripple>5</div>
          <div @click="onInput('6')" class="keyboard__btn" v-ripple>6</div>
          <div @click="onInput('7')" class="keyboard__btn" v-ripple>7</div>
          <div @click="onInput('8')" class="keyboard__btn" v-ripple>8</div>
          <div @click="onInput('9')" class="keyboard__btn" v-ripple>9</div>
          <div @click="onInput('0')" class="keyboard__btn" v-ripple>0</div>
          <div @click="onInput('.')" class="keyboard__btn" v-ripple>.</div>
          <div @click="onInput(',')" class="keyboard__btn" v-ripple>,</div>
          <div @click="onInput(':')" class="keyboard__btn" v-ripple>:</div>
          <div @click="onInput('!')" class="keyboard__btn" v-ripple>!</div>
          <div @click="onInput('?')" class="keyboard__btn" v-ripple>?</div>
        </div>
        <div class="keyboard__row">
          <div @click="lang = 'ru'" class="keyboard__btn" v-ripple>АБВ</div>
          <div @click="onInput(' ')" class="keyboard__btn space" v-ripple></div>
          <div @click="backspace" class="keyboard__btn big backspace" v-ripple>
            <svg
                width="52"
                height="44"
                viewBox="0 0 32 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M20.7173 11.76L20.2526 12.2247C20.0534 12.4239 19.7215 12.4239 19.5223 12.2247L16.8667 9.5691L14.2111 12.2247C14.0119 12.4239 13.68 12.4239 13.4808 12.2247L13.0161 11.76C12.8169 11.5608 12.8169 11.2289 13.0161 11.0297L15.6717 8.37408L13.0161 5.71848C12.8169 5.51931 12.8169 5.18736 13.0161 4.98819L13.4808 4.52346C13.68 4.32429 14.0119 4.32429 14.2111 4.52346L16.8667 7.17906L19.5223 4.52346C19.7215 4.32429 20.0534 4.32429 20.2526 4.52346L20.7173 4.98819C20.9165 5.18736 20.9165 5.51931 20.7173 5.71848L18.0617 8.37408L20.7173 11.0297C20.9165 11.2289 20.9165 11.5608 20.7173 11.76Z"
                  fill="#474747"
              />
              <path
                  d="M29.3131 0.874084H6.45139C5.87032 0.874084 5.48295 1.13957 5.16013 1.60417L0.963544 8.1086C0.834418 8.30771 0.834418 8.50683 0.963544 8.63957L5.16013 15.144C5.48295 15.5422 5.87032 15.8741 6.45139 15.8741H29.2486C30.1524 15.8741 30.8626 15.144 30.8626 14.2148V2.53338C30.9272 1.60417 30.217 0.874084 29.3131 0.874084Z"
                  stroke="#474747"
                  stroke-width="1.5"
                  stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'Vkeyboard';
</style>
