<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Database\Eloquent\Model;

class TopicRequest extends ApiRequest
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
    function rules()
    {
       switch($this->method()) {
            case 'POST':
            {
                return [
                    'name' => 'required|unique:topics,name',
                    'description' => 'required',
                    'user_id' => 'required|exists:users,id|integer',
                ];

                break;
            }
            case 'PUT':
            case 'PATCH':
            {
                return [
                    'name' => 'required|unique:topics,name,' . $this->topics,
                    'description' => 'required',
                    'user_id' => 'required|exists:users,id|integer',
                ];

                break;
            }
            default:break;
        }
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'description.required'  => 'Description is required',
            'user_id.required'  => 'User ID is required',
        ];
    }
}
