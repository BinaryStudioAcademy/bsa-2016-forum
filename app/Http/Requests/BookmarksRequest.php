<?php

namespace App\Http\Requests;

class BookmarksRequest extends ApiRequest
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
            'user_id' => 'required|integer|is_current_user',
            'topic_id' => 'required|integer|exists:topics,id|unique_with:bookmarks,user_id,deleted_at',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required',
            'user_id.integer' => 'User ID must be integer',
            'user_id.is_current_user' => 'User is not authorized',
            'topic_id.required' => 'Topic ID is required',
            'topic_id.integer' => 'Topic ID must be integer',
            'topic_id.unique_with' => 'This topic has already been added to the bookmarks',
            'topic_id.exists' => 'Topic not found'
        ];
    }
}
