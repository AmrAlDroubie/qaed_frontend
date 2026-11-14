import { onMounted, onUnmounted, type Ref } from 'vue'

/** Dismiss only gestures that start and finish outside the popup. */
export function useOutsideClick(element: Readonly<Ref<HTMLElement | null | undefined>>, close: () => void) {
  let startedOutside = false
  function isOutside(event: MouseEvent) {
    const popup = element.value
    if (!popup) return false
    if (popup instanceof HTMLDialogElement) {
      if (!popup.open || event.target !== popup) return false
      // Native dialog backdrops target the dialog itself, as does its padding.
      const bounds = popup.getBoundingClientRect()
      return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom
    }
    return !event.composedPath().includes(popup)
  }
  function start(event: PointerEvent) { startedOutside = event.button === 0 && isOutside(event) }
  function click(event: MouseEvent) {
    if (startedOutside && isOutside(event)) close()
    startedOutside = false
  }
  onMounted(() => {
    document.addEventListener('pointerdown', start, true)
    document.addEventListener('click', click, true)
  })
  onUnmounted(() => {
    document.removeEventListener('pointerdown', start, true)
    document.removeEventListener('click', click, true)
  })
}
