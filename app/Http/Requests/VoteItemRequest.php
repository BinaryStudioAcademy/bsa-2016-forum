<?php

namespace App\Http\Requests;

use App\Models\Vote;

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
        if($this->vote_id){
            $vote = Vote::find($this->vote_id);
            if($vote){
                $existedVoteItems = $vote->voteitems()->get()->toArray();
                $stringOfVoteItemsNames ='';
                foreach ($existedVoteItems as $voteItem){
                    $stringOfVoteItemsNames .= $voteItem['name'] . ',';
                }
            }

        };
        return [
            'vote_id' => 'required|exists:votes,id|integer',
            'name' => 'required|not_in:' . $stringOfVoteItemsNames,
            'user_id' => 'required|integer|is_current_user',
        ];
    }

    public function messages()
    {
        return [
            'vote_id.required' => 'Vote ID is required',
            'name.required' => 'Title is required',
            'name.not_in' => 'This voteItem is already exist in the voting',
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User is not authenticated',
        ];
    }
}
