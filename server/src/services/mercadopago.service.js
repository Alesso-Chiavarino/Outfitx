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
                // success: `outfitx-production.up.railway.app/purchase-success/${cid}`,
                success: `http://localhost:8080/purchase-success/${cid}`,
                failure: 'outfitx-production.up.railway.app',
                pending: '',
            },
            auto_return: 'approved',
            binary_mode: true,
        };

        const point = mercadopago.preferences.create(preference)
            .then((response) => {
                return response.body.init_point;
            })
            .catch(error => console.log(error));

        return point
    }
}