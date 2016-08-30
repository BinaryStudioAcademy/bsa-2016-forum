<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriptionRequest;
use App\Models\Subscription;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends ApiController
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
            $user->subscriptions, [
            'topic' => $user->topicSubscriptions,
            'vote' => $user->voteSubscriptions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, SubscriptionRequest $request)
    {
        if($userId != Auth::user()->id)
            return $this->setStatusCode(403)->respond();

        switch ($request->subscription_type)
        {
            case 'topic': $subscribe_target = Topic::findOrFail($request->subscription_id); break;
            case 'vote': $subscribe_target = Vote::findOrFail($request->subscription_id); break;
            default: return $this->setStatusCode(204)->respond();
        }

        $subscribe_target->sync([$userId], false);
        $subscribe_target;
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
        $subscribe = $user->subscriptions()->find($id);
        if (!$subscribe) {
            throw (new ModelNotFoundException)->setModel(Subscription::class);
        }
        $subscribe->delete();
        return $this->setStatusCode(204)->respond();
    }
}
