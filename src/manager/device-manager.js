class DeviceManager {
    constructor() {
        if (!DeviceManager.instance) {
            DeviceManager.instance = this
            this.setDefaultProperties()
            this.mapKeys()
            this.onKeyDown = this.onKeyDown.bind(this)
            this.addEventListener()
        }
        return DeviceManager.instance
    }

    addEventListener() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    removeEventListener() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown(event) {
        this.keyAnyCallback()
        switch(event.keyCode) {
        case this.KEY_EXIT:
            this.keyBackCallback()
            event.preventDefault()
            break
        case this.KEY_OK:
            this.keyOkCallback()
            event.preventDefault()
            break
        case this.KEY_BACK:
            this.keyBackCallback()
            event.preventDefault()
            break
        case this.KEY_SPACE:
            this.keySpaceCallback()
            event.preventDefault()
            break
        case this.KEY_LEFT:
            this.keyLeftCallback()
            event.preventDefault()
            break
        case this.KEY_UP:
            this.keyUpCallback()
            event.preventDefault()
            break
        case this.KEY_RIGHT:
            this.keyRightCallback()
            event.preventDefault()
            break
        case this.KEY_DOWN:
            this.keyDownCallback()
            event.preventDefault()
            break
        }
    }

    subscribe(key, callback) {
        switch(key) {
        case this.KEY_ANY:
            this.keyAnyCallback = callback
            break
        case this.KEY_EXIT:
            this.keyExitCallback = callback
            break
        case this.KEY_OK:
            this.keyOkCallback = callback
            break
        case this.KEY_BACK:
            this.keyBackCallback = callback
            break
        case this.KEY_SPACE:
            this.keySpaceCallback = callback
            break
        case this.KEY_LEFT:
            this.keyLeftCallback = callback
            break
        case this.KEY_UP:
            this.keyUpCallback = callback
            break
        case this.KEY_RIGHT:
            this.keyRightCallback = callback
            break
        case this.KEY_DOWN:
            this.keyDownCallback = callback
            break
        }
    }

    unsubscribe(key) {
        switch(key) {
        case this.KEY_ANY:
            this.keyAnyCallback = () => null
            break
        case this.KEY_EXIT:
            this.keyExitCallback = () => null
            break
        case this.KEY_OK:
            this.keyOkCallback = () => null
            break
        case this.KEY_BACK:
            this.keyBackCallback = () => null
            break
        case this.KEY_SPACE:
            this.keySpaceCallback = () => null
            break
        case this.KEY_LEFT:
            this.keyLeftCallback = () => null
            break
        case this.KEY_UP:
            this.keyUpCallback = () => null
            break
        case this.KEY_RIGHT:
            this.keyLeftCallback = () => null
            break
        case this.KEY_DOWN:
            this.keyDownCallback = () => null
            break
        }
    }

    setDefaultProperties() {
        this.keyAnyCallback = () => null
        this.keyExitCallback = () => null
        this.keyOkCallback = () => null
        this.keyBackCallback = () => null
        this.keySpaceCallback = () => null
        this.keySpaceCallback = () => null
        this.keyLeftCallback = () => null
        this.keyUpCallback = () => null
        this.keyRightCallback = () => null
        this.keyDownCallback = () => null
    }

    mapKeys() {
        this.KEY_ANY = -1
        this.KEY_EXIT = 8
        this.KEY_OK = 13
        this.KEY_BACK = 27
        this.KEY_SPACE = 32
        this.KEY_LEFT = 37
        this.KEY_UP = 38
        this.KEY_RIGHT = 39
        this.KEY_DOWN = 40
    }
}

const instance = new DeviceManager()
export { instance as deviceManager }