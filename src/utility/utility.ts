export function unfocus() {
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur();
}
