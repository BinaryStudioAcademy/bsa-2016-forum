<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationRequest;
use App\Models\Notification;
use App\Models\Topic;
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
        //
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
