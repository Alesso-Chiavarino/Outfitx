const registerUser = async (event) => {
  event.preventDefault()
  const form = document.getElementById('register-form')
  const formData = new FormData(form)
  console.log(formData)
  fetch('/api/session/register', {
    method: 'POST',
    body: formData,
    headers: {
      type: 'profile-img'
    }
  })
    .then((response) => {
      if (response.ok) {
        Toastify({
          text: "User created successfully",
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
        document.location = '/'
      } else {
        Toastify({
          text: "Could not create user",
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