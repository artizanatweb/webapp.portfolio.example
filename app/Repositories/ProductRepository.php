<?php


namespace App\Repositories;


use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Interfaces\AssetModelInterface;
use App\Models\Product;
use App\Models\ProductImage;
use App\Traits\WithFilesRepository;
use App\Exceptions\ProductAssetException;
use \Exception;

class ProductRepository implements Interfaces\ProductRepository
{
    use WithFilesRepository;

    public function create(ProductCreateRequest $request)
    {
        // TODO: Implement create() method.
        $product = new Product();
        $product->name = trim($request->name);
        $product->code = trim($request->code);
        $product->preview = trim($request->preview);
        $product->description = $request->description;
        $product->price = $request->price;

        $saved = $product->save();
        if (!$saved) {
            throw new Exception("Can't create product!");
        }

        if (!$request->has('images')) {
            throw new Exception("Product requires at least one image!");
        }

        $imageDetails = $request->imageDetails;
        $images = $request->file('images');
        if (!$images) {
            throw new Exception("Product requires at least one image!");
        }

        if (count($images) > 0) {
            foreach ($images as $index => $image) {
                $details = $imageDetails[$index];
                $this->addProductImage($image, $details, $product->id);
            }
        }
    }

    public function update(ProductUpdateRequest $request, Product $product)
    {
        // TODO: Implement update() method.
        $product->name = trim($request->name);
        $product->code = trim($request->code);
        $product->preview = trim($request->preview);
        $product->description = $request->description;
        $product->price = $request->price;

        $saved = true;
        if ($product->isDirty()) {
            $saved = $product->save();
        }
        if (!$saved) {
            throw new Exception("Can't update product!");
        }

        $this->processImages($request, $product);
    }

    public function remove(Product $product)
    {
        $productId = $product->id;
        // remove images rows that belong to this product
        $deletedImages = ProductImage::where('product_id', $productId)->delete();

        // remove project
        $removed = $product->delete();
        if (!$removed) {
            throw new Exception("Can't remove product from DB!");
        }

        // remove assets folder and all its content
        $assetsFolderPath = public_path('files/uploads/products/' . $productId);
        $this->clearFolder($assetsFolderPath);
    }

    private function addProductImage($image, $details, int $productId)
    {
        if (!$image) {
            throw new ProductAssetException($details['assetKey'], "image", "On image section, IMAGE File is mandatory!");
        }
        if (!(strlen($details['name']) > 2)) {
            throw new ProductAssetException($details['assetKey'], "name", "Name field is mandatory for all image elements!");
        }

        $productImage = new ProductImage();
        $productImage->product_id = $productId;
        $productImage->name = $details['name'];
        $productImage->description = $details['description'];
        if ('true' == $details['default']) {
            $productImage->default = true;
        }
        $this->saveImageWithThumbnail($image, $productImage, 'uploads/products/' . $productId);
        $productImage->save();
    }

    private function clearFolder($folderPath)
    {
        if (!is_dir($folderPath)) {
            // folder not found -- move on
            return;
        }

        $folderHandler = opendir($folderPath);

        if (!$folderHandler) {
            throw new Exception("Can't open folder: " . $folderPath);
        }

        while($file = readdir($folderHandler)) {
            if (!in_array($file, [".",".."]) ) {
                if (is_dir($folderPath . "/" . $file)) {
                    $this->clearFolder($folderPath . "/" . $file);
                    continue;
                }

                unlink($folderPath . "/" . $file);
            }
        }

        closedir($folderHandler);
        rmdir($folderPath);
    }

    private function clearProductAssets(Collection $assetsArray)
    {
        if (!(count($assetsArray) > 0)) {
            // no actual assets
            return;
        }

        foreach ($assetsArray as $key => $asset) {
            $this->removeProductAsset($asset);
        }
    }

    private function removeProductAsset(AssetModelInterface $asset)
    {
        if (!$asset->remove()) {
            throw new Exception("Can't remove asset: '" . $asset->name . "'");
        }
    }

    private function processImages(ProductUpdateRequest $request, Product $product)
    {
        if (!$request->has('imageDetails')) {
            throw new Exception("Product requires at least one image and 'name' field is mandatory for all image elements!");
        }

        $actualImages = $product->images;
        $imageDetails = $request->imageDetails;
        $images = $request->file('images');

        $editedIds = [];
        foreach ($imageDetails as $index => $details) {
            $image = false;
            if ($images && key_exists($index, $images)) {
                $image = $images[$index];
            }

            if (!($details['id'] > 0)) {
                // new image
                $this->addProductImage($image, $details, $product->id);
                continue;
            }

            array_push($editedIds, $details['id']);

            $productImage = ProductImage::find($details['id']);
            if (!($details['name'] == $productImage->name)) {
                $productImage->name = $details['name'];
            }

            if (!($details['description'] == $productImage->description)) {
                $productImage->description = $details['description'];
            }

            $productImage->default = false;
            if (('true' == $details['default'])) {
                $productImage->default = true;
            }

            if($image) {
                // replace old image
                $productImage->clearImage();

                $this->saveImageWithThumbnail($image, $productImage);
            }

            if ($productImage->isDirty()) {
                $productImage->save();
            }
        }

        foreach ($actualImages as $index => $asset) {
            if (in_array($asset->id, $editedIds)) {
                continue;
            }

            $this->removeProductAsset($asset);
        }
    }
}
