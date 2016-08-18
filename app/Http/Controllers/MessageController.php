<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

class MessageController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param $userId
     * @return \Illuminate\Http\Response
     */
    public function index($userId, Request $request)
    {
        $userFrom = User::findOrFail($userId);

        if ($request->has('with_user')) {
            $withUserId = $request->get('with_user');
            $userTo = User::findOrFail($withUserId);
            $messages = Message::getConversation($userFrom->id, $userTo->id)->get();
            return $this->setStatusCode(200)->respond($messages, ['with_user' => $userTo]);
        }


        /**
         * $messages = Message::where('user_from_id', $userId)->orWhere('user_to_id', $userId)->get();
         * $usersToIds = $messages->pluck('user_to_id');
         * $usersFromIds = $messages->pluck('user_from_id');
         *
         * $usersTo = User::where(function ($users) use($usersToIds, $usersFromIds) {
         * $users->where(function ($user) use ($usersToIds) {
         * $user->whereIn('id', $usersToIds);
         * })->orWhere(function ($user) use ($usersFromIds) {
         * $user->whereIn('id', $usersFromIds);
         * });
         * })
         * ->where('id', '!=', 7)
         * ->get();
         **/


        $messages = $userFrom->messages()->get();
        if (!$messages) {
            return $this->setStatusCode(200)->respond();
        }
        $usersToIds = $messages->pluck('user_to_id');
        $usersTo = User::whereIn('id', $usersToIds)->get();


        return $this->setStatusCode(200)->respond(
            $messages,
            ['user_from' => $userFrom, 'users_to' => $usersTo]
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param $userId
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, Request $request)
    {
        $userFrom = User::findOrFail($userId);
        $message = new Message($request->all());
        $message->user()->associate($userFrom);
        $message->save();

        $this->setStatusCode(201)->respond($message);

    }

    /**
     * Display the specified resource.
     *
     * @param $userId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId, $id)
    {
        $userFrom = User::findOrFail($userId);
        $message = $userFrom->messages()->where('id', $id)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
        $userTo = User::findOrFail($message->user_to_id);

        return $this->setStatusCode(200)->respond(
            $message,
            ['user_from' => $userFrom, 'user_to' => $userTo]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $userId
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($userId, Request $request, $id)
    {
        $user = User::findOrFail($userId);
        $message = $user->messages()->where('id', $id)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
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
        $user = User::findOrFail($userId);
        $message = $user->messages()->where('user_from_id', $userId)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
        $message->delete();
        return $this->setStatusCode(204)->respond();
    }
}
