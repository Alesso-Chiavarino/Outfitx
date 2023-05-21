import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Outfitx API',
            description: 'Ecommerce API',
            version: '1.0.0',
            contact: {
                name: 'Alessandro Chiavarino',
                url: 'https://portafolio-alessandro-chiavarino.vercel.app',
                email: 'alessochiavarino@gmail.com'
            }
        },
    },
    apis: [`${process.cwd()}/src/docs/**/*.yml`]
};

export const specs = swaggerJsDoc(swaggerOptions)