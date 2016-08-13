<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class MessageRequest extends ApiRequest
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
            'user_from_id' => 'required|exists:users,id|integer',
            'user_to_id' => 'required|exists:users,id|integer',
            'message' => 'required',
            'is_read' => 'integer|size:1',
        ];
    }

    public function messages()
    {
        return [
            'user_from_id.required' => 'Sender ID is required',
            'user_to_id.required' => 'Receiver ID is required',
            'message.required' => 'Message is required',
        ];
    }
}
