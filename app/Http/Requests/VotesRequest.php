<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

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
            'user_id' => 'required|exists:users,id|integer',
            'title' => 'required|max:255',
            'finished_at' => 'date',
            'is_single' => 'integer|size:1',
            'is_public' => 'integer|size:1',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required',
            'title.required'  => 'Title is required',
        ];
    }
}
