const candidateSelectors = {
  button: "button",
  link: "a",
  checkbox: 'input[type="checkbox"]',
  radio: 'input[type="radio"]',
  label: "label",
  text: "p, span",
};

function selectCandidates() {
  const candidates = Object.entries(candidateSelectors).map(
    ([key, selector]) => {
      const allEle = document.querySelectorAll(selector);
      
      return [...allEle].map((ele) => ({
        key,
        element: ele,
      }))
    },
  );

  return candidates;
}
