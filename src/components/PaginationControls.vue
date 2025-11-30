<template>
  <div v-if="totalPages" class="pagination">
    <div class="pagination-controls">
      <template v-for="(page, idx) in pagesToShow" :key="String(page) + '-' + idx">
        <button v-if="page === '...'" class="page-button dots">...</button>
        <button v-else-if="page === '<'" class="page-button arrow" @click="emits('update:start', Math.max(0, props.start - props.num))">&lt;</button>
        <button v-else-if="page === '>'" class="page-button arrow" @click="emits('update:start', props.start + props.num)">&gt;</button>
        <button v-else class="page-button" @click="emits('update:start', (Number(page) - 1) * props.num)">{{ page }}</button>
      </template>
    </div>

    <div class="results-per-page">
      <span>Results per page:</span>
      <select class="results-per-page-select" :value="num" @change="onNumChange">
        <option v-for="numOption in [20,50,100,200,500]" :key="numOption" :value="numOption">
          {{ numOption }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">


import { computed } from 'vue'
import { MAX_PAGE_CTRL } from '../utils/constants'

type Props = {
  start: number
  num: number
  resultCount: number
  known: boolean
  end: boolean
}

type Emits = {
  // biome-ignore lint/style/useUnifiedTypeSignatures: Emits with different names
  (e: 'update:start', value: number): void
  (e: 'update:num', value: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const currentPage = computed(() => Math.floor(props.start / props.num) + 1)
const totalPages = computed(() => {
  if (props.known) {
    return Math.ceil(props.resultCount / props.num)
  }
    return Math.ceil((props.resultCount + (props.end ? 0 : 1)) / props.num)

})


// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: 我没招了
function paginate(total: number, cur: number, inf: boolean): (number | string)[] {
  const X = inf ? MAX_PAGE_CTRL - 1 : MAX_PAGE_CTRL;

  const prev = cur !== 1, next = cur !== total, arrows = (prev?1:0)+(next?1:0);

  // show all if fits
  if (arrows + total <= X) {
    const r: (number | string)[] = [];
    if (prev) {r.push('<')};
    for (let i=1;i<=total;i++) {r.push(i)};
    if (inf) {r.push('...')};
    if (next) {r.push('>')};
    return r;
  }

  const middleTotal = Math.max(0, total - 2);
  let best: {s: number, L?: number, R?: number, leftEll: boolean, rightEll: boolean} | null = null;

  // try largest contiguous middle block s (pages 2..total-1) that includes cur if needed
  for (let s = Math.min(middleTotal, X); s >= 1; s--) {
    const Lmin = 2, Lmax = total - s;
    let a = Lmin, b = Lmax;
    if (cur !== 1 && cur !== total) { a = Math.max(a, cur - s + 1); b = Math.min(b, cur); }
    if (a > b) {continue};
    let L = Math.max(a, Math.min(cur - Math.floor((s-1)/2), b));
    let R = L + s - 1;
    const leftEll = L > 2, rightEll = R < total - 1;
    const ell = (leftEll?1:0)+(rightEll?1:0);
    if (arrows + 2 + s + ell <= X) { best = {s,L,R,leftEll,rightEll}; break; }

    // try sliding L across feasible range in case centering fails
    for (let L2=a; L2<=b; L2++) {
      const R2 = L2 + s - 1;
      const le = L2 > 2, re = R2 < total - 1;
      const tot = arrows + 2 + s + ((le?1:0)+(re?1:0));
      if (tot <= X) { best = {s,L:L2,R:R2,leftEll:le,rightEll:re}; break; }
    }
    if (best) {break};
  }

  // try s=0 (only first+last, maybe one "...")
  if (!best) {
    const ell = total > 2 ? 1 : 0;
    if (arrows + 2 + ell <= X) {best = {s:0, leftEll: total>2, rightEll:false}};
  }

  // build output
  const out: (number | string)[] = [];
  if (prev) {out.push('<')};
  out.push(1);

  if (!best) {
    // fallback minimal: try to include one neighbor of ends if fits
    if (total > 2 && arrows + 3 <= X) {out.push('...')};
  } else if (best.s === 0) {
    if (best.leftEll) {out.push('...')};
  } else {
    if (best.leftEll) {out.push('...')};
    for (let p = best.L ?? 0; p <= (best.R ?? 0); p++) {out.push(p)};
    if (best.rightEll) {out.push('...')};
  }

  if (total > 1) {out.push(total)};
  if (inf) {out.push('...')};
  if (next) {out.push('>')};

  return out;
}


const pagesToShow = computed(() => {
  const pages = paginate(
    totalPages.value,
    currentPage.value,
    !props.known
  )
  return pages
})

function onNumChange(e: Event) {
  const target = e.target as HTMLSelectElement
  const newNum = Number(target.value)
  emits('update:num', newNum)
  emits('update:start', 0)
}

</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 0;
  background: transparent;
  border-radius: 0;
  margin: 20px 0;
  border: none;
  width: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.page-button {
    min-width: 35px;
    width: 35px;
    height: 44px;
    padding: 0;
    background: linear-gradient(135deg, #252a30 0%, #1f242a 100%);
    color: #e0e0e0;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(90, 159, 212, 0.15);
    position: relative;
    overflow: hidden;
}

.page-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(90, 159, 212, 0.2), transparent);
    transition: left 0.5s ease;
}

.page-button:hover::before {
    left: 100%;
}

.page-button:hover {
    background: linear-gradient(135deg, #303540 0%, #2a2f38 100%);
    border-color: rgba(90, 159, 212, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.page-button.current {
    background: linear-gradient(135deg, #5a9fd4 0%, #4a8fc4 100%);
    color: #ffffff;
    border-color: #5a9fd4;
    font-weight: 600;
    box-shadow: 0 4px 16px rgba(90, 159, 212, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.page-button.current:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(90, 159, 212, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.page-button.dots {
    background: transparent;
    border: none;
    cursor: default;
    pointer-events: none;
}

.page-button.arrow {
    font-size: 20px;
}

.results-per-page {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #8899aa;
    font-size: 14px;
}

.results-per-page select {
    padding: 6px 12px;
    background: linear-gradient(135deg, #252a30 0%, #1f242a 100%);
    color: #e0e0e0;
    border: 1px solid rgba(90, 159, 212, 0.15);
    border-radius: 8px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
}

.results-per-page select:hover {
    background: linear-gradient(135deg, #303540 0%, #2a2f38 100%);
    border-color: rgba(90, 159, 212, 0.3);
}

.results-per-page select:focus {
    border-color: #5a9fd4;
    box-shadow: 0 0 0 3px rgba(90, 159, 212, 0.1);
}
.pagination { display:flex; gap:12px; align-items:center; flex-wrap:wrap }
.pagination-controls { display:flex; gap:6px; align-items:center }
.page-button { padding:6px 10px; text-decoration:none; color:var(--text-color,#111); border-radius:4px; border:1px solid transparent }
.page-button:hover { background:rgba(0,0,0,0.04) }
.page-button.current { font-weight:600; border-color:rgba(0,0,0,0.08) }
.page-button.arrow.disabled, .page-button.disabled { opacity:0.3; pointer-events:none }
.page-button.dots { cursor:default }
.results-per-page { display:flex; gap:8px; align-items:center }
.results-per-page-select { padding:4px }
</style>
