<?php

namespace App\Http\Requests;

class VotesRequest extends ApiRequest
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
            'title' => 'required|max:255',
            'finished_at' => 'date|is_five_minutes_time',
            'is_single' => 'integer|between:0,1',
            'is_public' => 'integer|between:0,1',
            'is_saved' => 'integer|between:0,1',
            'users' => 'json',
            'tags' => 'json|tags_validator',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User not is authorized',
            'title.required' => 'Title is required',
            'tags.tags_validator' => 'Format of field tags is incorrect',
            'finished_at.is_five_minutes_time' => 'Perhaps, you typed date in the past. Also, minimum time for vote: 5 minutes.'
        ];
    }
}
