<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends AssetModel
{
    use HasFactory;

    public function products()
    {
        return $this->belongsToMany(
            Product::class, 'category_product', 'category_id', 'product_id'
        )->withTimestamps();
    }
}
