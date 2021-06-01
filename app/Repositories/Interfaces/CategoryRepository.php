<?php


namespace App\Repositories\Interfaces;

use App\Models\Category;
use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;

interface CategoryRepository
{
    public function create(CategoryCreateRequest $request);

    public function update(CategoryUpdateRequest $request, Category $category);

    public function remove(Category $category);
}
