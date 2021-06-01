import ImageReader from "./ImageReader";

class AssetObject {
    constructor(type = 'image') {
        this.id = 0;
        this.project_id = 0;
        this.name = "";
        this.description = "";
        this.image = "";
        this.thumbnail = "";
        this.default = false;
        this.created_at = "";
        this.updated_at = "";
        this.last_update = "";
        // this.imageReader = null;
        this.uploadFile = null;
        this.createImageReaderFor(type);

        this.assetKey = Math.random().toString(36).substring(2, 15);
    }

    createImageReaderFor(type = 'image') {
        let imagePath = '/assets/svgs/default-image.svg';
        if ('video' === type) {
            imagePath = '/assets/svgs/default-video.svg';
        }

        this.imageReader = new ImageReader(imagePath);
    }

    fill(data) {
        if (data.hasOwnProperty("id")) {
            this.id = data.id;
        }

        if (data.hasOwnProperty("project_id")) {
            this.project_id = data.project_id;
        }

        if (data.hasOwnProperty("name")) {
            this.name = data.name;
        }

        this.description = "";
        if (data.hasOwnProperty("description") && data.description) {
            this.description = data.description;
        }

        if (data.hasOwnProperty("image")) {
            this.image = data.image;
        }

        if (data.hasOwnProperty("thumbnail")) {
            this.thumbnail = data.thumbnail;
            this.imageReader = new ImageReader(data.thumbnail);
        }

        if (data.hasOwnProperty("default")) {
            this.default = data.default;
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

export default AssetObject;
