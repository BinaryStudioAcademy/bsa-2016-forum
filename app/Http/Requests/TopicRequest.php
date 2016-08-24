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
       switch($this->method()) {
            case 'POST':
                return [
                    'name' => 'required|unique:topics,name',
                    'description' => 'required',
                    'user_id' => 'required|integer|is_current_user',
                    'category_id' => 'required|exists:categories,id|integer',
                ];

                break;
            case 'PUT':
            case 'PATCH':
                return [
                    'name' => 'required|unique:topics,name,' . $this->topics,
                    'description' => 'required',
                    'user_id' => 'required|integer|is_current_user',
                    'category_id' => 'required|exists:categories,id|integer',
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
            'description.required'  => 'Description is required',
            'user_id.required'  => 'User ID is required',
            'user_id.is_current_user' => 'User not is authorized',
            'category_id.required'  => 'Category is required'
        ];
    }
}
