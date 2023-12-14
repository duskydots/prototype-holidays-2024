export const getMouseOrTouchPosition = (
  event: any,
): {
  x: number
  y: number
} => {
  return {
    x: event.touches ? event.touches[0].clientX : event.clientX,
    y: event.touches ? event.touches[0].clientY : event.clientY,
  }
}
