<?php

namespace App\Http\Requests;

class CommentsRequest extends ApiRequest
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
            'content_origin' => 'required',
            'user_id' => 'required|integer|is_current_user',
            'rating' => 'integer|between:0,99999999999',
        ];
    }

    public function messages()
    {
        return [
            'content_origin.required' => 'Content is required',
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User not is authorized',
            'rating.between' => 'The Ratings length must not be more than 11'
        ];
    }
}
