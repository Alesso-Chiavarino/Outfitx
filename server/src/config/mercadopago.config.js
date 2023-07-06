import mercadopago from 'mercadopago';
import ENV from './env.config.js';

const { MERCADOPAGO_ACCESS_TOKEN_TEST } = ENV;

mercadopago.configure({
    access_token: MERCADOPAGO_ACCESS_TOKEN_TEST
})

export default mercadopago;