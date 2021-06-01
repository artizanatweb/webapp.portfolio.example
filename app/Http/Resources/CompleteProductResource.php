<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\ResourceResponder;
use App\Http\Resources\ProductImageCollection;

class CompleteProductResource extends JsonResource
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
            'price' => $this->price,
            'preview' => $this->preview,
            'description' => $this->description,
            'images' => new ProductImageCollection($this->images),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'last_update' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)->format('d M Y'),
        ];
    }
}
