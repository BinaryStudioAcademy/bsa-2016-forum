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
        $namesArr = [];
        if($this->vote_id){
            $vote = Vote::find($this->vote_id);
            if($vote){
                $input = $this->all();
                $input['name'] = trim($input['name']);
                $this->merge($input);

                $existedVoteItems = $vote->voteitems()->get()->toArray();
                foreach ($existedVoteItems as $voteItem){
                    $namesArr[] = $voteItem['name'];
                }
            }

        };
        $stringOfVoteItemsNames = implode(",", $namesArr);
        $rules = [
            'vote_id' => 'required|exists:votes,id|integer',
            'name' => 'required',
            'user_id' => 'required|integer|is_current_user',
        ];
        if($stringOfVoteItemsNames){
            $rules['name'] .= '|not_in:' . $stringOfVoteItemsNames;
        }
        return $rules;
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
