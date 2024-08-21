const calculatePagination = (currentPage, totalPages, product) => {
    let prevPages = []
    let nextPages = []
    for (let i = currentPage - 3; i < currentPage; i++) {
        if (i > 0) {
            prevPages.push(i)
        }
    }
    for (let i = currentPage + 1; i <= currentPage + 3; i++) {
        if (i <= totalPages) {
            nextPages.push(i)
        }
    }
    const hasOwnPage = product.length > 0
    return { prevPages, nextPages, hasOwnPage }
}
module.exports = calculatePagination
