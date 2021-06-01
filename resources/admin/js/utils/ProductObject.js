class ProductObject {
    constructor() {
        this.id = 0;
        this.code = "";
        this.name = "";
        this.price = 0.00;
        this.preview = "";
        this.description = "";
        this.created_at = "";
        this.updated_at = "";
        this.last_update = "";
        this.images = [];
    }

    fill(data) {
        if (data.hasOwnProperty("id")) {
            this.id = data.id;
        }

        if (data.hasOwnProperty("code")) {
            this.code = data.code;
        }

        if (data.hasOwnProperty("name")) {
            this.name = data.name;
        }

        if (data.hasOwnProperty("price")) {
            this.price = data.price;
        }

        if (data.hasOwnProperty("preview")) {
            this.preview = data.preview;
        }

        if (data.hasOwnProperty("description")) {
            this.description = data.description;
        }

        if (data.hasOwnProperty("created_at")) {
            this.created_at = data.created_at;
        }

        if (data.hasOwnProperty("updated_at")) {
            this.updated_at = data.updated_at;
        }

        if (data.hasOwnProperty("last_update")) {
            this.last_update = data.last_update;
        }
    }
}

export default ProductObject;
