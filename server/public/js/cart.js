const cartBody = document.querySelector('.cart-container')
const cartList = document.querySelector('.cart-list')

const removeProduct = async (cid, pid) => {
    try {
        await fetch(`/api/carts/${cid}/product/${pid}`, {
            method: 'DELETE'
        })
        alert('Producto eliminado del carrito')
        window.location.href = window.location.href
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

const seeTicketButton = (tid) => {
    console.log('funcino')
    const ticketButton = document.createElement('button')
    ticketButton.innerText = 'Ver comprobante'
    ticketButton.style.cursor = 'pointer'
    ticketButton.classList.add('see-ticket', 'waves-effect', 'waves-light', 'btn-small', 'indigo', 'darken-4')
    ticketButton.addEventListener('click', () => {
        window.location.pathname = `/ticket/${tid}`
    })
    cartBody.appendChild(ticketButton)
}

const showThanks = () => {
    const thanksTag = document.createElement('p')
    thanksTag.innerText = 'Gracias por elegirnos. ¡Disfruta tu compra!'
    thanksTag.style.color = '#ccc'
    cartBody.appendChild(thanksTag)
}

const purchase = async (cid) => {
    await fetch(`/api/carts/${cid}/purchase`, {
        method: 'put'
    })
        .then(response => {
            if (response.ok) {
                alert('Compra realizada exitosamente')
            } else {
                alert('Se produjo un problema al procesar su compra. Vuelva a intentarlo')
            }
            return response.json()
        })
        .then(response => {
            seeTicketButton(response.data.newTicket._id)
        })
    cartList.remove()
    showThanks()
}

