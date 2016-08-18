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

    protected $searchStr = null;
    protected $tagIds = [];

    #TODO: Delete this after the authorization implement
    public function __construct()
    {

        $users = User::all();
        Auth::login($users[1]);
    }

    /**
     * @param $votes array
     * @return array $data array
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
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function index(Request $request)
    {
        $vote = new Vote();
        if (!(Auth::user()->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('index');

        $this->setFiltersParameters($request);

        $votes = Vote::filterByQuery($this->searchStr)->filterByTags($this->tagIds)->get();
        $meta = $this->getMetaData($votes);
        return $this->setStatusCode(200)->respond($votes, $meta);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param VotesRequest|Request $request
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function store(VotesRequest $request)
    {
        $vote = new Vote();
        if (!(Auth::user()->allowed('create.votes', $vote)))
            throw new PermissionDeniedException('create');

        $vote = Vote::create($request->all());
        return $this->setStatusCode(201)->respond($vote);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function show($id)
    {
        $vote = Vote::findOrFail($id);

        if (!(Auth::user()->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('view');

        $user = $vote->user()->first();
        $likeCount = $vote->likes()->count();
        $commentCount = $vote->comments()->count();

        return $this->setStatusCode(200)->respond($vote,
            [
                'user' => [$vote->id => $user],
                'likes' => [$vote->id => $likeCount],
                'comments' => [$vote->id => $commentCount]
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param VotesRequest|Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function update(VotesRequest $request, $id)
    {
        $vote = Vote::findOrFail($id);

        if (!(Auth::user()->allowed('update.votes', $vote)))
            throw new PermissionDeniedException('update');

        $vote->update($request->all());
        return $this->setStatusCode(200)->respond($vote);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function destroy($id)
    {
        $vote = Vote::findOrFail($id);

        if (!(Auth::user()->allowed('delete.votes', $vote)))
            throw new PermissionDeniedException('delete');

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
     * @throws PermissionDeniedException
     */
    public function getUserVotes($userId, Request $request)
    {
        $user = User::findOrFail($userId);

        $vote = new Vote();
        if (!(Auth::user()->allowed('view.votes', $vote))) {
            throw new PermissionDeniedException('index');
        }

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
     * @throws PermissionDeniedException
     */
    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->getVote($voteId);

        if (!$vote) {
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }

        if (!(Auth::user()->allowed('view.votes', $vote))) {
            throw new PermissionDeniedException('view');
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
}