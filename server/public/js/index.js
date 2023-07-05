const prodDetail = async (id) => {
    window.location.href = `/product/${id}`
}

const filterProducts = async (q) => {

    if (q) {
        window.location.href = `/products?query=${q}`
    } else {
        window.location.href = '/products'
    }
}

const decreaseAmount = (event) => {
    const amount = + event.target.nextElementSibling.textContent
    if (amount > 1) {
        event.target.nextElementSibling.textContent = amount - 1
    }
}

const increaseAmount = (event) => {
    const stock = +event.target.parentNode.parentNode.previousElementSibling.textContent.split(' ')[0]
    const amount = +event.target.previousElementSibling.textContent
    if (amount < stock) {
        event.target.previousElementSibling.textContent = amount + 1
    }
}