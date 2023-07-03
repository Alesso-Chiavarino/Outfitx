export class AddProductDTO {

    constructor(payload, files, owner) {

        const { title, description, price, stock, category, _id } = payload
//CAMBIARRR 
        this._id = _id
        this.title = title
        this.description = description
        this.code = payload.code
        this.price = price
        this.stock = stock
        this.category = category
        this.status = stock > 0 ? true : false
        if (files) {
            const paths = files.map(file => {
                return {
                    path: file.path,
                    originalName: file.originalname
                }
            })
            this.thumbnails = paths
        } else {
            this.thumbnails = []
        }
        this.owner = owner
    }
}

export class GetProductDTO{
    constructor(payload){
        this.id = payload._id
        this.title = payload.title
        this.description = payload.description
        this.code = payload.code
        this.price = payload.price
        this.stock = payload.stock
        this.category = payload.category
        this.status = payload.status
        this.thumbnails = payload.thumbnails
    }
}

export class UpdateProductDTO {
    constructor(payload) {
        Object.assign(this, payload)
    }
}