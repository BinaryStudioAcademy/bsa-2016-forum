<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class MessageController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $user = User::findOrFail($userId);
        $messages = $user->messages;
        if(!$messages){
            return $this->setStatusCode(404)->respond();
        }

        return $this->setStatusCode(200)->respond($messages);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, Request $request)
    {
        $user = User::findOrFail($userId);
        $message = new Message($request->all());
        $message->user()->associate($user);
        $message->save();

        $this->setStatusCode(201)->respond($message);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId, $id)
    {
        User::findOrFail($userId);      //need for checking if user exist

        $message = Message::where('id',$id)->where('user_from_id', $userId)->first();
        if(!$message){
            return $this->setStatusCode(404)->respond();
        }

        return $this->setStatusCode(200)->respond($message);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($userId, Request $request, $id)
    {
        User::findOrFail($userId);
        $message = Message::findOrFail($id);
        $message->update($request->all());
        return $this->setStatusCode(200)->respond($message);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $id)
    {
        User::findOrFail($userId);

        $message = Message::where('id',$id)->where('user_from_id', $userId)->first();
        if (!$message) {
            return $this->setStatusCode(404)->respond();
        }
        $message->delete();
        return $this->setStatusCode(204)->respond();
    }
}
