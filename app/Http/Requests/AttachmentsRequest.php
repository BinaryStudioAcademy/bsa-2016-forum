<?php

namespace App\Http\Requests;

class AttachmentsRequest extends ApiRequest
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
            'value' => 'required|max:255|file_isset',
            'type' => 'required|max:255',
        ];
    }

    public function messages()
    {
        return [
            'value.required' => 'Value is required',
            'value.file_isset' => 'File not exist',
            'type.required' => 'Type is required',
        ];
    }
}
