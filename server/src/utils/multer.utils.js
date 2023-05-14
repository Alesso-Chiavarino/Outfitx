import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'public/img'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
})

export const uploader = multer({ storage })