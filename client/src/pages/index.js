import Layout from '@/components/Layout.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch('http://localhost:8080/api/products')
      const data = await res.json()
      setProducts(data)
    }

    loadProducts()
  }, [])

  console.log(products)

  const createProduct = async () => {
    const user = {
      title: 'Remera Levis',
      price: 1000,
      description: 'Esto es una remera levis',
      code: 'aijhwduahduiah',
      stock: 10,
      category: 'Remeras',
      status: true
    }

    const res = await axios.post('http://localhost:8080/api/products', user)
    console.log(res)
  }

  const handleCreate = () => {
    createProduct()
  }

  return (
    <Layout title='Home' >
      <h1>Hola</h1>
      <button onClick={handleCreate}>Create Product</button>
    </Layout>
  )
}

export default Home
