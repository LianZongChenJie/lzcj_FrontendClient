/**
 * 轻量提示工具
 * 项目中未引入 Element Plus，这里提供一个零依赖的极简实现，
 * API 签名对齐 ElMessage / ElMessageBox / ElNotification，后续可替换为任意 UI 实现
 */

type MessageType = 'error' | 'success' | 'warning' | 'info'

const colorMap: Record<MessageType, string> = {
  error: '#e64545',
  success: '#2ba471',
  warning: '#ed7b2f',
  info: '#8a8f8d'
}

let toastEl: HTMLDivElement | null = null
let toastTimer: ReturnType<typeof setTimeout> | null = null

const showToast = (msg: string, type: MessageType = 'error') => {
  if (!toastEl) {
    toastEl = document.createElement('div')
    Object.assign(toastEl.style, {
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '99999',
      maxWidth: '70%',
      padding: '10px 18px',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '14px',
      lineHeight: '1.5',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.18)',
      transition: 'opacity .3s',
      opacity: '0',
      pointerEvents: 'none'
    })
    document.body.appendChild(toastEl)
  }
  toastEl.textContent = msg
  toastEl.style.backgroundColor = colorMap[type]
  // 强制重排，确保重复弹出时过渡动画生效
  toastEl.style.opacity = '1'
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    if (toastEl) toastEl.style.opacity = '0'
  }, 3000)
}

/** 消息提示（对齐 ElMessage） */
export const message = {
  error: (msg: string) => showToast(msg, 'error'),
  success: (msg: string) => showToast(msg, 'success'),
  warning: (msg: string) => showToast(msg, 'warning'),
  info: (msg: string) => showToast(msg, 'info')
}

/** 通知提示（对齐 ElNotification） */
export const notification = {
  error: (msg: string) => showToast(msg, 'error'),
  success: (msg: string) => showToast(msg, 'success'),
  warning: (msg: string) => showToast(msg, 'warning'),
  info: (msg: string) => showToast(msg, 'info')
}

/** 确认框（对齐 ElMessageBox.confirm，展示端暂用原生 confirm，可替换为自定义弹窗） */
export const confirm = (content: string, title = '提示'): Promise<boolean> => {
  return Promise.resolve(window.confirm(`${title}\n${content}`))
}
