<?php


namespace App\Repositories\Interfaces;

use App\Models\Product;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;

interface ProductRepository
{
    public function create(ProductCreateRequest $request);

    public function update(ProductUpdateRequest $request, Product $product);

    public function remove(Product $product);
}
