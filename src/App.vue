<template>
  <div>
    <a :href="BASE_URL" class="title">Nutrimatic</a>
    <div class="subtitle">Almost, but not quite, entirely unlike tea.</div>

    <SearchBar v-model:search-value="searchValue" @submit="onSubmit"/>

    <PaginationControls
      v-if="searching"
      v-model:start="pagination.current"
      v-model:num="pagination.per_page"
      :result-count="pagination.total"
      :known="pagination.known"
      :end="isEnd"
    />

    <ResultList
      v-if="searching"
      :result-items="resultItems"
      :result-html="resultHtml"
      :end="isEnd"
    />

    <PaginationControls
      v-if="searching"
      v-model:start="pagination.current"
      v-model:num="pagination.per_page"
      :result-count="pagination.total"
      :known="pagination.known"
      :end="isEnd"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from "vue";
  import PaginationControls from "./components/PaginationControls.vue";
  import ResultList from "./components/ResultList.vue";
  import { BASE_URL } from "./utils/constants";
  import { fetchQuery } from "./utils/update";
  import "./utils/update";
  import SearchBar from "./components/SearchBar.vue";

  const searchValue = ref<string>("");
  const searchValueChanged = ref<boolean>(false);

  const resultItems = ref<Array<{ weight: number; word: string }>>([]);
  const resultHtml = ref<string>("");
  const isEnd = ref<boolean>(false);

  const pagination = ref<{
    current: number;
    per_page: number;
    total: number;
    known: boolean;
  }>({
    current: 0,
    per_page: 40,
    total: 0,
    known: false,
  });

  const searching = ref<boolean>(false);
  const max_comp = ref<number>(1_000_000);

  async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("q") !== null) {
      searchValue.value = urlParams.get("q") || "";
    }
    if (urlParams.get("start") !== null) {
      pagination.value.current = Number.parseInt(
        urlParams.get("start") || "0",
        10
      );
    }
    if (urlParams.get("num") !== null) {
      pagination.value.per_page = Number.parseInt(
        urlParams.get("num") || "40",
        10
      );
    }
    if (urlParams.get("comp") !== null) {
      max_comp.value = Number.parseInt(urlParams.get("comp") || "1000000", 10);
    }
    await onSubmit(true);
  }

  onMounted(() => {
    window.addEventListener("popstate", init);
    init();
  });

  onUnmounted(() => {
    window.removeEventListener("popstate", init);
  });

  watch(
    () => pagination.value.current,
    () => onSubmit(true)
  );
  watch(
    () => pagination.value.per_page,
    () => onSubmit(true)
  );
  watch(searchValue, () => {
    searchValueChanged.value = true;
  });

  async function onSubmit(isPopState = false) {
    if (searchValueChanged.value) {
      pagination.value.current = 0;
      pagination.value.known = false;
      searchValueChanged.value = false;
    }
    if (searchValue.value) {
      searching.value = true;
      const { results, resultsHtml, end, url } = await fetchQuery(
        searchValue.value,
        pagination.value.per_page,
        pagination.value.current,
        max_comp.value
      );
      resultItems.value = results;
      resultHtml.value = resultsHtml;
      isEnd.value = end;

      const title = `${searchValue.value} - Nutrimatic`;
      document.title = title;
      if (isPopState) {
        window.history.replaceState({}, title, url);
      } else {
        window.history.pushState({}, title, url);
      }

      if (end) {
        pagination.value.total =
          pagination.value.current + resultItems.value.length;
        pagination.value.known = true;
      } else {
        pagination.value.total = Math.max(
          pagination.value.total,
          pagination.value.current + resultItems.value.length
        );
      }
    } else {
      searching.value = false;
      resultItems.value = [];
    }
  }
</script>

<style scoped>
  .title {
    font-size: 3.5em;
    font-weight: bold;
    font-family: Times, "Times New Roman", serif;
    background: linear-gradient(135deg, #bbffee 0%, #bbe0ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
    margin-bottom: 20px;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  .title::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #5a9fd4, transparent);
    transition: width 0.3s ease;
  }

  .title:hover::after {
    width: 100%;
  }

  .title:hover {
    transform: translateY(-2px);
    filter: brightness(1.2);
  }

  .subtitle {
    font-size: 1em;
    font-style: italic;
    color: #8899aa;
    margin-bottom: 30px;
    width: 100%;
    text-align: left;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, sans-serif;
  }
</style>
