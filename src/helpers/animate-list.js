/** @module helpers */

/**
 * Animation helper function
 * @exports animateList
 * @param {React.Ref} elementReference - The React Element reference.
 * @param {string} className - The className to use on animation.
 * @param {Function} onComplete - The function to execute when
 * animation ends.
 */
export default (elementReference, className, onComplete) =>  {
    elementReference.classList.add(className)
    elementReference.addEventListener('animationend', () => {
        elementReference.classList.remove(className)
        onComplete()
    })
}