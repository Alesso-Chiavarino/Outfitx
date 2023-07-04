import multer from 'multer'
import path from 'path'
import __dirname from './dirname.utils.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.headers.type === 'documents') {
            return cb(null, path.resolve(__dirname, '../../public/documents'))
        }
        if (req.headers.type === 'profile-img') {
            return cb(null, path.resolve(__dirname, '../../public/profiles'))
        }
        if (req.headers.type === 'product-img') {
            return cb(null, path.resolve(__dirname, '../../public/products'))
        }
        cb(null, path.resolve(__dirname, '../../public/others'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage })