import { faker } from '@faker-js/faker'

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        department: faker.commerce.department(),
        stock: faker.datatype.number(500),
        price: +faker.commerce.price(),
        image: faker.image.image()
    }
}

const product = generateProduct()

console.log(product)