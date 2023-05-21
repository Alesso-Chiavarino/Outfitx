import mongoose from "mongoose";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest('http://localhost:8080')

describe('Products routes test cases', () => {

    it('[POST] /api/products | Should create a product successfully', async () => {
        const product = {
            _id: 'ajwdawd2i82djkaw',
            title: 'Remera Levis',
            description: 'Remera Levis color blanco talle S',
            code: '678',
            price: 1000,
            stock: 100,
            category: 'Remeras',
            status: true,
            thumbnails: {
                path: '/Users/alesso/Desktop/Outfitx/server/public/img/remera-levis',
                originalName: 'remera-levis.jpg'
            }
        }

        const response = await requester.post('/api/products').field({
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
        }).attach('thumbnails', './gato.png')

        expect(response.statusCode).to.be.eql(200)
    })

})