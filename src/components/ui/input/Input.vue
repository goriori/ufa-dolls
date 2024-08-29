<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

type IProps = {
  type: 'text' | 'number' | 'phone' | 'email' | 'password' | 'search',
  color: 'primary' | 'secondary' | 'thridy'
  state: 'success' | 'error' | 'default'
  text_position?: 'left' | 'center' | 'right'
  modelValue?: string | number
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
}

type IEmits = {
  (eventName: 'update:modelValue', value: string): void,
  (eventName: 'onMount', element: HTMLInputElement): void
  (eventName: 'onChange', value: string | number): void,
  (eventName: 'onInput', value: string | number): void
}
const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()
const inputRef = ref<HTMLInputElement | null>(null)
const modelValue = computed(() => props.modelValue)

const onChange = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value
  emits('update:modelValue', newValue)
  emits('onChange', newValue)

}

const onFocus = () => {
  const startPos = (inputRef.value as HTMLInputElement).selectionStart
  console.log(startPos)
}

const onInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value
  emits('update:modelValue', newValue)
  emits('onInput', newValue)
}
onMounted(() => {
  if (inputRef.value) {
    console.log(inputRef.value)
    emits('onMount', inputRef.value)
  }
})
</script>

<template>
  <input
      ref="inputRef"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['input', text_position, color, state]"
      :value="modelValue"
      @focus="onFocus"
      @change="onChange"
      @input="onInput"
      :required="required"
  >
</template>

<style scoped>
.input {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  border-radius: 20px;
  border: 2px solid transparent;
  font-size: 46px;
  font-weight: 700;
  padding: 50px;
  color: rgba(255, 255, 255, 1);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }


  &:disabled {
    background-color: #fff;
    opacity: 0.5;
  }

  &:focus {
    transition: 0.3s all ease-in-out;
    border-color: var(--primary-border-color);
    outline: none;
  }


  &::placeholder {
    color: rgba(255, 255, 255, 1);
    font-size: 46px;
  }
}

.left {
  text-align: start;
}

.center {
  text-align: center;
}

.right {
  text-align: end;
}


.primary {
  background-color: var(--primary-input-color);
}

.secondary {
  background-color: var(--secondary-input-color);
}

.thridy {
  background-color: var(--thridy-input-color);
}

.success {
  border-color: #26d00b;
}

.error {
  border-color: #ea3c41;
}
</style>