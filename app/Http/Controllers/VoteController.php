<?php
namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\Access\AuthorizationException;
use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;


class VoteController extends ApiController implements HasRoleAndPermissionContract
{
    use HasRoleAndPermission;


    /**
     * @param $votes array
     * @return $data array
     */
    private function getMetaData($votes)
    {
        $data = [];

        foreach ($votes as $vote) {

            $data['user'][$vote->id] = $vote->user()->first();
            $data['likes'][$vote->id] = $vote->likes()->count();
            $data['comments'][$vote->id] = $vote->comments()->count();
        }
        return $data;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $votes = Vote::all();
        $meta = $this->getMetaData($votes);
        return $this->setStatusCode(200)->respond($votes, $meta);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
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

        $user = $vote->user()->first();
        $likeCount = $vote->likes()->count();
        $commentCount = $vote->comments()->count();

        return $this->setStatusCode(200)->respond($vote,
            ['user' => [$vote->id => $user],
            'likes' => [$vote->id => $likeCount],
            'comments' => [$vote->id => $commentCount]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
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

        if ($vote->trashed()) {
            return $this->setStatusCode(204)->respond();
        } else {
            throw new \PDOException();
        }

    }

    public function getUserVotes($userId)
    {
        $user = User::findOrFail($userId);
        $votes = $user->votes()->get();

        if (!$votes) {
            return $this->setStatusCode(200)->respond();
        }
        return $this->setStatusCode(200)->respond($votes, ['user' => $user]);
    }

    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->getVote($voteId);

        if (!$vote) {
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }
        return $this->setStatusCode(200)->respond($vote, ['user' => $user]);
    }
}
