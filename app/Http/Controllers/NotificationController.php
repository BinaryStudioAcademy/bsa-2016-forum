<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationRequest;
use App\Models\Notification;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class NotificationController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        if ($userId != Auth::user()->id)
            return $this->setStatusCode(403)->respond();

        $user = Auth::user();

        return $this->setStatusCode(200)->respond(
            $user->notifications, [
            'topic' => $user->topicsNotifications,
            'vote' => $user->votesNotifications
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, NotificationRequest $request)
    {
        if($userId != Auth::user()->id)
            return $this->setStatusCode(403)->respond();

        switch ($request->notification_type)
        {
            case 'topic': $notification = Topic::findOrFail($request->notification_id); break;
            case 'vote': $notification = Vote::findOrFail($request->notification_id); break;
            default: return $this->setStatusCode(204)->respond();
        }

        return $this->setStatusCode(201)->respond();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $id)
    {
        if($userId != Auth::user()->id)
            return $this->setStatusCode(403)->respond();
        $user = Auth::user();
        $notification = $user->notifications()->find($id);
        if (!$notification) {
            throw (new ModelNotFoundException)->setModel(Notification::class);
        }
        $notification->delete();
        return $this->setStatusCode(204)->respond();
    }
}
