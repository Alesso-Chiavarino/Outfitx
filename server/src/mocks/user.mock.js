import { faker } from '@faker-js/faker'

export const generateUser = () => {
    const totalProducts = faker.datatype.number({
        min: 1,
        max: 10
    })

    const products = Array.from({length: totalProducts }, () => generateProduct())
    
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        products
    }
}