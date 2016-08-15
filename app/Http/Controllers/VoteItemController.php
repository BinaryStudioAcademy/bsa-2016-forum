<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteItemRequest;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteItem;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Requests;

class VoteItemController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($voteId)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItems = $vote->voteItems()->get();
        if (!$voteItems) {
            $this->setStatusCode(200)->respond();
        }

        return $this->setStatusCode(200)->respond($voteItems, ['vote' => $vote]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param $voteId
     * @param VoteItemRequest|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store($voteId, VoteItemRequest $request)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = new VoteItem($request->all());
//        $u = User::findOrFail($request->user_id);      // uncomment to test when there is no user login in
//        Auth::login($u);
        $user = \Auth::user();
        if ($user->id != $request->user_id) {
            throw (new ModelNotFoundException)->setModel(User::class);
        }

        $voteItem->user()->associate($user);
        $voteItem->vote()->associate($vote);
        $voteItem->save();

        return $this->setStatusCode(201)->respond($voteItem);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($voteId, $id)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        $user = $voteItem->user()->first();
        return $this->setStatusCode(200)->respond($voteItem, ['vote' => $vote, 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $voteId
     * @param VoteItemRequest|\Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($voteId, VoteItemRequest $request, $id)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = $vote->voteItems()->where('id', $id)->get();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        $voteItem->update($request->all());
        return $this->setStatusCode(200)->respond($voteItem, ['vote' => $vote]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $voteId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($voteId, $id)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = $vote->voteItems()->where('id', $id)->get();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        $vote->delete();
        return $this->setStatusCode(204)->respond();
    }
}
