<?php

namespace App\Http\Controllers;

use App\Http\Requests\VotePermissionRequest;
use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;
use App\Http\Requests\VoteResultRequest;
use App\Models\VotePermission;
use App\Models\VoteResult;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Facades\TagService;

class VoteController extends ApiController
{
    protected $searchStr = null;
    protected $tagIds = [];

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $this->setFiltersParameters($request);
        $votes = Vote::filterByQuery($this->searchStr)->filterByTags($this->tagIds)->orderBy('id', 'desc')->get();
        $meta = $this->getMetaData($votes);
        return $this->setStatusCode(200)->respond($votes, $meta);
    }

    protected function setFiltersParameters(Request $request)
    {
        $this->searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $this->tagIds = ($tagIds) ? explode(',', $tagIds) : [];
    }

    /**
     * @param $votes array
     * @return array $data array
     */
    private function getMetaData($votes)
    {
        $data = [];

        foreach ($votes as $vote) {

            $data[$vote->id] =
                [
                    'user' => $vote->user()->first(),
                    'likes' => $vote->likes()->count(),
                    'comments' => $vote->comments()->count(),
                    'tags' => $vote->tags()->get(['name'])
                ];
        }
        return $data;
    }


    /**
     * @param VotesRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(VotesRequest $request)
    {
        $vote = Vote::create($request->all());
        if ($request->tags) {
            TagService::TagsHandler($vote, $request->tags);
        }
        if ($vote->is_public) {
            $vote->votePermissions()->forceDelete();
        }
        $vote->tags = $vote->tags()->get();
        return $this->setStatusCode(201)->respond($vote);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $vote = Vote::findOrFail($id);

        $user = $vote->user()->first();
        $likeCount = $vote->likes()->count();
        $commentCount = $vote->comments()->count();
        $tags = $vote->tags()->get(['name']);

        return $this->setStatusCode(200)->respond($vote, [
                $vote->id => [
                    'user' => $user,
                    'likes' => $likeCount,
                    'comments' => $commentCount,
                    'tags' => $tags
                ]
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param VotesRequest|Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function update(VotesRequest $request, $id)
    {
        $vote = Vote::findOrFail($id);

        $this->authorize('update', $vote);

        $vote->update($request->all());
        $vote->save();
        if ($request->tags) {
            TagService::TagsHandler($vote, $request->tags);
        }
        if ($vote->is_public) {
            $vote->votePermissions()->forceDelete();
        }
        $vote->tags = $vote->tags()->get();
        return $this->setStatusCode(200)->respond($vote);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function destroy($id)
    {
        $vote = Vote::findOrFail($id);

        $this->authorize('delete', $vote);

        $vote->delete();

        if ($vote->trashed()) {
            return $this->setStatusCode(204)->respond();
        } else {
            throw new \PDOException();
        }
    }

    /**
     * Display a listing of all votes created by user
     * @param $userId
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserVotes($userId, Request $request)
    {
        $user = User::findOrFail($userId);

        $this->setFiltersParameters($request);
        $votes = $user->votes()
            ->getQuery()
            ->filterByQuery($this->searchStr)
            ->filterByTags($this->tagIds)
            ->get();

        if (!$votes) {
            return $this->setStatusCode(200)->respond();
        }

        return $this->setStatusCode(200)->respond($votes, ['user' => $user]);
    }

    /**
     * Display the specific vote created by specific user
     * @param $userId
     * @param $voteId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->getVote($voteId);

        if (!$vote) {
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }

        return $this->setStatusCode(200)->respond($vote, ['user' => $user]);
    }

    /**
     * Display the specific vote all results
     * @param $voteId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserVoteResult($voteId)
    {
        $vote = Vote::findOrFail($voteId);
        $voteResults = $vote->voteResults()->get();

        if (!$voteResults) {
            throw (new ModelNotFoundException)->setModel(VoteResult::class);
        }

        return $this->setStatusCode(200)->respond($voteResults, ['vote' => $vote]);
    }

    /**
     * Display the specific vote all results
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUserVoteResult(VoteResultRequest $request)
    {
        $voteresult = VoteResult::create($request->all());
        return $this->setStatusCode(201)->respond($voteresult);
    }

    /**
     * @param Vote $vote
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllVoteAccessedUsers(Vote $vote)
    {
        $users = [];
        $vote->votePermissions()->get()->each(function ($permission) use ($users) {
            $users[] = $permission->user()->first();
        });

        return $this->setStatusCode(200)->respond($users);
    }

    public function storeVoteAccessedPermission(Vote $vote, VotePermissionRequest $request)
    {
        $users = $request->users;
        $vote->votePermissions()->whereNotIn('user_id', $users)->forceDelete();

        $permissions = $vote->votePermissions()->get();

        foreach($users as $user_id) {
            if($permissions->where('user_id', $user_id)->first() === null){
                $vote->votePermissions()->create(['user_id' => $user_id]);
            }
        }

        return $this->setStatusCode(200)->respond($vote->votePermissions()->count());
    }
}