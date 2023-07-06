const cartBody = document.querySelector('.cart-container')
const cartList = document.querySelector('.cart-list')

const removeProduct = async (cid, pid) => {
    try {
        await fetch(`/api/carts/${cid}/product/${pid}`, {
            method: 'DELETE'
        })
        Toastify({
            text: "Product removed from cart",
            duration: 3000,
            destination: '#',
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #202020, #000)",
            },
            onClick: () => window.location.reload()
        }).showToast();
    } catch (err) {
        console.log(err)
    }
}

const clearCart = async (cid) => {
    await fetch(`/api/carts/${cid}`, {
        method: 'delete'
    })
    window.location.href = window.location.href
}

const checkout = async (cid) => {
    await fetch(`/api/carts/${cid}/purchase`, {
        method: 'post'
    })
        .then(response => {
            if (!response.ok) {
                return Toastify({
                    text: `Not possible to checkout`,
                    duration: 3000,
                    destination: `/products`,
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }
            return response.json()
        })
        .then(response => {
            window.location.href = response.data
        })
    cartList.remove()
}

