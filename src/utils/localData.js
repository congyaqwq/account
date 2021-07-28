/* 
@expired: 小时
 */
export function set(key, value, expired) {
  if (expired) {
    localStorage.setItem(`${key}__expired__`, Date.now() + 1000 * 60 * expired)
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export function get(key) {
  const expired = localStorage.getItem(`${key}__expired__`)
  if (expired && Date.now() > expired) {
    clear(`${key}__expired__`)
    clear(key)
    return
  }
  return JSON.parse(localStorage.getItem(key))
}

function clear(key) {
  localStorage.removeItem(key)
}