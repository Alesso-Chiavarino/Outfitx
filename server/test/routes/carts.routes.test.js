import supertest from 'supertest'
import { expect } from 'chai'
import { dropCarts, dropProducts } from '../setup.test.js'
import { generateProduct } from '../../src/mocks/products.mock.js'

const requester = supertest('http://localhost:8080')

describe('Carts routes test cases', () => {

    it('[CREATE] /api/carts | Should create a cart successfully', async () => {
        const { body, statusCode } = await requester.post('/api/carts').send({})
        expect(statusCode).to.be.eql(201)
        expect(body).to.be.ok
        expect(body).to.be.an('object')
        expect(body).to.have.property('data')
        expect(body.data).to.be.an('object')
        expect(body.data).to.have.property('_id')
        expect(body.data).to.have.property('products')
        expect(body.data.products).to.be.an('array')
        expect(body.data.products).to.be.eql([])
    })

    it('[GET] /api/carts | Should get all carts successfully', async () => {
        const { body, statusCode } = await requester.get('/api/carts')
        expect(statusCode).to.be.eql(200)
        expect(body).to.be.ok
        expect(body).to.be.an('object')
        expect(body).to.have.property('data')
        expect(body.data).to.be.an('array')
    })

    it('[GET] /api/carts/:id | Should get a cart by id successfully', async () => {
        const { body: { data: { _id } } } = await requester.post('/api/carts').send({})
        const { body, statusCode } = await requester.get(`/api/carts/${_id}`)
        expect(statusCode).to.be.eql(200)
        expect(body).to.be.ok
        expect(body).to.be.an('object')
        expect(body).to.have.property('data')
        expect(body.data).to.be.an('object')
        expect(body.data).to.have.property('_id')
        expect(body.data).to.have.property('products')
        expect(body.data.products).to.be.an('array')
        expect(body.data.products).to.be.eql([])
    })

    it('[UPDATE] /api/carts/:id/product/:pid | Should add a product to cart successfully', async () => {

        await dropProducts()
        const mockProduct = generateProduct()

        const { body: { data: { _id } } } = await requester.post('/api/carts').send({})
        const { body: { data: { _id: productId } } } = await requester.post('/api/products').send(mockProduct)

        expect(productId).to.be.eql(mockProduct._id)

        const { body, statusCode } = await requester.put(`/api/carts/${_id}/product/${productId}`).send({ amount: 2 })

        expect(statusCode).to.be.eql(200)
        expect(body).to.be.ok

    })

    it('[DELETE] /api/carts/:id/product/:pid | Should delete a product from cart successfully', async () => {

        await dropProducts()
        const mockProduct = generateProduct()

        const { body: { data: { _id } } } = await requester.post('/api/carts').send({})
        const { body: { data: { _id: productId } } } = await requester.post('/api/products').send(mockProduct)

        await requester.put(`/api/carts/${_id}/product/${productId}`).send({ amount: 4 })

        const { body, statusCode } = await requester.delete(`/api/carts/${_id}/product/${productId}`)

        expect(body).to.be.ok
        expect(statusCode).to.be.eql(200)

    })

    it('[DELETE] /api/carts/:id | Should clear a cart successfully', async () => {

        await dropProducts()
        const mockProduct = generateProduct()

        const { body: { data: { _id } } } = await requester.post('/api/carts').send({})
        const { body: { data: { _id: productId } } } = await requester.post('/api/products').send(mockProduct)

        await requester.put(`/api/carts/${_id}/product/${productId}`).send({ amount: 4 })

        const { body, statusCode } = await requester.delete(`/api/carts/${_id}`)

        expect(body).to.be.ok
        expect(statusCode).to.be.eql(200)
    })

    it('[DELETE] /api/carts/remove/:id | Should delete a cart successfully', async () => {
        await dropProducts()
        const { body: { data: { _id } } } = await requester.post('/api/carts').send({})
        const { body, statusCode } = await requester.delete(`/api/carts/remove/${_id}`)
        expect(body).to.be.ok
        expect(statusCode).to.be.eql(200)
    })

})