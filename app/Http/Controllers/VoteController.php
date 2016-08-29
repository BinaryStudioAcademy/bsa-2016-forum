<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;
use App\Http\Requests\VoteResultRequest;
use App\Models\VoteResult;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Carbon\Carbon;
use App\Facades\TagService;

class VoteController extends ApiController
{
    protected $searchStr = null;
    protected $tagIds = [];

    /**
     * @param $votes array
     * @return array $data array
     */
    private function getMetaData($votes)
    {
        $data = [];
        $i = 0;

        foreach ($votes as $vote) {

            //find the difference between two days
            $created = new Carbon($vote->created_at);
            $now = Carbon::now();
            $difference = ($created->diff($now)->days < 1)
                ? 'today'
                : $created->diffForHumans($now);

            if ($vote->is_saved) {
                $data[$i]['data'] = $vote;
                $data[$i]['_meta']['user'] = $vote->user()->first();
                $data[$i]['_meta']['likes'] = $vote->likes()->count();
                $data[$i]['_meta']['tags'] = $vote->tags()->count();
                $data[$i]['_meta']['comments'] = $vote->comments()->count();
                $data[$i]['_meta']['days_ago'] = $difference;
                $data[$i]['_meta']['tags'] = $vote->tags()->get();
                $i++;
            }
        }
        return $data;
    }

    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $vote = new Vote();
        if (!(Auth::user()->allowed('view.votes', $vote))) {
            throw new PermissionDeniedException('index');
        }

        $this->setFiltersParameters($request);

        $votes = Vote::filterByQuery($this->searchStr)->filterByTags($this->tagIds)->get();
        $data = $this->getMetaData($votes);
        return $this->setStatusCode(200)->respond($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param VotesRequest|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(VotesRequest $request)
    {
        $vote = new Vote();
        if (!(Auth::user()->allowed('create.votes', $vote))) {
            throw new PermissionDeniedException('create');
        }

        $vote = Vote::create($request->all());
        if ($request->tags) {
            TagService::TagsHandler($vote, $request->tags);
        }
        $vote->tags = $vote->tags()->get();
        return $this->setStatusCode(201)->respond($vote);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $vote = Vote::findOrFail($id);

        if (!(Auth::user()->allowed('view.votes', $vote))) {
            throw new PermissionDeniedException('view');
        }

        $user = $vote->user()->first();
        $likeCount = $vote->likes()->count();
        $tagCount = $vote->tags()->count();
        $commentCount = $vote->comments()->count();

        return $this->setStatusCode(200)->respond($vote, [
            'user' => $user,
            'likes' => $likeCount,
            'tags' => $tagCount,
            'comments' => $commentCount
        ]);
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
        $vote = Vote::findOrfail($id);
        if ($request->tags) {
            TagService::TagsHandler($vote, $request->tags);
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

        $data=$this->getMetaData($votes);

        return $this->setStatusCode(200)->respond($data, ['user' => $user]);
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

    //set filter's parameters from request
    protected function setFiltersParameters(Request $request)
    {
        $this->searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $this->tagIds = ($tagIds) ? explode(',', $tagIds) : [];
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
}