<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\ResourceResponder;
use Carbon\Carbon;
use App\Http\Resources\ProductCollection;

class CompleteCategoryResource extends JsonResource
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
            'position' => $this->position,
            'preview' => $this->preview,
            'description' => $this->description,
            'image' => $this->image,
            'thumbnail' => $this->thumbnail,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'last_update' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)->format('d M Y'),
            'products' => new ProductCollection($this->products),
        ];
    }
}
