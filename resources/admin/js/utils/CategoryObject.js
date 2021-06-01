import ImageReader from "./ImageReader";

class CategoryObject {
    constructor() {
        this.id = 0;
        this.code = "";
        this.name = "";
        this.preview = "";
        this.description = "";
        this.image = "";
        this.thumbnail = "";
        this.position = 0;
        this.created_at = "";
        this.updated_at = "";
        this.last_update = "";
        this.products = [];

        this.createImageReader();
    }

    createImageReader() {
        let imagePath = '/assets/svgs/category.svg';

        this.imageReader = new ImageReader(imagePath);
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

        if (data.hasOwnProperty("preview")) {
            this.preview = data.preview;
        }

        if (data.hasOwnProperty("description")) {
            this.description = data.description;
        }

        if (data.hasOwnProperty("image")) {
            this.image = data.image;
            this.imageReader = new ImageReader(data.image);
        }

        if (data.hasOwnProperty("thumbnail")) {
            this.thumbnail = data.thumbnail;
        }

        if (data.hasOwnProperty("position")) {
            this.position = data.position;
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

        if (data.hasOwnProperty('products')) {
            this.products = data.products;
        }
    }
}

export default CategoryObject;
