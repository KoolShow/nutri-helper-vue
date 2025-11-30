import { BASE_URL } from "./constants";

export type SearchResult = {
  weight: number;
  word: string;
};

export async function fetchQuery(
  q: string,
  num?: number,
  start?: number,
  comp?: number
) {
  const url = `${BASE_URL}?q=${encodeURIComponent(q)}&num=${num ?? 100}&start=${start ?? 0}&comp=${comp ?? 1_000_000}`;

  const response = await fetch(url);
  const htmlText = await response.text();
  const parser = new DOMParser();
  const newDoc = parser.parseFromString(htmlText, "text/html");

  const results: SearchResult[] = [];
  const resultsHtmlContainer = document.createElement("div");
  let end = false;

  for (const ele of newDoc.body.children) {
    switch (ele.tagName.toLowerCase()) {
      case "form":
      case "br":
        break;
      case "span":
        results.push({
          weight: Number.parseFloat((ele as HTMLSpanElement).style.fontSize),
          word: ele.textContent,
        });
        break;
      case "p":
        if (ele.textContent?.includes("No more results found.")) {
          end = true;
        }
        break;
      default:
        resultsHtmlContainer.appendChild(ele);
    }
  }

  if (results.length === 0) {
    end = true;
  }

  return { results, resultsHtml: resultsHtmlContainer.innerHTML, end, url };
}
