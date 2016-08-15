<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\Access\AuthorizationException;

use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;

class VoteController extends ApiController implements HasRoleAndPermissionContract
{
    use HasRoleAndPermission;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $votes = Vote::all();
        return $this->setStatusCode(200)->respond($votes);
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

        return $this->setStatusCode(200)->respond($vote);
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
        return $this->setStatusCode(204)->respond();
    }

    public function getUserVotes($userId)
    {
        $user = User::findOrFail($userId);
        $votes = $user->votes()->get();
        if(!$votes){
            return $this->setStatusCode(200)->respond();
        }
        return $this->setStatusCode(200)->respond($votes, ['user' => $user]);
    }
    
    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->votes()->where('id',$voteId)->first();
        if(!$vote){
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }

        if (!($user->allowed('view.votes', $vote))){
            throw (new AuthorizationException);
        }

        return $this->setStatusCode(200)->respond($vote, ['user' => $user]);

    }
}
