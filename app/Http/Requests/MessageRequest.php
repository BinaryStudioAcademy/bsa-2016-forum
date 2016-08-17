<?php

namespace App\Http\Requests;

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
            'user_from_id' => 'required|integer|is_current_user',
            'user_to_id' => 'required|exists:users,id|integer|not_same_user',
            'message' => 'required',
            'is_read' => 'integer|between:0,1',
        ];
    }

    public function messages()
    {
        return [
            'user_from_id.required' => 'Sender ID is required',
            'user_from_id.is_current_user' => 'User ID_from not is authorized',
            'user_to_id.not_same_user' => 'User ID_to can not be the same as authorized',
            'user_to_id.required' => 'Receiver ID is required',
            'message.required' => 'Message is required',
        ];
    }
}
