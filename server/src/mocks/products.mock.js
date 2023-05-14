import { faker } from '@faker-js/faker'

export const generateProduct = () => {

    const thumbnails = []
    for (let i = 0; i < faker.number.int({ min: 1, max: 7 }); i++) {
        thumbnails.push({
            path: faker.image.url(),
            originalName: faker.system.fileName()
        })
    }

    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.int({ min: 1, max: 1000 }),
        category: faker.commerce.department(),
        stock: faker.number.int({ min: 1, max: 1000 }),
        price: +faker.commerce.price(),
        status: faker.datatype.boolean(),
        thumbnails
    }
}