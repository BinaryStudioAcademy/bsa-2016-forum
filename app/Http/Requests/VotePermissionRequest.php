<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class VotePermissionRequest extends Request
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
            'vote_id' => 'required|integer|exists:votes,id',
            'user_id' => 'required|integer|exists:users,id',
            'grant' => 'between:0,1'
        ];
    }
}
