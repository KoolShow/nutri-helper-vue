<template>
  <ul v-if="resultItems.length > 0" class="results-list">
    <li v-for="(item, idx) in resultItems" :key="idx" class="result-item">
      <span class="weight-display" :weight="item.weight">
        {{ item.weight?.toFixed(3) ?? '' }}
      </span>
      {{ item.word }}
    </li>
  </ul>
  <div v-if="resultHtml" v-html="resultHtml"/>
  <div v-if="end" class="end-of-results">
    <em>No more results found.</em>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    resultItems: Array<{ weight: number; word: string }>;
    resultHtml: string;
    end: boolean;
  }>();
</script>

<style scoped>
  .results-list {
    list-style: none;
    padding: 0;
  }
  .result-item {
    padding: 0.25rem 0;
  }

  .results-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: linear-gradient(135deg, #212529 0%, #1a1e22 100%);
    border-radius: 12px;
    border: 1px solid rgba(90, 159, 212, 0.15);
    width: 100%;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .result-item {
    padding: 14px 18px;
    border-bottom: 1px solid rgba(90, 159, 212, 0.1);
    display: flex;
    align-items: center;
    gap: 30px;
    font-size: 1.25em;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, sans-serif;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .result-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #5a9fd4, #55eea0);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  .result-item:last-child {
    border-bottom: none;
  }

  .result-item:hover {
    background: linear-gradient(
      90deg,
      rgba(90, 159, 212, 0.08) 0%,
      transparent 100%
    );
    padding-left: 24px;
  }

  .result-item:hover::before {
    transform: scaleY(1);
  }

  /* 词频数字效果 */
  .weight-display {
    font-weight: 700;
    min-width: 65px;
    text-align: left;
    font-size: 1em;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, sans-serif;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
  }

  .result-item:hover .weight-display {
    transform: scale(1.05);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }

  .weight-display {
    display: inline-block;
    width: 5.5rem;
    margin-right: 0.5rem;
  }

  .weight-display {
    --x: attr(weight number, 0);
    color: var(--computed-color, #ffffff);
  }

  .weight-display[weight^="0."],
  .weight-display[weight="0"] {
    --t: calc(var(--x));
    --computed-color: color-mix(
      in srgb,
      var(--weight-0) calc((1 - var(--t)) * 100%),
      var(--weight-1) calc(var(--t) * 100%)
    );
  }

  .weight-display[weight^="1."],
  .weight-display[weight="1"] {
    --t: calc(var(--x) - 1);
    --computed-color: color-mix(
      in srgb,
      var(--weight-1) calc((1 - var(--t)) * 100%),
      var(--weight-2) calc(var(--t) * 100%)
    );
  }

  .weight-display[weight^="2."],
  .weight-display[weight="2"] {
    --t: calc(var(--x) - 2);
    --computed-color: color-mix(
      in srgb,
      var(--weight-2) calc((1 - var(--t)) * 100%),
      var(--weight-3) calc(var(--t) * 100%)
    );
  }

  .weight-display[weight^="3."],
  .weight-display[weight="3"] {
    --t: calc(var(--x) - 3);
    --computed-color: color-mix(
      in srgb,
      var(--weight-3) calc((1 - var(--t)) * 100%),
      var(--weight-4) calc(var(--t) * 100%)
    );
  }

  .weight-display[weight^="4."],
  .weight-display[weight="4"] {
    --t: calc(var(--x) - 4);
    --computed-color: color-mix(
      in srgb,
      var(--weight-4) calc((1 - var(--t)) * 100%),
      var(--weight-5) calc(var(--t) * 100%)
    );
  }

  .weight-display[weight^="5."],
  .weight-display[weight="5"] {
    --t: calc(var(--x) - 5);
    --computed-color: var(--weight-5);
  }
</style>
