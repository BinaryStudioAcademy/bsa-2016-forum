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
use Illuminate\Support\Collection;
use App\Repositories\UserStore;

class VoteItemController extends ApiController
{

    /**
     * @param Collection $votes
     * @return array
     */
    private function getMetaDataForCollection(Collection $items)
    {
        $data = [];

        foreach ($items as $item) {

            $data += $this->getMetaDataForModel($item);
        }

        return $data;
    }


    private function getMetaDataForModel(VoteItem $item)
    {
        $data = [];
        $data[$item->id] = [
            'comments' => $item->comments()->count(),
            'results' => $item->voteResults()->count(),
        ];
        return $data;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Vote $vote)
    {
        $voteItems = $vote->voteItems()->get();
        if (!$voteItems) {
            $this->setStatusCode(200)->respond();
        }

        return $this->setStatusCode(200)->respond($voteItems, $this->getMetaDataForCollection($voteItems));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param $voteId
     * @param VoteItemRequest|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Vote $vote, VoteItemRequest $request)
    {
        $voteItem = new VoteItem($request->all());
        $user = User::findOrFail($request->user_id);

        $voteItem->user()->associate($user);
        $voteItem->vote()->associate($vote);
        $voteItem->save();

        return $this->setStatusCode(201)->respond($voteItem->fresh(), $this->getMetaDataForModel($voteItem));
    }

    /**
     * Display the specified resource.
     *
     * @param $voteId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Vote $vote, $id)
    {
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }

        $user = $voteItem->user()->first();
        return $this->setStatusCode(200)->respond($voteItem, $this->getMetaDataForModel($voteItem));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param $voteId
     * @param VoteItemRequest|\Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Vote $vote, VoteItemRequest $request, $id)
    {
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }

        $this->authorize('update', $voteItem);

        $voteItem->update($request->all());
        return $this->setStatusCode(200)->respond($voteItem, $this->getMetaDataForModel($voteItem));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $voteId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vote $vote, $id)
    {
        $voteItem = $vote->voteItems()->where('id', $id)->first();
        if (!$voteItem) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }

        if($vote->voteItems()->count() <= 2) {
            return response(['name' => 'You can not delete this vote item because this is one of only two saved vote items'], 400);
        }

        $this->authorize('delete', $voteItem);

        $voteItem->delete();
        return $this->setStatusCode(204)->respond();
    }
}
