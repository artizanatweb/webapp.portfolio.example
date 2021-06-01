<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $actualId = $this->route('category')->id;

        return [
            'name' => ['bail', 'required', 'max:250', 'min:3'],
            'code' => [
                'bail', 'required', 'max:250', 'min:3',
                Rule::unique('categories')->ignore($actualId, 'id')
            ],
            'position' => ['bail', 'required', 'numeric', 'min:0'],
            'preview' => ['bail', 'required', 'min:8'],
            'description' => ['bail', 'required', 'min:8'],
            'file' => ['mimes:jpg,png', 'max:2048'],
            'products' => ['array'],
            'products.*' => [
                'numeric',
                Rule::exists('products', 'id')
            ],
        ];
    }
}
