<?php

namespace App\Http\Requests;

class VoteItemRequest extends ApiRequest
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
            'vote_id' => 'required|exists:votes,id|integer',
            'name' => 'required',
            'user_id' => 'required|integer|is_current_user',
        ];
    }

    public function messages()
    {
        return [
            'vote_id.required' => 'Vote ID is required',
            'name.required' => 'Title is required',
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User not is authorized',
        ];
    }
}
