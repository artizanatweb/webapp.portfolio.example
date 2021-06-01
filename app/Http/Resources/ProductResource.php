<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\ResourceResponder;
use Carbon\Carbon;
use \App\Http\Resources\ProductImageCollection;

class ProductResource extends JsonResource
{
    use ResourceResponder;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'preview' => $this->preview,
            'price' => $this->price,
            'images' => new ProductImageCollection($this->images),
            'last_update' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)->format('d M Y'),
        ];
    }
}
