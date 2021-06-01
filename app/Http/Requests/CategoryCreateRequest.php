<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryCreateRequest extends FormRequest
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
        return [
            'name' => ['bail', 'required', 'max:250', 'min:3'],
            'code' => ['bail', 'required', 'unique:categories', 'max:250', 'min:3'],
            'position' => ['bail', 'required', 'numeric', 'min:0'],
            'preview' => ['bail', 'required', 'min:8'],
            'description' => ['bail', 'required', 'min:8'],
            'file' => ['bail', 'required', 'mimes:jpg,png', 'max:2048'],
            'products' => ['array'],
            'products.*' => [
                'numeric',
                Rule::exists('products', 'id')
            ],
        ];
    }
}
