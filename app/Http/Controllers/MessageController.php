<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Events\UpdatedMessageEvent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Requests\MessageRequest;
use Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\UserStore;


class MessageController extends ApiController
{
    /**
     * The time interval in minutes
     */
    protected $interval;

    public function __construct()
    {
        $this->interval = config('messageChangeOnDelay', 15);
    }

    /**
     * Display a listing of the resource.
     *
     * @param $userId
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $user = User::findOrFail($userId);
        $userCurrent = Auth::authenticate();
        $this->authorize('viewAll', [new Message(), UserStore::getUrlAvatar($user)]);

        if (Input::has('with_user')) {
            $withUserId = Input::get('with_user');
            $userTo = User::findOrFail($withUserId);
            $userTo = UserStore::getUrlAvatar($userTo);
            $messages = Message::getConversation($userCurrent->id, $userTo->id)->get();
            return $this->setStatusCode(200)->respond($messages, ['with_user' => $userTo]);
        }

        $messages = Message::getLast($userCurrent->id);

        if (!$messages) {
            return $this->setStatusCode(200)->respond();
        }
        return $this->setStatusCode(200)->respond($messages,
            ['users' => $this->getMetaDataForCollection($messages)]
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
        $user = User::findOrFail($userId);
        $message = new Message($request->all());

        $this->authorize('create', [$message, $user]);

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
        $userFrom = Auth::authenticate();
        $message = $userFrom->messages()->withTrashed()->find($id);
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }

        $user = User::findOrFail($userId);

        $this->authorize('show', [$message, UserStore::getUrlAvatar($user)]);
        return $this->setStatusCode(200)->respond($message);
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
        $userFrom = Auth::authenticate();
        $message = $userFrom->messages()->find($id);
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }

        $user = User::findOrFail($userId);

        $this->authorize('update', [$message, $user, $this->interval]);

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
        $userFrom = Auth::authenticate();
        $message = $userFrom->messages()->find($id);
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }

        $user = User::findOrFail($userId);

        $this->authorize('delete', [$message, $user, $this->interval]);

        $message->delete();
        event(new UpdatedMessageEvent($message));
        return $this->setStatusCode(204)->respond();
    }

    protected function getMetaDataForCollection(Collection $messages)
    {
        $userCurrent = Auth::authenticate();
        $usersFromIds = $messages->pluck('user_from_id');
        $usersToIds = $messages->pluck('user_to_id');
        $usersIds = $usersFromIds->merge($usersToIds)->unique();

        $users = User::whereIn('id', $usersIds)->get();
        $usersArray = [];
        foreach ($users as $user) {
            $usersArray[$user->id] = UserStore::getUrlAvatar($user);
        }
        $meta = [];
        $currentUserId = $userCurrent->id;
        foreach ($messages as $message) {
            $index = ($currentUserId == $message->user_to_id) ? $message->user_from_id : $message->user_to_id;
            if (!key_exists($index, $meta)) {
                $meta[$index] = $usersArray[$index];
            }
        }
        return $meta;
    }
}
