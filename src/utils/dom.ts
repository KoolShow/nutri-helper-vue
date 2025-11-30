export const FONT_SIZE_MATCH_REGEX = /(\d+(\.\d+)?)em/;

export function extractCleanContent(doc: Document) {
  const clone = doc.body.cloneNode(true) as HTMLElement;

  const titles = clone.querySelectorAll('a[href*="nutrimatic.org"]');
  for (const title of titles) {
    if (title.textContent?.includes("Nutrimatic")) {
      title.remove();
    }
  }

  const forms = clone.querySelectorAll("form");
  for (const form of forms) {
    form.remove();
  }

  const searchInputs = clone.querySelectorAll('input[name="q"]');
  for (const input of searchInputs) {
    input.remove();
  }

  const paragraphs = clone.querySelectorAll("p");
  for (const p of paragraphs) {
    if (p.textContent?.includes("Almost, but not quite, entirely unlike tea")) {
      p.remove();
    }
  }

  return clone.innerHTML;
}
