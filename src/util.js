// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = (func, wait, immediate) => {
  let timeout = null
  return function (...args) {
    const self = this
    const later = () => {
      timeout = null
      if (!immediate) {
        return func.apply(self, args)
      }
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) {
      return func.apply(self, args)
    }
  }
}

let systemStylesheet = null

export const addSystemStyles = (css) => {
  removeSystemStyles()
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.type = 'text/css'

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
  systemStylesheet = style
}

export const removeSystemStyles = () => {
  if (systemStylesheet !== null) {
    systemStylesheet.parentElement.removeChild(systemStylesheet)
    systemStylesheet = null
  }
}
