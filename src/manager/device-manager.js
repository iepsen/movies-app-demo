/** @module manager */
/**
 * Device Manager
 */
class DeviceManager {
    /**
     * Initialize the Device Manager singleton
     */
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

    /**
     * Add the key down listener
     */
    addEventListener() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    /**
     * Remove the key down listener
     */
    removeEventListener() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    /**
     * Dispatch an keyboard event
     * @param {KeyboardEvent} event - The Keyboard Event key.
     */
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

    /**
     * Subscribe a callback for a key event
     * @param {number} key - The key code.
     * @param {Function} callback - The callback function
     * to be executed on the event dispatch.
     */
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

    /**
     * Unsubscribe a callback for a key event
     * @param {number} key - The key code event.
     */
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
            this.keyRightCallback = () => null
            break
        case this.KEY_DOWN:
            this.keyDownCallback = () => null
            break
        }
    }

    /**
     * Initialize the callbacks with a null function
     */
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

    /**
     * Map all keys used to navigate on the application
     */
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
