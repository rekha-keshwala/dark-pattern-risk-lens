function isElementInViewport(el, partiallyVisible = false) {
  const rect = el.getBoundingClientRect();
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;

  if (partiallyVisible) {
    return (
      rect.top < viewHeight &&
      rect.bottom > 0 &&
      rect.left < viewWidth &&
      rect.right > 0
    );
  }

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewHeight &&
    rect.right <= viewWidth
  );
}

function getVisibilityData(ele) {
  const rect = ele.getBoundingClientRect();
  const computedStyles = window.getComputedStyle(ele);

  const {
    display,
    opacity,
    height,
    width,
    visibility,
    padding,
    border,
    overflow,
    position,
  } = computedStyles;

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (display === "none") {
    return {
      isVisible: false,
      status: "hidden",
      reason: ["display-none"],
    };
  }

  if (opacity === "0") {
    return {
      isVisible: false,
      status: "hidden",
      reason: ["opacity-zero"],
    };
  }

  if (visibility === "hidden") {
    return {
      isVisible: false,
      status: "hidden",
      reason: ["visibility-hidden"],
    };
  }

  if (
    height === "0px" &&
    width === "0px" &&
    padding === "0px" &&
    border.startsWith("0px") &&
    overflow === "hidden"
  ) {
    return {
      isVisible: false,
      status: "hidden",
      reason: ["zero-size"],
    };
  }

  if (!isElementInViewport(ele)) {
    return {
      isVisible: false,
      status: "off-screen",
      reason: ["outside-viewport"],
    };
  }

  if (isElementInViewport(ele)) {
    return {
      isVisible: true,
      status: "visible",
      reason: [],
    };
  }

  if (isElementInViewport(ele, true)) {
    return {
      isVisible: true,
      status: "partially-visible",
      reason: ["partially-outside-viewport"],
    };
  }

  if (
    (rect.bottom < 0 && position === "absolute") ||
    (rect.top > windowHeight && position === "absolute")
  ) {
    return {
      isVisible: false,
      status: "off-screen",
      reason: ["outside-viewport"],
    };
  }

  return {
    isVisible: true,
    status: "visible",
    reason: [],
  };
}

function visibilityExtractor(ele) {
  let current = ele;
  ele.scrollIntoView({ behavior: "instant", block: "center" });

  let currentVisibilityData = getVisibilityData(current);

  if (
    currentVisibilityData.isVisible &&
    currentVisibilityData.status !== "partially-visible"
  ) {
    while (current && current !== document.body) {
      current = current.parentElement;
      return getVisibilityData(current);
    }
  } else {
    return currentVisibilityData;
  }
}
