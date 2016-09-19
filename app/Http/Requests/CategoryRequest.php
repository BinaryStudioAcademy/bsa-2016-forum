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
                    'slug' => 'unique:categories,slug|regex:/(?!^\d+$)^[\w\-]+$/',
                ];

                break;
            case 'PUT':
            case 'PATCH':
                $id = $this->route('categories');

                return [
                    'name' => 'required|max:255|unique:categories,name,' . $this->categories,
                    'slug' => 'regex:/(?!^\d+$)^[\w\-]+$/|unique:categories,slug,' . $id,
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
            'slug.unique' => 'Sluggable Url already exist',
            'slug.regex' => 'Sluggable Url can contain only [a-Z, 0-9, -, _] and not digits only'
        ];
    }
}
