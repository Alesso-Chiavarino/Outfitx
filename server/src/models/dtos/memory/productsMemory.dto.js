export class AddProductDTO {
    constructor(id, payload, files){
        this.id = id
        this.title = payload.title
        this.description = payload.description
        this.code = payload.code
        this.price = payload.price
        this.stock = payload.stock
        this.category = payload.category
        this.status = payload.stock > 0 ? true : false
        if(files){
            const paths = files.map(file => {
                return {
                    path: file.path,
                    originalName: file.originalname  
                }  
            })
            this.thumbnails = paths
        }else{
            this.thumbnails = []
        }
    }
}