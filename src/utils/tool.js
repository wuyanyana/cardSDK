/**
 * 判断是否在移动app内
 */
export const isApp = () => {
  return /leadeon/i.test(navigator.userAgent.toLowerCase())
}
/**
 * 数据记录主键（用户每一个行为，生成不重复数据）
 */
export const uuid = () => {
  return new Date().getTime().toString(36) + '-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(8)
  })
}
/**
 * 用户一次访问的唯一标识（一次会话，从进入到离开的整个过程，是一样的；不同会话不重复）
 */
export const sessionId = () => {
  return new Date().getTime().toString(36) + '-xxxx-4xxx-yxxx-yyy'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(8)
  })
}
