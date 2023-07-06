const createProduct = async (event) => {
  event.preventDefault()
  const form = document.getElementById("product-form")
  const formData = new FormData(form)
  fetch('/api/products', {
    method: 'POST',
    body: formData,
    headers: {
      type: 'product-img'
    }
  })
    .then((response) => {
      if (response.ok) {
        Toastify({
          text: "Product created successfully",
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
        document.location = '/'
      } else {
        Toastify({
          text: "Can't create product",
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
      }
    })
}