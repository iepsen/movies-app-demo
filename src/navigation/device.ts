import { ON_KEY_DOWN } from './constants'
import { KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, KEY_OK } from './keys/computer'
import { DeviceInterface, CallbackEventType } from './interfaces'
let initialized = false

const device = new Map()
device.set(KEY_UP, null)
device.set(KEY_DOWN, null)
device.set(KEY_LEFT, null)
device.set(KEY_RIGHT, null)
device.set(KEY_OK, null)

const Device = (): DeviceInterface => {
  const onKeyDown = (event: KeyboardEvent) => {
    const callback = device.get(event.key)

    if (callback) {
      callback()
    }
  }
  const subscribe = (type: string, callback: CallbackEventType): void => {
    device.set(type, callback)
  }
  const unsubscribe = (type: string): void => {
    device.set(type, null)
  }
  const init = (): void => {
    document.addEventListener(ON_KEY_DOWN, onKeyDown)
    initialized = true
  }
  if (!initialized) {
    init()
  }
  return { subscribe, unsubscribe }
}

export { Device, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_OK }
