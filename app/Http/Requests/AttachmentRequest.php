<?php

namespace App\Http\Requests;

class AttachmentRequest extends ApiRequest
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
            'f' => 'required|file|max:10240'
        ];
    }

    public function messages()
    {
        return [
            'f.required' => 'File must be selected',
            'f.file' => 'File must be specified',
            'f.max' => 'File size must be equals or less than 10Mb',
        ];
    }
}
