<?php

namespace App\Http\Requests;

class SubscriptionRequest extends ApiRequest
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
            'subscription_id' => 'required|integer',
            'subscription_type' => 'required|alpha',
        ];
    }

    public function messages()
    {
        return [
            'subscription_type.required' => 'Subscription type is required',
            'subscription_type.alpha' => 'Subscription type must be string',
            'subscription_id.required' => 'Subscription id is required',
            'subscription_id.integer' => 'Subscription id must be integer',
        ];
    }
}
