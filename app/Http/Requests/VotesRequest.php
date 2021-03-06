<?php

namespace App\Http\Requests;

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
        switch ($this->method()) {
            case 'POST':
                return [
                    'user_id' => 'required|integer',
                    'title' => 'required|max:255',
                    'finished_at' => 'date|is_five_minutes_time',
                    'is_single' => 'integer|between:0,1',
                    'is_public' => 'integer|between:0,1',
                    'is_saved' => 'integer|between:0,1',
                    'users' => 'json',
                    'tags' => 'json|tags_validator',
                    'slug' => 'unique:votes,slug|regex:/(?!^\d+$)^[\w\-]+$/',
                ];

                break;
            case 'PUT':
            case 'PATCH':
                $id = $this->route('votes');

                return [
                    'user_id' => 'required|integer',
                    'title' => 'required|max:255',
                    //'finished_at' => 'date|is_five_minutes_time',
                    'is_single' => 'integer|between:0,1',
                    'is_public' => 'integer|between:0,1',
                    'is_saved' => 'integer|between:0,1',
                    'users' => 'json',
                    'slug' => 'regex:/(?!^\d+$)^[\w\-]+$/|unique:votes,slug,' . $id
                ];

                break;
            default:
                return [];
        }
    }

    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required',
            'title.required' => 'Title is required',
            'finished_at.is_five_minutes_time' => 'Perhaps, you typed date in the past. Also, minimum time for vote: 5 minutes.',
            'slug.unique' => 'Sluggable Url already exist',
            'slug.regex' => 'Sluggable Url can contain only [a-Z, 0-9, -, _] and not digits only'
        ];
    }
}
