/** @module helpers */

/**
 * Order helper function
 * @exports orderListMap
 * @param {Map} map - The map to iterate over.
 * @param {number} currentIndex - The index used as a reference
 * to reorder objects and set the order attr to current element.
 */
export default (map, currentIndex) => {
    let order
    for (const [key, value] of map.entries()) {
        order = key + (map.size - currentIndex)
        currentIndex > key ? order += 1 : order = (order - map.size) + 1
        value.current.style = `order: ${order}`
    }   
}