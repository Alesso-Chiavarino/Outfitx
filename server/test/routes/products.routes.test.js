import supertest from "supertest";
import { expect } from "chai";
import { dropProducts } from "../setup.test.js";
import { generateProduct } from "../../src/mocks/products.mock.js";

const requester = supertest('http://localhost:8080')

describe('Products routes test cases', () => {

    // before(async () => {
    //     await dropProducts()
    // })

    it('[POST] /api/products | Should create a product successfully', async () => {
        const mockProduct = generateProduct()

        const { statusCode, body: { data, data: { code } } } = await requester.post('/api/products').send(mockProduct)

        expect(statusCode).to.be.eql(201)
        expect(data).to.have.property('_id')
        expect(code).to.be.eql(String(mockProduct.code))
    })

    it('[GET] /api/products | Should get all products successfully', async () => {

        const { body: { data }, statusCode } = await requester.get('/api/products')
        expect(data).to.be.ok
        expect(data).to.be.an('array')
        expect(statusCode).to.be.eql(200)

    })

    it('[GET] /api/products/:id | Should get a product by id successfully', async () => {

        const mockProduct = generateProduct()

        const { statusCode: statusCodeProd, body: { data: dataProd, data: { code, _id } } } = await requester.post('/api/products').send(mockProduct)

        expect(statusCodeProd).to.be.eql(201)
        expect(dataProd).to.have.property('_id')
        expect(code).to.be.eql(String(mockProduct.code))

        const { statusCode, body: { data } } = await requester.get(`/api/products/${_id}`)

        expect(statusCode).to.be.eql(200)
        expect(data.id).to.be.eql(_id)
        expect(data).to.be.ok
        expect(data).to.be.an('object')
        expect(statusCode).to.be.eql(200)

    })

    it('[PUT] /api/products/:id | Should update a product by id successfully', async () => {

        const mockProduct = generateProduct()

        const { statusCode: statusCodeProd, body: { data: dataProd, data: { code, _id } } } = await requester.post('/api/products').send(mockProduct)

        expect(statusCodeProd).to.be.eql(201)
        expect(dataProd).to.have.property('_id')
        expect(code).to.be.eql(String(mockProduct.code))

        const { statusCode, body: { data } } = await requester.get(`/api/products/${_id}`)

        expect(statusCode).to.be.eql(200)
        expect(data.id).to.be.eql(_id)
        expect(data).to.be.ok
        expect(data).to.be.an('object')
        expect(statusCode).to.be.eql(200)

        const response = await requester.put(`/api/products/${_id}`).send({ title: 'test' })

        expect(response.statusCode).to.be.eql(200)
        expect(response.body.data.title).to.be.eql('test')

    })

    it('[DELETE] /api/products/:id | Should delete a product by id successfully', async () => {

        const mockProduct = generateProduct()

        const { statusCode, body: { data, data: { code, _id } } } = await requester.post('/api/products').send(mockProduct)

        expect(statusCode).to.be.eql(201)
        expect(data).to.have.property('_id')
        expect(code).to.be.eql(String(mockProduct.code))

        const response = await requester.delete(`/api/products/${_id}`)
        expect(response.body).to.be.ok
        expect(response.body.data._id).to.be.eql(_id)
        expect(response.statusCode).to.be.eql(200)

    })

})