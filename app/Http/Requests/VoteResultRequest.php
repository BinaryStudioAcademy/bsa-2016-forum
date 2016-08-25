<?php

namespace App\Http\Requests;

class VoteResultRequest extends ApiRequest
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
            'user_id' => 'required|integer|is_current_user|multi_unique',
            'vote_id' => 'required|integer|exists:votes,id',
            'vote_item_id' => 'required|integer|exists:vote_items,id|voteitem_exist',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User is not authorized',
            'vote_id.required'  => 'Vote ID is required',
            'vote_item_id.required'  => 'Vote item ID is required',
            'vote_id.exists'  => 'Vote does not exist',
            'vote_item_id.exists'  => 'VoteItem does not exist',
            'user_id.multi_unique' => 'Result from User by Vote with Voteitem already exist',
            'vote_item_id.voteitem_exist' => 'VoteItem do not belong Vote',
        ];
    }
}
