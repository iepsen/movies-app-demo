export default (elementReference, className, onComplete) =>  {
    elementReference.classList.add(className)
    elementReference.addEventListener('animationend', () => {
        elementReference.classList.remove(className)
        onComplete()
    })
}