const deleteUser = async (id) => {
    fetch(`/api/users/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            Toastify({
                text: "User deleted successfully",
                duration: 3000,
                destination: '/users',
                newWindow: false,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClose: () => window.location.reload()
            }).showToast();
        })
        .then(response => console.log(response))
}

const changeRole = async (id) => {
    console.log(`/api/users/premium/${id}`);
    fetch(`/api/users/premium/${id}`, {
        method: 'PUT'
    })
        .then((response) => {
            if (response.status === 200) {
                Toastify({
                    text: "User modified successfully",
                    duration: 3000,
                    destination: '/users',
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClose: () => window.location.reload()
                }).showToast();
            } else {
                Toastify({
                    text: "Can't modify user",
                    duration: 3000,
                    destination: '#',
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClose: () => window.location.reload()
                }).showToast();
            }
        });
};


const deleteInactive = async () => {
    fetch(`/api/users`, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.status === 200) {
                Toastify({
                    text: "Users deleted successfully",
                    duration: 3000,
                    destination: '/users',
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClose: () => window.location.reload()
                }).showToast();
            } else {
                Toastify({
                    text: "Can't delete users",
                    duration: 3000,
                    destination: '/users',
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClose: () => window.location.reload()
                }).showToast();
            }
        })
}