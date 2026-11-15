const SEMANTIC_CONTAINERS = new Set([
  "FORM",
  "FIELDSET",
  "SECTION",
  "ARTICLE",
  "DIALOG",
  "NAV",
  "ASIDE",
  "MAIN",
  "HEADER",
  "FOOTER",
]);

const INTERACTIVE_SELECTOR = [
  'input:not([type="hidden"])',
  "button",
  "select",
  "textarea",
  "a[href]",
  '[role="button"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const containerIds = new WeakMap();
let nextId = 1;

function getContainerId(el) {
  if (!containerIds.has(el)) {
    containerIds.set(el, `container_${nextId++}`);
  }
  return containerIds.get(el);
}

function isMeaningFullContainer(el) {
  if (!el || el === document.body || el === document.documentElement) {
    return false;
  }

  // 1. Check semantic HTML tags
  if (SEMANTIC_CONTAINERS.has(el.tagName)) {
    return true;
  }

  if (el.tagName === "DIV") {
    const controlsInside = el.querySelectorAll(INTERACTIVE_SELECTOR);
    // Must contain at least 2 controls so single-field wrappers are skipped
    if (controlsInside.length >= 2) {
      return true;
    }
  }

  return false;
}

function containerExtractor(element) {
  function getNearestContainer() {
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
      if (isMeaningFullContainer(parent)) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document.body;
  }

  const containerEl = getNearestContainer(element);
  const id = getContainerId(containerEl);
  return {
    id,
    tag: containerEl.tagName.toLowerCase(),
    domId: containerEl.id || null,
    classList: Array.from(containerEl.classList),
    isFallbackBody: containerEl === document.body,
  };
}
