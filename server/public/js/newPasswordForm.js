const form = document.getElementById('new-password-form')

const showError = (messsage) => {
    const errorTag = document.createElement('div');
    errorTag.classList.add('error-message');
    errorTag.textContent = messsage;
    form.parentElement.parentElement.appendChild(errorTag)
}

const showRedirectButton = () => {
    const redirectButton = document.createElement('button')
    redirectButton.innerHTML = `
    <a href='/login/recover'>Nuevo correo</a>
    `
    form.parentElement.parentElement.appendChild(redirectButton)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const payload = new URLSearchParams(formData)
    const requestOptions = {
        method: 'PUT',
        body: payload
    }
    fetch('/api/users/generatenewpassword', requestOptions)
        .then(response => {
            switch (response.status) {
                case 200:
                    Toastify({
                        text: "Password changed successfully",
                        duration: 3000,
                        destination: '/users',
                        newWindow: false,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #202020, #000)",
                        },
                        onClose: () => window.location.reload()
                    }).showToast();
                    window.location = '/'
                    break;
                case 400:
                    showError('The password cannot be the same as the previous one.')
                    break;
                case 403:
                    showError('The token is invalid or has expired. Please try again.')
                    showRedirectButton()
                    break;
                default:
                    break;
            }
        })
        .catch(error => console.log(error))
})