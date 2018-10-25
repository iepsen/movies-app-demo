/** @module helpers */

/**
 * Animation helper function
 * @exports animateList
 * @param {React.Ref} elementReference - The React Element reference.
 * @param {number} direction - The direction 
 * @param {string} className - The className to use on animation.
 * @param {Function} callback - The function to be executed.
 */
export default (elementReference, direction, className, callback) =>  {
    if (direction === -1) callback()
    elementReference.classList.add(className)
    elementReference.addEventListener('animationend', () => {
        elementReference.classList.remove(className)
        if (direction === 1) callback()
    })
}