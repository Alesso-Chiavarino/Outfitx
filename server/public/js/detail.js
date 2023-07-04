const decreaseAmount = (event) => {
    const amount = + event.target.nextElementSibling.textContent
    if (amount > 1) {
        event.target.nextElementSibling.textContent = amount - 1
    }
}

const increaseAmount = (event, stock) => {
    const amount = +event.target.previousElementSibling.textContent
    if (amount < stock) {
        event.target.previousElementSibling.textContent = amount + 1
    }
}

const addToCart = async (event, pid, cid) => {
    try {
        const amount = event.target.previousElementSibling.children[1].textContent
        const addedProduct = await fetch(`/api/carts/${cid}/product/${pid}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ amount }),
        })
        if (addedProduct.status == 200) {
            Toastify({
                text: `${amount} product(s) added to cart`,
                duration: 3000,
                destination: `/cart/${cid}`,
                newWindow: false,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        } else {
            Toastify({
                text: "Product could not be added to cart",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
        event.target.previousElementSibling.children[1].textContent = 1

    } catch (error) {
        console.log(error);
    }
}

const selectImg = (name) => {
    const img = document.querySelector('.product-img')
    img.src = `../../statics/products/${name}`
}

const deleteItem = (pid) => {
    fetch(`/api/products/${pid}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('producto eliminado exitosamente')
                window.location = '/'
            } else {
                alert("No se pudo eliminar el producto, vuelva a intentar")
            }

        })
}