<?php
namespace App\Http\Controllers;
use App\Models\Vote;
use App\Models\User;
use App\Http\Requests\VotesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Exceptions\PermissionDeniedException;
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
        $data =[];
        $i = 0;

        foreach ($votes as $vote) {

            if ($vote->is_saved) {
                $data[$i]['data'] = $vote;
                $data[$i]['_meta']['user'] = $vote->user()->first();
                $data[$i]['_meta']['likes'] = $vote->likes()->count();
                $data[$i]['_meta']['tags'] = $vote->tags()->count();
                $data[$i]['_meta']['comments'] = $vote->comments()->count();
                $i++;
            }
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
        $vote = new Vote();
        $userAuth = Auth::user();
        if (!($userAuth->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('index');

        $votes = Vote::all();
        $data = $this->getMetaData($votes);
        return $this->setStatusCode(200)->respond($data);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(VotesRequest $request)
    {
        $vote = new Vote();
        $userAuth = Auth::user();
        if (!($userAuth->allowed('create.votes', $vote)))
            throw new PermissionDeniedException('create');

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
        $userAuth = Auth::user();

        if (!($userAuth->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('view');

        $user = $vote->user()->first();
        $likeCount = $vote->likes()->count();
        $tagCount = $vote->tags()->count();
        $commentCount = $vote->comments()->count();

        return $this->setStatusCode(200)->respond($vote, ['user' => $user,
            'likes' => $likeCount,
            'tags' => $tagCount,
            'comments' => $commentCount]);
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
        $userAuth = Auth::user();

        if (!($userAuth->allowed('update.votes', $vote)))
            throw new PermissionDeniedException('update');

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
        $userAuth = Auth::user();

        if (!($userAuth->allowed('delete.votes', $vote)))
            throw new PermissionDeniedException('delete');

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

        $vote = $votes[0];
        $userAuth = Auth::user();
        if (!($userAuth->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('index');

        if(!$votes){
            return $this->setStatusCode(200)->respond();
        }
        return $this->setStatusCode(200)->respond($votes, ['user' => $user]);
    }

    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->getVote($voteId);

        $userAuth = Auth::user();
        if (!($userAuth->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('view');

        if(!$vote){
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }
        return $this->setStatusCode(200)->respond($vote, ['user' => $user]);
    }
}