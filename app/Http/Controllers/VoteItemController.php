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
    /**
     * @api {get} /votes/:id/voteitems Index voteItems belongs to specific vote(IdeaHub)
     * @apiName Index VoteItems
     * @apiGroup VoteItems
     *
     * @apiDescription Returns the list of the voteItems for specific vote(IdeaHub).
     *
     * @apiParam {Number} id Votes unique ID
     *
     * @apiSuccess {Json} List List of the VoteItems like [{key:value,}, {key:value,}]
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
        "data": [
            {
            "id": 8,
            "vote_id": 8,
            "name": "Rerum qui repudiandae iste blanditiis.",
            "user_id": 10,
            "created_at": "2016-08-17 07:54:48",
            "updated_at": "2016-08-17 07:54:48"
            },
            {
            "id": 29,
            "vote_id": 8,
            "name": "Eos in sunt earum.",
            "user_id": 6,
            "created_at": "2016-08-17 07:54:51",
            "updated_at": "2016-08-17 07:54:51"
            }
        ],
        "_meta": {
            "vote": {
                "id": 8,
                "user_id": 7,
                "title": "qui",
                "finished_at": "2016-08-23 07:08:33",
                "is_single": 1,
                "is_public": 1,
                "created_at": "2016-08-17 07:54:34",
                "updated_at": "2016-08-17 07:54:34",
                "is_saved": 1
            }
        }
        }
     *
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found
     *
     * @apiErrorExample Error-Response:
     *     Vote not found
     */
    /**
     *
     * @param $voteId
     * @return \Illuminate\Http\JsonResponse
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
    /**
     * @api {post} /votes/:id/voteitems  Create new voteitem
     * @apiName Create VoteItem
     * @apiGroup VoteItems
     *
     * @apiDescription Creates a new voteitem belongs to specific vote(IdeaHub).
     *
     * @apiParam {Number} ID Vote ID
     *
     * @apiSuccess {Json} VoteItem the VoteItem like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     * {
        "data": {
            "id": 8,
            "vote_id": 8,
            "name": "Rerum qui repudiandae iste blanditiis.",
            "user_id": 10,
            "created_at": "2016-08-17 07:54:48",
            "updated_at": "2016-08-17 07:54:48"
            }
        }
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:
     *   You don't have a required ['voteitems'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found
     *
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
    /**
     * @api {get} /votes/:id/voteitems/:id  View specific VoteItem
     * @apiName View VoteItem
     * @apiGroup VoteItems
     *
     * @apiDescription Returns the unique VoteItem belongs to specific vote.
     *
     * @apiParam {Number} ID Vote ID
     * @apiParam {Number} ID VoteItem ID
     *
     * @apiSuccess {Json} VoteItem the VoteItem like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
        "data": {
            "id": 8,
            "vote_id": 8,
            "name": "Rerum qui repudiandae iste blanditiis.",
            "user_id": 10,
            "created_at": "2016-08-17 07:54:48",
            "updated_at": "2016-08-17 07:54:48"
        },
        "_meta": {
            "vote": {
                "id": 8,
                "user_id": 7,
                "title": "qui",
                "finished_at": "2016-08-23 07:08:33",
                "is_single": 1,
                "is_public": 1,
                "created_at": "2016-08-17 07:54:34",
                "updated_at": "2016-08-17 07:54:34",
                "is_saved": 1
            },
            "user": {
                "id": 10,
                "first_name": "Ephraim",
                "last_name": "Ziemann",
                "display_name": "stephanie30",
                "email": "lelia.murray@example.net",
                "reputation": 228,
                "status_id": 2,
                "last_visit_at": "2015-11-09 20:25:28",
                "created_at": "2016-08-17 07:54:19",
                "updated_at": "2016-08-17 07:54:19"
            }
            }
        }
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:
     *   You don't have a required ['voteitems'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found
     *
     * @apiError ModelNotFoundException <code>404</code> VoteItem not found
     * @apiErrorExample Error-Response:
     *   VoteItem not found
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
    /**
     * @api {put} /votes/:id/voteitems/:id  Update specific voteitem
     * @apiName Update VoteItem
     * @apiGroup VoteItems
     *
     * @apiDescription Updates the unique VoteItem according users permissions.
     * Administrator or owner can update VoteItem.
     *
     * @apiParam {Number} ID Vote ID
     * @apiParam {Number} ID VoteItem ID
     *
     * @apiSuccess {Json} List List of the VoteItems like [{key:value,}]
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
     *  "data": {
            "id": 8,
            "vote_id": 8,
            "name": "Rerum qui repudiandae iste blanditiis.",
            "user_id": 10,
            "created_at": "2016-08-17 07:54:48",
            "updated_at": "2016-08-17 07:54:48"
        },
        "_meta": {
            "vote": {
                "id": 8,
                "user_id": 7,
                "title": "qui",
                "finished_at": "2016-08-23 07:08:33",
                "is_single": 1,
                "is_public": 1,
                "created_at": "2016-08-17 07:54:34",
                "updated_at": "2016-08-17 07:54:34",
                "is_saved": 1
            }
     * }
     *
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:

     *   You don't have a required ['voteitems'] permission.
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found
     *
     * @apiError ModelNotFoundException <code>404</code> VoteItem not found
     * @apiErrorExample Error-Response:
     *   VoteItem not found
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
    /**
     * @api {delete} /votes/:id/voteitems/:id  Delete specific voteItem
     * @apiName Delete voteItem
     * @apiGroup VoteItems
     *
     * @apiDescription Deletes the unique id voteItem according users permissions.
     * Only Administrator or owner can delete voteItem.
     *
     * @apiParam {Number} ID Vote ID
     * @apiParam {Number} ID VoteItem ID
     *
     * @apiSuccess (Success 204 No content) Empty
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No content
     *
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:

     *   You don't have a required ['voteitems'] permission.
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found
     *
     * @apiError ModelNotFoundException <code>404</code> VoteItem not found
     * @apiErrorExample Error-Response:
     *   VoteItem not found
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
