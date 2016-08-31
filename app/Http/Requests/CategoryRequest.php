<?php

namespace App\Http\Requests;

class CategoryRequest extends ApiRequest
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
    function rules()
    {
        switch ($this->method()) {
            case 'POST':
                return [
                    'name' => 'required|max:255|unique:categories,name',
                ];

                break;
            case 'PUT':
            case 'PATCH':
                return [
                    'name' => 'required|max:255|unique:categories,name,' . $this->categories,
                ];

                break;
            default:
                return [];
        }
    }

    public function messages()
    {
        return [
            'name.required' => 'Category name is required',
            'name.unique' => 'Category name already exist',
            'name.max' => 'Category name is too long',
        ];
    }
}
