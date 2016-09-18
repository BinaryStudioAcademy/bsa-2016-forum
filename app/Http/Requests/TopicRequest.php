<?php

namespace App\Http\Requests;

class TopicRequest extends ApiRequest
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
                    'name' => 'required|unique:topics,name',
                    'description' => 'required',
                    'user_id' => 'required|integer|is_current_user',
                    'category_id' => 'required|exists:categories,id|integer',
                    'slug' => 'unique:topics,slug|regex:/(?!^\d+$)^[\w\-]+$/',
                    'tags' => 'json|tags_validator',
                ];

                break;
            case 'PUT':
            case 'PATCH':
                return [
                    'name' => 'required|unique:topics,name,' . $this->topics,
                    'description' => 'required',
                    'user_id' => 'required|integer|is_current_user',
                    'category_id' => 'required|exists:categories,id|integer',
                    'slug' => 'unique:topics,slug|regex:/(?!^\d+$)^[\w\-]+$/',
                    'tags' => 'json|tags_validator',
                ];

                break;
            default:
                return [];
        }
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'description.required' => 'Description is required',
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User not is authorized',
            'category_id.required' => 'Category is required',
            'slug.unique' => 'Sluggable Url already exist',
            'tags.tags_validator' => 'Format of field tags is incorrect',
            'slug.regex' => 'Sluggable Url can contain only [a-Z, 0-9, -, _] and not digits only'
        ];
    }
}
