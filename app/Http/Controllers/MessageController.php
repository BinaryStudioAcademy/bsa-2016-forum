<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Events\UpdatedMessageEvent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Requests\MessageRequest;
use Illuminate\Support\Facades\Input;


class MessageController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param $userId
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $userFrom = User::findOrFail($userId);

        if (Input::has('with_user')) {
            $withUserId = Input::get('with_user');
            $userTo = User::findOrFail($withUserId);
            $messages = Message::getConversation($userFrom->id, $userTo->id)->get();
            return $this->setStatusCode(200)->respond($messages, ['with_user' => $userTo]);
        }

        $messages = Message::getLastIncoming($userFrom->id);

        if (!$messages) {
            return $this->setStatusCode(200)->respond();
        }
        $usersToIds = $messages->pluck('user_from_id');
        $usersTo = User::whereIn('id', $usersToIds)->get();

        return $this->setStatusCode(200)->respond(
            $messages,
            ['users_from' => $usersTo]
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param $userId
     * @param MessageRequest|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, MessageRequest $request)
    {
        $userFrom = User::findOrFail($userId);
        $message = new Message($request->all());
        $message->save();
        event(new NewMessageEvent($message));
        return $this->setStatusCode(201)->respond($message);
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
            ['user_with' => $userTo]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $userId
     * @param MessageRequest|Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($userId, MessageRequest $request, $id)
    {
        $user = User::findOrFail($userId);
        $message = $user->messages()->where('id', $id)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
        $message->update($request->all());
        event(new UpdatedMessageEvent($message));
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
        $message->message = "Deleted..";
        event(new UpdatedMessageEvent($message));
        $message->delete();
        return $this->setStatusCode(204)->respond();
    }
}
