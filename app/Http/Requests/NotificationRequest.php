<?php

namespace App\Http\Requests;

class NotificationRequest extends ApiRequest
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
            'notification_id' => 'required|integer',
            'notification_type' => 'required|alpha',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required',
            'user_id.is_current_user' => 'User ID not is authorized',
            'notification_type.required' => 'Notification type is required',
            'notification_type.alpha' => 'Notification type must be string',
            'notification_id.required' => 'Notification id is required',
            'notification_id.integer' => 'Notification id must be integer',
        ];
    }
}
