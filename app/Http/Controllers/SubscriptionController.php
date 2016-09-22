<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriptionRequest;
use App\Models\Subscription;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId, Request $request)
    {
        if ($userId != Auth::user()->id) {
            return $this->setStatusCode(403)->respond();
        }

        $user = Auth::user();

        if ($request->limit) {
            $subscriptions = $user->subscriptions()->limit($request->limit)->orderBy('updated_at', 'DESC')->get();
        } else {
            $subscriptions = $user->subscriptions;
        }

        return $this->setStatusCode(200)->respond(
            $subscriptions, [
            Topic::$morphTag => $user->topicSubscriptions,
            Vote::$morphTag => $user->voteSubscriptions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, SubscriptionRequest $request)
    {
        if ($userId != Auth::user()->id) {
            return $this->setStatusCode(403)->respond();
        }

        switch ($request->subscription_type) {
            case Topic::$morphTag:
                Topic::findOrFail($request->subscription_id);
                break;
            case Vote::$morphTag:
                Vote::getSluggableModel($request->subscription_id);
                break;
            default:
                return $this->setStatusCode(400)->respond();
        }

        $subscribe = Auth::user()
            ->subscriptions()
            ->updateOrCreate($request->all(), $request->all());

        return $this->setStatusCode(201)->respond($subscribe);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $id)
    {
        if ($userId != Auth::user()->id) {
            return $this->setStatusCode(403)->respond();
        }
        $user = Auth::user();
        $subscribe = $user->subscriptions()->find($id);
        if (!$subscribe) {
            throw (new ModelNotFoundException)->setModel(Subscription::class);
        }
        $subscribe->delete();
        return $this->setStatusCode(204)->respond();
    }
}
