function labelExtractor(element) {
  if (!element) {
    return { text: null, labelSource: null };
  }

  // 1 & 2. Check <label for="..."> (explicit-label) and <label><input></label> (wrapping-label)
  if (element.labels && element.labels.length > 0) {
    const label = element.labels[0];
    const text = label.textContent.trim();
    const isExplicit =
      label.hasAttribute("for") && label.getAttribute("for") === element.id;

    return {
      text,
      labelSource: isExplicit ? "explicit-label" : "wrapping-label",
    };
  }

  // 3. Check aria-label attribute
  if (element.hasAttribute("aria-label")) {
    const text = element.getAttribute("aria-label").trim();
    if (text) {
      return { text, labelSource: "aria-label" };
    }
  }

  // 4. Check aria-labelledby attribute
  if (element.hasAttribute("aria-labelledby")) {
    const ids = element.getAttribute("aria-labelledby").trim().split(/\s+/);
    const text = ids
      .map((id) => document.getElementById(id)?.textContent.trim())
      .filter(Boolean)
      .join(" ");

    if (text) {
      return { text, labelSource: "aria-labelledby" };
    }
  }

  // 5. Nearby text fallback (previous sibling or parent wrapper text)
  const prevSibling = element.previousElementSibling;
  if (prevSibling && prevSibling.textContent.trim()) {
    return {
      text: prevSibling.textContent.trim(),
      labelSource: "nearby-text",
    };
  }

  const parentText = Array.from(element.parentElement?.childNodes || [])
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .join(" ")
    .trim();

  if (parentText) {
    return {
      text: parentText,
      labelSource: "nearby-text",
    };
  }

  // 6. No associated label found
  return { text: null, labelSource: null };
}
