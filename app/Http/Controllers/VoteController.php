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
    
    /**
     * @param $votes array
     * @return array $data array
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
 * @param Request $request
 * @return \Illuminate\Http\Response
 * @throws PermissionDeniedException
 */
    /**
     * @api {get} /votes Index vote (IdeaHub)
     * @apiName Index Votes
     * @apiGroup Votes
     *
     * @apiDescription Returns the list of the votes (IdeaHubs).
     *
     * @apiParam No
     *
     * @apiSuccess {Json} List  of the Votes like {key:value,}, {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
    {
    "data": [
    {
    "data": {
    "id": 7,
    "user_id": 9,
    "title": "cupiditate",
    "finished_at": "2016-08-26 07:08:33",
    "is_single": 1,
    "is_public": 1,
    "created_at": "2016-08-17 07:54:33",
    "updated_at": "2016-08-17 07:54:33",
    "is_saved": 1
    },
    "_meta": {
    "user": {
    "id": 9,
    "first_name": "Horace",
    "last_name": "Muller",
    "display_name": "tcarter",
    "email": "leannon.genoveva@example.org",
    "reputation": 255,
    "status_id": 1,
    "last_visit_at": "2016-05-01 09:11:06",
    "created_at": "2016-08-17 07:54:19",
    "updated_at": "2016-08-17 07:54:19"
    },
    "likes": 1,
    "tags": 1,
    "comments": 1
    }
    },
    {
    "data": {
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
    "_meta": {
    "user": {
    "id": 7,
    "first_name": "Jamaal",
    "last_name": "Schimmel",
    "display_name": "damon.wintheiser",
    "email": "iohara@example.com",
    "reputation": 188,
    "status_id": 1,
    "last_visit_at": "2016-08-12 10:35:05",
    "created_at": "2016-08-17 07:54:19",
    "updated_at": "2016-08-17 07:54:19"
    },
    "likes": 1,
    "tags": 1,
    "comments": 1
    }
    }
    }
     *
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     * @apiErrorExample Error-Response:
     *   You don't have a required ['index'] permission.
     * @apiErrorExample Error-Response:
     *     Vote not found
     */
    public function index(Request $request)
    {
        $vote = new Vote();
        if (!(Auth::user()->allowed('view.votes', $vote)))
            throw new PermissionDeniedException('index');

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
     * @throws PermissionDeniedException
     */
    /**
     * @api {post} /votes/  Create new vote
     * @apiName Create Vote
     * @apiGroup Votes
     *
     * @apiDescription Creates a new vote (IdeaHub).
     *
     * @apiParam No
     *
     * @apiSuccess {Json} Vote the Vote like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     * {
        "data": {
            "id": 7,
            "user_id": 9,
            "title": "cupiditate",
            "finished_at": "2016-08-26 07:08:33",
            "is_single": 1,
            "is_public": 1,
            "created_at": "2016-08-17 07:54:33",
            "updated_at": "2016-08-17 07:54:33",
            "is_saved": 1
        }
    }
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:
     *   You don't have a required ['create'] permission.
     *
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
    /**
     * @api {get} /votes/:id View specific Vote
     * @apiName View Vote
     * @apiGroup Votes
     *
     * @apiDescription Returns the unique Vote (IdeaHub).
     *
     * @apiParam {Number} ID Vote ID
     *
     * @apiSuccess {Json} Vote the Vote like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
    "data": {
        "id": 7,
        "user_id": 9,
        "title": "cupiditate",
        "finished_at": "2016-08-26 07:08:33",
        "is_single": 1,
        "is_public": 1,
        "created_at": "2016-08-17 07:54:33",
        "updated_at": "2016-08-17 07:54:33",
        "is_saved": 1
    },
    "_meta": {
        "user": {
            "id": 9,
            "first_name": "Horace",
            "last_name": "Muller",
            "display_name": "tcarter",
            "email": "leannon.genoveva@example.org",
            "reputation": 255,
            "status_id": 1,
            "last_visit_at": "2016-05-01 09:11:06",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
        },
        "likes": 1,
        "tags": 1,
        "comments": 1
        }
        }
    }
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:
     *   You don't have a required ['view'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found

     */
    public function show($id)
    {
        $vote = Vote::findOrFail($id);

        if (!(Auth::user()->allowed('view.votes', $vote)))
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
     * @param VotesRequest|Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */

    /**
     * @api {put} /votes/:id  Update specific vote (IdeaHub).
     * @apiName Update Vote
     * @apiGroup Votes
     *
     * @apiDescription Updates the unique vote according users permissions.
     * Administrator or owner can update vote.
     *
     * @apiParam {Number} ID Vote ID
     *
     * @apiSuccess {Json} Vote  the Vote like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
        "data": {
            "id": 7,
            "user_id": 9,
            "title": "cupiditate",
            "finished_at": "2016-08-26 07:08:33",
            "is_single": 1,
            "is_public": 1,
            "created_at": "2016-08-17 07:54:33",
            "updated_at": "2016-08-17 07:54:33",
            "is_saved": 1
        }
     * }
     *
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     *
     * @apiErrorExample Error-Response:

     *   You don't have a required ['update'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found
     *
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
    /**
     * @api {delete} /votes/:id Delete specific vote
     * @apiName Delete vote
     * @apiGroup Votes
     *
     * @apiDescription Deletes the unique vote according users permissions.
     * Only Administrator or owner can delete vote.
     *
     * @apiParam {Number} ID Vote ID
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

     *   You don't have a required ['delete'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found

     * @apiErrorExample Error-Response:
     *   Vote not found

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

    /**
     * @api {get} /users/:id/votes Users votes (IdeaHubs)
     * @apiName Index Votes
     * @apiGroup Votes
     *
     * @apiDescription Returns the list of the votes belongs to user.
     *
     * @apiParam {Number} ID User ID
     * @apiParam {Number} ID Vote ID
     *
     * @apiSuccess {Json} List  of the Votes like {key:value,}, {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
    {

    "data":  {
        "id": 13,
        "user_id": 3,
        "title": "harum",
        "finished_at": "2016-08-24 07:08:33",
        "is_single": 1,
        "is_public": 1,
        "created_at": "2016-08-17 07:54:34",
        "updated_at": "2016-08-17 07:54:34",
        "is_saved": 0
        },
        {
        "id": 20,
        "user_id": 3,
        "title": "nihil",
        "finished_at": "2016-09-01 07:09:33",
        "is_single": 1,
        "is_public": 1,
        "created_at": "2016-08-17 07:54:34",
        "updated_at": "2016-08-17 07:54:34",
        "is_saved": 1
        }
    "_meta": {
        "user": {
            "id": 3,
            "first_name": "Horace",
            "last_name": "Muller",
            "display_name": "tcarter",
            "email": "leannon.genoveva@example.org",
            "reputation": 255,
            "status_id": 1,
            "last_visit_at": "2016-05-01 09:11:06",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
        }
    }
     *
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     * @apiErrorExample Error-Response:
     *   You don't have a required ['index'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     */
    public function getUserVotes($userId, Request $request)
    {
        $user = User::findOrFail($userId);

        $vote = new Vote();
        if (!(Auth::user()->allowed('view.votes', $vote))){
            throw new PermissionDeniedException('index');
        }

        $this->setFiltersParameters($request);
        $votes = $user->votes()
            ->getQuery()
            ->filterByQuery($this->searchStr)
            ->filterByTags($this->tagIds)
            ->get();

        if(!$votes){
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

    /**
     * @api {get} /users/:id/votes/:id Users vote (IdeaHub)
     * @apiName Users vote
     * @apiGroup Votes
     *
     * @apiDescription Returns the vote (IdeaHubs) belongs to user.
     *
     * @apiParam {Number} ID User ID
     * @apiParam {Number} ID Vote ID
     *
     * @apiSuccess {Json} Vote the Vote like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
    {
    "data": {
        "id": 7,
        "user_id": 9,
        "title": "cupiditate",
        "finished_at": "2016-08-26 07:08:33",
        "is_single": 1,
        "is_public": 1,
        "created_at": "2016-08-17 07:54:33",
        "updated_at": "2016-08-17 07:54:33",
        "is_saved": 1
    },
    "_meta": {
        "user": {
            "id": 7,
            "first_name": "Jamaal",
            "last_name": "Schimmel",
            "display_name": "damon.wintheiser",
            "email": "iohara@example.com",
            "reputation": 188,
            "status_id": 1,
            "last_visit_at": "2016-08-12 10:35:05",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
        }
    }

     *
     *
     * @apiError PermissionDeniedException <code>403</code> User needs to have permissions to action
     * @apiErrorExample Error-Response:
     *   You don't have a required ['view'] permission.
     *
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     * @apiError ModelNotFoundException <code>404</code> Vote not found
     * @apiErrorExample Error-Response:
     *     Vote not found
     */
    public function getUserVote($userId, $voteId)
    {
        $user = User::findOrFail($userId);
        $vote = $user->getVote($voteId);

        if(!$vote){
            throw (new ModelNotFoundException)->setModel(Vote::class);
        }

        if (!(Auth::user()->allowed('view.votes', $vote))){
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