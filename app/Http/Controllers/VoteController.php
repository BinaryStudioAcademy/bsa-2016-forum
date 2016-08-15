<?php
namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;
use Illuminate\Http\Request;


class VoteController extends ApiController implements HasRoleAndPermissionContract
{
    use HasRoleAndPermission;

    /**
     * Display a listing of the resource.
     *
     * @param VotesRequest $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $tagIdsArray = ($tagIds) ? explode(',', $tagIds) : [];

        $votes = (new Vote)->newQuery();

        $votes = $this->filterByQuery($votes, $searchStr);
        $votes = $this->filterByTags($votes, $tagIdsArray);
        $votes = $votes->get();

        return $this->setStatusCode(200)->respond($votes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param VotesRequest|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(VotesRequest $request)
    {
        $vote = Vote::create($request->all());
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
        return $this->setStatusCode(200)->respond($vote);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param VotesRequest|\Illuminate\Http\VotesRequest $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(VotesRequest $request, $id)
    {
        $vote = Vote::findOrFail($id);
        $vote->update($request->all());
        return $this->setStatusCode(200)->respond($vote);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vote = Vote::findOrFail($id);
        $vote->delete();
        return $this->setStatusCode(204)->respond();
    }

    public function getUserVotes($userId, VotesRequest $request)
    {
        $user = User::findOrFail($userId);

        $searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $tagIdsArray = ($tagIds) ? explode(',', $tagIds) : [];

        $votes = $user->votes()->getQuery();

        $votes = $this->filterByQuery($votes, $searchStr);
        $votes = $this->filterByTags($votes, $tagIdsArray);
        $votes = $votes->get();

        if (!$votes) {
            return $this->setStatusCode(200)->respond();
        }
        return $this->setStatusCode(200)->respond($votes, ['user' => $user]);
    }

    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->votes()->where('id', $voteId)->first();

        if (!$vote) {
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }
        return $this->setStatusCode(200)->respond($vote, ['user' => $user]);
    }

    /**
     * Return Builder object with filter by tags
     *
     * @param Builder $query
     * @param array $tagIds
     * @return Builder
     */
    protected function filterByTags(Builder $query, array $tagIds)
    {
        if (!empty($tagIds)) {
            $query = $query->whereHas('tags', function ($q) use ($tagIds) {
                $q->whereIn('tag_id', $tagIds);
            });
        }

        return $query;
    }

    /**
     * Return Builder object with filter by the vote's title
     *
     * @param Builder $query
     * @param string|null $searchStr
     * @return Builder
     */
    protected function filterByQuery(Builder $query, $searchStr)
    {
        if ($searchStr) {
            $query = $query->where('title', 'LIKE', '%' . $searchStr . '%');
        }

        return $query;
    }
}


