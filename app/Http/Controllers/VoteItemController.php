<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteItemRequest;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteItem;
use Auth;
use DCN\RBAC\Exceptions\PermissionDeniedException;
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
     * @throws PermissionDeniedException
     */
    public function store($voteId, VoteItemRequest $request)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = new VoteItem($request->all());
        $user = User::findOrFail($request->user_id);

        if (!$user->allowed('create.voteitems', $voteItem)) {
            throw (new PermissionDeniedException('voteitems'));
        }
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
     * @throws PermissionDeniedException
     */
    public function show($voteId, $id)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        if (!Auth::user()->allowed('view.voteitems', $voteItem)) {
            throw (new PermissionDeniedException('voteitems'));
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
     * @throws PermissionDeniedException
     */
    public function update($voteId, VoteItemRequest $request, $id)
    {

        $vote = Vote::findOrFail($voteId);
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        if (!Auth::user()->allowed('update.voteitems', $voteItem)) {
            throw (new PermissionDeniedException('voteitems'));
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
     * @throws PermissionDeniedException
     */
    public function destroy($voteId, $id)
    {
        $vote = Vote::findOrFail($voteId);
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        if (!Auth::user()->allowed('delete.voteitems', $voteItem)) {
            throw (new PermissionDeniedException('voteitems'));
        }
        $voteItem->delete();
        return $this->setStatusCode(204)->respond();
    }
}
