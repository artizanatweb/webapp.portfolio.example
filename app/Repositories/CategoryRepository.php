<?php


namespace App\Repositories;


use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use App\Traits\WithFilesRepository;

class CategoryRepository implements Interfaces\CategoryRepository
{
    use WithFilesRepository;

    public function create(CategoryCreateRequest $request)
    {
        // TODO: Implement create() method.
        $category = new Category();
        $category->code = trim($request->code);
        $category->name = trim($request->name);
        $category->position = trim($request->position);
        $category->preview = trim($request->preview);
        $category->description = trim($request->description);

        // upload and resize image
        $this->saveImageWithThumbnail($request->file('file'), $category);

        $saved = $category->save();
        if (!$saved) {
            throw new Exception("Can't create category!");
        }

        if (!$request->products) {
            return;
        }

        // assign products to category
        foreach ($request->products as $productId) {
            $category->products()->attach($productId);
        }
    }

    public function update(CategoryUpdateRequest $request, Category $category)
    {
        $category->code = trim($request->code);
        $category->name = trim($request->name);
        $category->position = trim($request->position);
        $category->preview = trim($request->preview);
        $category->description = trim($request->description);

        // clear assigned products
        $category->products()->sync([]);

        $image = $category->getImagePath();
        $thumbnail = $category->getThumbnailPath();

        $hasNewImage = false;
        if ($request->file()) {
            $hasNewImage = true;

            // upload and resize new image
            $this->saveImageWithThumbnail($request->file('file'), $category);
        }

        if ($request->products) {
            foreach ($request->products as $productId) {
                $category->products()->attach($productId);
            }
        }

        $saved = $category->save();
        if (!$saved) {
            throw new Exception("Can't modify category!");
        }

        if ($hasNewImage) {
            // remove actual image and thumbnail
            if (is_file(public_path($image))) {
                unlink(public_path($image));
            }

            if (is_file(public_path($thumbnail))) {
                unlink(public_path($thumbnail));
            }
        }
    }

    public function remove(Category $category)
    {
        $image = $category->getImagePath();
        $thumbnail = $category->getImagePath();

        // clear assigned products
        $category->products()->sync([]);

        // remove category
        $removed = $category->delete();
        if (!$removed) {
            throw new Exception("Can't remove category from DB!");
        }

        // remove image and thumbnail
        if (is_file(public_path($image))) {
            unlink(public_path($image));
        }

        if (is_file(public_path($thumbnail))) {
            unlink(public_path($thumbnail));
        }
    }
}
