export default (map, currentIndex) => {
    let order
    for (const [key, value] of map.entries()) {
        order = key + (map.size - currentIndex)
        currentIndex > key ? order += 1 : order = (order - map.size) + 1
        value.current.style = `order: ${order}`
    }   
}