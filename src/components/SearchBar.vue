<!-- biome-ignore-all lint/nursery/useVueHyphenatedAttributes: svg viewBox -->
<template>
  <form @submit.prevent="emit('submit')">
    <div class="wrapper">
      <input
          type="text"
          name="q"
          :value="searchValue"
          @input="emit('update:searchValue', ($event.target as HTMLInputElement).value)"
          placeholder="Search patterns..."
          autocomplete="off"
      >
      <button type="button" @click="emit('submit')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">

const props = defineProps({
  searchValue: String
})
const emit = defineEmits<{
  (e: 'update:searchValue', value: string): void
  (e: 'submit'): void
}>()

</script>

<style scoped>
input {
  flex: 1;
  padding: 0 60px 0 24px;
  font-size: 18px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  border: none;
  background: transparent;
  color: #ffffff;
  height: 52px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  outline: none;
  line-height: 52px;
}


form {
    background: transparent;
    padding: 0;
    margin-bottom: 30px;
    border: none;
    width: 100%;
    position: relative;
}

.wrapper {
    display: flex;
    position: relative;
    width: 100%;
    align-items: center;
    background: linear-gradient(135deg, #2a3038 0%, #252a32 100%);
    border-radius: 26px;
    overflow: hidden;
    height: 52px;
    border: 1px solid rgba(90, 159, 212, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.wrapper::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #5a9fd4, #55EEA0);
    border-radius: 26px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.wrapper:focus-within {
    border-color: rgba(90, 159, 212, 0.5);
    box-shadow: 0 4px 24px rgba(90, 159, 212, 0.2),
                0 0 40px rgba(90, 159, 212, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.wrapper:focus-within::before {
    opacity: 0.15;
}

input:focus {
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border: none;
}

input::placeholder {
    color: #8899aa;
}

input::-webkit-search-cancel-button,
input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

input::-ms-clear {
  display: none;
}

button {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, rgba(90, 159, 212, 0.2), rgba(85, 238, 160, 0.2));
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    padding: 0;
}

button:hover {
    background: linear-gradient(135deg, rgba(90, 159, 212, 0.4), rgba(85, 238, 160, 0.3));
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 0 20px rgba(90, 159, 212, 0.4);
}

button:active {
    transform: translateY(-50%) scale(0.98);
}

button svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: #5a9fd4;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 4px rgba(90, 159, 212, 0.5));
}
</style>