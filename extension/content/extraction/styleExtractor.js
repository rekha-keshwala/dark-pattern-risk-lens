function styleExtractor(ele) {
  const style = window.getComputedStyle(ele);

  return {
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    color: style.color,
    backgroundColor: style.backgroundColor,
  };
}
