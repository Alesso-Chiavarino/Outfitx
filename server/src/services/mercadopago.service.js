import mercadopago from '../config/mercadopago.config.js'

export class MercadoPagoService {
    async checkout(products, cid) {
        var preference = {
            items: products.map(prod => {
                return {
                    title: prod.product.title,
                    unit_price: prod.product.price,
                    quantity: prod.quantity || 1,
                    picture_url: prod.product?.thumbnails[0]?.path,
                    category_id: prod.product.category,
                    currency_id: 'ARS',
                };
            }),
            back_urls: {
                success: `https://outfitx.onrender.com/purchase-success/${cid}`,
                failure: 'https://outfitx.onrender.com',
                pending: 'https://outfitx.onrender.com',
            },
            auto_return: 'approved',
            binary_mode: true,
        };

        const purchasePoint = mercadopago.preferences.create(preference)
            .then((response) => {
                return response.body.init_point;
            })
            .catch(error => console.log(error));

        return purchasePoint
    }
}