function isFormControl(key) {
  switch (key) {
    case "input":
    case "textarea":
    case "select":
    case "button":
    case "checkbox":
      return true;
    default:
      false;
  }
}
function extractBasicProperties(candidates) {
  let extractedData = [];

  candidates.map((candidate) => {
    return [
      ...candidate.map((cand) => {
        cand.element &&
          extractedData.push({
            tagName: cand.element.tagName ?? null,
            id: cand.element.id ?? null,
            candidateType: cand.key ?? null,
            ...((cand.key === "input" || cand.key === "button") && {
              inputType: cand.element.type,
            }),
            text: cand.element.textContent.trim() ?? null,
            ...(isFormControl(cand.key) && { value: cand.element.value }),
            ...((cand.key === "checkbox" || cand.key === "radio") && {
              checked: cand.element.checked ?? null,
              label: labelExtractor(cand.element),
            }),
            ...(cand.key === "A" && { href: cand.element.href ?? null }),
            ariaLabel: cand.element.ariaLabel ?? null,
            title: cand.element.title ?? null,
            style: styleExtractor(cand.element),
            geometry: geometryExtractor(cand.element),
            container: containerExtractor(cand.element),
            visibility: visibilityExtractor(cand.element),
          });
      }),
    ];
  });

  return extractedData;
}
