<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCreateRequest extends FormRequest
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
            'code' => ['bail', 'required', 'unique:products', 'max:250', 'min:3'],
            'price' => ['bail', 'required', 'numeric', 'between:0.1,999999.99'],
            'preview' => ['bail', 'required', 'min:8'],
            'description' => ['bail', 'required', 'min:8'],
        ];
    }
}
