const generateTicket = async (cid) => {
    console.log(cid)
    await fetch(`/api/carts/${cid}/purchase`, {
        method: 'put'
    })
        .then(response => {
            if (!response.ok) {
                return Toastify({
                    text: `Thanks for your purchase!`,
                    duration: 3000,
                    destination: `/products`,
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #202020, #000)",
                    }
                }).showToast();
            }
            return response.json()
        })
        .then(response => {
            const ticketId = response.data.newTicket._id
            window.location.href = `/ticket/${ticketId}`
        })
    cartList.remove()
}