<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;
use App\Http\Requests\VoteResultRequest;
use App\Models\VoteItem;
use App\Models\VoteResult;
use App\Models\VoteUniqueView;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Carbon\Carbon;
use App\Facades\TagService;
use Illuminate\Support\Facades\Auth;

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

        if ($request->page) {
            $paginationObject = Vote::filterByQuery($this->searchStr)
                ->newOnTop()
                ->checkOnIsSaved()
                ->filterByTags($this->tagIds)
                ->paginate(15);
            $votes = $paginationObject->getCollection();
            $meta = $this->getMetaDataForCollection($votes);
            $meta['hasMorePages'] = $paginationObject->hasMorePages();
        } else {
            $votes = Vote::filterByQuery($this->searchStr)
                ->filterByTags($this->tagIds)->get();
            $meta = $this->getMetaDataForCollection($votes);
        }

        return $this->setStatusCode(200)->respond($votes, $meta);
    }

    /**
     * @param Request $request
     */
    protected function setFiltersParameters(Request $request)
    {
        $this->searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $this->tagIds = ($tagIds) ? explode(',', $tagIds) : [];
    }

    /**
     * @param Collection $votes
     * @return array
     */
    private function getMetaDataForCollection(Collection $votes)
    {
        $data = [];

        foreach ($votes as $vote) {

            $data += $this->getMetaDataForModel($vote);
        }

        return $data;
    }

    private function getMetaDataForModel(Vote $vote)
    {
        $data = [];
        $usersWhoSaw = [];
        foreach ($vote->voteUniqueViews()->get()->load('user') as $view) {
            $usersWhoSaw[] = $view->user;
        }
        //find the difference between two days
        $created = new Carbon($vote->created_at);
        $now = Carbon::now();
        $difference = ($created->diff($now)->days < 1)
            ? 'today'
            : $created->diffForHumans($now);

        $data[$vote->id] =
            [
                'user' => $vote->user()->first(),
                'likes' => $vote->likes()->count(),
                'comments' => $vote->comments()->count(),
                'tags' => $vote->tags()->get(),
                'subscription' => $vote->subscription(Auth::user()->id),
                'days_ago' => $difference,
                'numberOfUniqueViews' => $vote->voteUniqueViews()->count(),
                'usersWhoSaw' => $usersWhoSaw
            ];

        if (!$vote->is_saved && $vote->canBeEdited()) {
            $data[$vote->id]['status'] = ' (Not saved)';
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
            $vote->votePermissions()->delete();
        } elseif ($request->users) {
            $this->VotePermissionsHandler($vote, $request->users);
        }

        return $this->setStatusCode(201)->respond($vote);
    }

    /**
     * @param $vote
     * @param $users
     * @return \Illuminate\Http\JsonResponse
     */
    protected function VotePermissionsHandler($vote, $users)
    {
        $users = json_decode($users);

        $vote->votePermissions()->whereNotIn('user_id', $users)->delete();

        $permissions = $vote->votePermissions()->get();

        foreach ($users as $user_id) {
            if (!$permissions->contains('user_id', $user_id)) {
                $vote->votePermissions()->create(['user_id' => $user_id]);
            }
        }
    }

    /**
     * @param $vote
     * @return bool
     */
    protected function isUniqueViewExist($vote)
    {
        return !!VoteUniqueView::where(['vote_id' => $vote->id, 'user_id' => Auth::user()->id])->first();
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $vote = Vote::findOrFail($id);
        if (Auth::user()->id &&
            !$this->isUniqueViewExist($vote)
        ) {
            $voteUniqueView = VoteUniqueView::create(['vote_id' => $vote->id, 'user_id' => Auth::user()->id]);
            $voteUniqueView->save();
        }

        $meta = $this->getMetaDataForModel($vote);

        return $this->setStatusCode(200)->respond($vote, $meta);
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
        } elseif ($request->users) {
            $this->VotePermissionsHandler($vote, $request->users);
        }

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
            ->newOnTop()
            ->filterByQuery($this->searchStr)
            ->filterByTags($this->tagIds)
            ->get();

        if (!$votes) {
            return $this->setStatusCode(200)->respond();
        }

        $data = $this->getMetaDataForCollection($votes);

        return $this->setStatusCode(200)->respond($votes, $data);
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
    public function getUserVoteResult(Vote $vote)
    {
        $user = Auth::user();
        $voteItems = $vote->voteItems()->get();
        if (!$voteItems) {
            throw (new ModelNotFoundException)->setModel(VoteItem::class);
        }
        $meta['checked'] = [];
        $userVoteResults = $vote->voteResults()->where('user_id', $user->id)->get();
        foreach ($userVoteResults as $res) {
            $temp = $voteItems->where('id', $res->vote_item_id);
            foreach ($temp as $item) {
                $item->checked = 1;
            }
        }
        $meta['vote'] = $vote;
        return $this->setStatusCode(200)->respond($voteItems, $meta);

    }

    /**
     * Display the specific vote all results
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUserVoteResult($id, VoteResultRequest $request) {
        $model = null;
        $vote = Vote::findOrFail($request->vote_id);
        $user = Auth::user();
        $voteItem = VoteItem::findOrFail($request->vote_item_id);
        $response = ['checked' => true];
        if ($vote->is_single) {
            $results = $vote->voteResults()->where('user_id', $user->id)->get();
            if(count($results) > 1) {
                $vote->voteResults()->where('user_id', $user->id)->delete();
            }
            if (count($results) == 1) {
                $model = $results->first();
                $model->voteItem()->associate($voteItem);
                $model->save();
            } elseif (count($results) == 0) {
                $model = new VoteResult();
                $model->user()->associate($user);
                $model->vote()->associate($vote);
                $model->vote_item_id = $request->vote_item_id;
                $model->save();
            }
        } else {
            $model = $vote->voteResults()->where('user_id', $user->id)->where('vote_item_id',
                $request->vote_item_id)->first();
            if (!$model && ($request->vote_item_value == 1)) {
                $model = new VoteResult();
                $model->user()->associate($user);
                $model->vote()->associate($vote);
                $model->vote_item_id = $request->vote_item_id;
                $model->save();
            } elseif ($model && ($request->vote_item_value == 0)) {
                $model->delete();
                $response['checked'] = false;
            }
        }
        return $this->setStatusCode(201)->respond($response);
    }
}