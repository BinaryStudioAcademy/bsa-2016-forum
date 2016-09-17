<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteItemRequest;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteItem;
use Auth;
use Illuminate\Contracts\Validation\UnauthorizedException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Requests;

class VoteItemController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($vote)
    {
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
    public function store($vote, VoteItemRequest $request)
    {
        $voteItem = new VoteItem($request->all());
        $user = User::findOrFail($request->user_id);

        $voteItem->user()->associate($user);
        $voteItem->vote()->associate($vote);
        $voteItem->save();

        return $this->setStatusCode(201)->respond($voteItem->fresh());
    }

    /**
     * Display the specified resource.
     *
     * @param $voteId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($vote, $id)
    {
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
    public function update($vote, VoteItemRequest $request, $id)
    {

        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }

        $this->authorize('update', $voteItem);

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
    public function destroy($vote, $id)
    {
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }

        $this->authorize('delete', $voteItem);

        $voteItem->delete();
        return $this->setStatusCode(204)->respond();
    }
}
