<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Vote;
use App\Models\VoteItem;
use App\Http\Requests\CommentsRequest;
use App\Models\Topic;
use App\Http\Requests;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentController extends ApiController
{
    /**
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentHasAnyChild(Comment $comment)
    {
        if ($comment->comments()->get()) {
            return true;
        }
        return false;
    }

    /**
     * @param Comment $comment
     * @param Comment $commentChild
     * @return bool
     */
    protected function isCommentChildBelongsToComment(Comment $comment, Comment $commentChild)
    {
        if ($comment->comments()->find($commentChild->id)) {
            return true;
        } else {
            return false;
        }
    }

    /**********  TOPIC SECTION START **********/

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentBelongsToTopic(Topic $topic, Comment $comment)
    {
        $topicWhichHasThisComment = $comment->topics()->get()->first();

        return ($topicWhichHasThisComment && $topicWhichHasThisComment->id === $topic->id);
    }
    /**
    * @api {get} topics/:id/comments  List comments of the topic
    * @apiName Index topic-comments
    * @apiGroup Comments-Topic
    *
    * @apiDescription Returns the list of comments of the specific topic
    *
    * @apiParam {Number} id Topic ID
    *
    * @apiSuccess {Json} List List of the Topic comments
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    * "data": [
    * {
    * "id": 201,
    * "content_origin": "Voluptatem ut rerum sit vitae. Sunt vero eos aspernatur. Sed quia veniam ipsa incidunt.\nIpsam nulla quia consequuntur. Amet voluptates ex temporibus et enim. Accusamus quasi aliquid modi et.",
    * "rating": 737,
    * "user_id": 53,
    * "content_generated": "Occaecati et culpa est aut tenetur praesentium molestias. Sit doloremque ipsum tempora sed autem iusto porro. Aut est reprehenderit temporibus aspernatur. Dignissimos quos itaque enim assumenda.",
    * "created_at": "2016-08-18 20:03:46",
    * "updated_at": "2016-08-18 20:03:46",
    * "pivot": {
    * "commentable_id": 81,
    * "comment_id": 201
    *}
    *}
    *],
    *"_meta": []
    *}
    * @apiError 404   Topic not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    */

    /**
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComments(Topic $topic)
    {
        $comments = $topic->comments()->get();
        return $this->setStatusCode(200)->respond($comments);
    }
    /**
    * @api {get} topics/:id/comments/:id  Get the comment of the topic
    * @apiName View topic-comment
    * @apiGroup Comments-Topic
    *
    * @apiDescription Returns the specific comment of the specific topic
    *
    * @apiParam {Number} id Topic ID, Comment ID
    *
    * @apiSuccess {Json} Json Topic comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    * {
    * "data": {
    * "id": 201,
    * "content_origin": "Voluptatem ut rerum sit vitae. Sunt vero eos aspernatur. Sed quia veniam ipsa incidunt.\nIpsam nulla quia consequuntur. Amet voluptates ex temporibus et enim. Accusamus quasi aliquid modi et.",
    * "rating": 737,
    * "user_id": 53,
    * "content_generated": "Occaecati et culpa est aut tenetur praesentium molestias. Sit doloremque ipsum tempora sed autem iusto porro. Aut est reprehenderit temporibus aspernatur. Dignissimos quos itaque enim assumenda.",
    * "created_at": "2016-08-18 20:03:46",
    * "updated_at": "2016-08-18 20:03:46"
    * },
    * "_meta": []
    * }
    *
    * @apiError 404   Topic not found,  Comment not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComment(Topic $topic, Comment $comment)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            return $this->setStatusCode(200)->respond($comment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
    * @api {post} topics/:id/comments/ Add the comment to the topic
    * @apiName add topic-comments
    * @apiGroup Comments-Topic
    *
    * @apiDescription Add comment to specific topic.
    *
    * @apiParam {Number} id  Topic ID
    * @apiParam {Number} user_id  ID of user, who create comment
    * @apiParam {String} Text  Text of comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 OK
    *{
    *"data": {
    *"user_id": "52",
    *"content_origin": "taugHGSJAHGsjhGA",
    *"updated_at": "2016-08-18 21:40:28",
    *"created_at": "2016-08-18 21:40:28",
    *"id": 252
    *},
    *"_meta": []
    *}
    * 
    * @apiError 404   Topic not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *     {
    *      {
    *"content_origin": [
    *"Content is required"
    *],
    *"user_id": [
    *"User not is authorized"
    *]
    *}
    * }
    */

    /**
     * @param Topic $topic
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicComment(Topic $topic, CommentsRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $topic->comments()->save($comment);
        return $this->setStatusCode(201)->respond($comment);
    }

    /**
     * @api {put} topics/:id/comments/:id Update the comment of the topic
     * @apiName update topic-comment
     * @apiGroup Comments-Topic
     *
     * @apiDescription Update specific comment of specific topic.
     *
     * @apiParam {Number} id  Topic ID, Comment ID
     * @apiParam {Number} user_id  Id of user, who create comment
     * @apiParam {String} text  Text of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *{
     *"data": {
     *"user_id": "52",
     *"content_origin": "taugHGSJAHGsjhGA",
     *"updated_at": "2016-08-18 21:40:28",
     *"created_at": "2016-08-18 21:40:28",
     *"id": 252
     *},
     *"_meta": []
     *}
     *
     * @apiError 404   Topic not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     *
     * @apiError 400   Bad request
     *
     * @apiErrorExample Error-Response 400:
     *     HTTP/1.1 400 Bad request
     *     {
     *      {
     *"content_origin": [
     *"Content is required"
     *],
     *"user_id": [
     *"User not is authorized"
     *]
     *}
     *}
     */


    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopicComment(Topic $topic, Comment $comment, CommentsRequest $request)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $comment->update($request->all());
            return $this->setStatusCode(200)->respond($comment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }
    /**
     * @api {delete} topics/:id/comments/:id Delete the comment of the topic
     * @apiName delete topic-comment
     * @apiGroup Comments-Topic
     *
     * @apiDescription Delete specific comment of specific topic.
     *
     * @apiParam {Number} id  Topic ID, Comment ID
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No content
     *
     * @apiError 404   Topic not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Comment not found
     *     }
     */
    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicComment(Topic $topic, Comment $comment)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $comment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  Topic CommentChild SECTION START **********/


    /**
    * @api {get} topics/:id/comments/:id/comments  List comments of the comment of the topic
    * @apiName View topic-comment-comment
    * @apiGroup Comments-Topic
    *
    * @apiDescription Returns coments of the specific comment of the specific topic
    *
    * @apiParam {Number} id Topic ID, Comment ID
    *
    * @apiSuccess {Json} Json Topic comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 253,
    *"content_origin": "taugHGSJAHGsjhGA",
    *"rating": 0,
    *"user_id": 52,
    *"content_generated": null,
    *"created_at": "2016-08-18 22:14:12",
    *"updated_at": "2016-08-18 22:14:12",
    *"pivot": {
    *"comment_id": 252,
    *"commentable_id": 253
    *}
    *}
    *],
    *"_meta": []
    *}
    *
    * @apiError 404   Topic not found,  Comment not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicCommentChildren(Topic $topic, Comment $comment)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $comments = $comment->comments()->get();
            return $this->setStatusCode(200)->respond($comments);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @api {post} topics/:id/comments/:id/comments  Add the comment to the comment to the topic
     * @apiName add topic-comment-comment
     * @apiGroup Comments-Topic
     *
     * @apiDescription Add the comment to the comment to specific topic.
     *
     * @apiParam {Number} id  Topic ID
     * @apiParam {Number} user_id  ID of user, who create comment
     * @apiParam {String} Text  Text of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *{
     *"data": {
     *"user_id": "52",
     *"content_origin": "yusdl;slkdf;lk",
     *"updated_at": "2016-08-18 22:32:12",
     *"created_at": "2016-08-18 22:32:12",
     *"id": 256
     *},
     *"_meta": []
     *}
     *
     * @apiError 404   Topic not found, Comment not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Comment not found
     *     }
     *
     * @apiError 400   Bad request
     *
     * @apiErrorExample Error-Response 400:
     *     HTTP/1.1 400 Bad request
     *     {
     *      {
     *"content_origin": [
     *"Content is required"
     *],
     *"user_id": [
     *"User not is authorized"
     *]
     *}
     *}
     */
    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentsRequest $childCommentInput
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicCommentChild(Topic $topic, Comment $comment, CommentsRequest $childCommentInput)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $childComment = Comment::create($childCommentInput->all());
            $childComment = $comment->comments()->save($childComment);
            return $this->setStatusCode(200)->respond($childComment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     */

    /**
    * @api {get} topics/:id/comments/:id/comments:id  Get the comment of the comments of the topic
    * @apiName View topic-comment-comment-comment
    * @apiGroup Comments-Topic
    *
    * @apiDescription Returns coments of the specific comment of the specific topic
    *
    * @apiParam {Number} id Topic ID, Comment ID, Comment ID
    *
    * @apiSuccess {Json} Json Topic comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 253,
    *"content_origin": "taugHGSJAHGsjhGA",
    *"rating": 0,
    *"user_id": 52,
    *"content_generated": null,
    *"created_at": "2016-08-18 22:14:12",
    *"updated_at": "2016-08-18 22:14:12"
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Topic not found,  Comment not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    public function getTopicCommentChild(Topic $topic, Comment $comment, Comment $commentChild)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            return $this->setStatusCode(200)->respond($commentChild);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }
    
    /**
     * @api {put} topics/:id/comments/:id/comments:id  Update the comment of the comment of the topic
     * @apiName update topic-comment-coment
     * @apiGroup Comments-Topic
     *
     * @apiDescription Update the comment of the comment of the  topic.
     *
     * @apiParam {Number} id  Topic ID, Comment ID, Comment ID
     * @apiParam {Number} user_id  Id of user, who create comment
     * @apiParam {String} text  Text of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *{
     *"data": {
     *"user_id": "52",
     *"content_origin": "gajshgjk",
     *"updated_at": "2016-08-18 22:32:12",
     *"created_at": "2016-08-18 22:32:12",
     *"id": 256
     *},
     *"_meta": []
     *}
     *
     * @apiError 404   Topic not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     *
     * @apiError 400   Bad request
     *
     * @apiErrorExample Error-Response 400:
     *     HTTP/1.1 400 Bad request
     *     {
     *      {
     *"content_origin": [
     *"Content is required"
     *],
     *"user_id": [
     *"User not is authorized"
     *]
     *}
     *     }
     */
    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopicCommentChild(
        Topic $topic,
        Comment $comment,
        Comment $commentChild,
        CommentsRequest $request
    ) {
        if ($this->isCommentBelongsToTopic($topic, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $commentChild->update($request->all());
            return $this->setStatusCode(200)->respond($commentChild);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }
    
    /**
     * @api {delete} topics/:id/comments/:id/comments/:id Delete the comment of the comment of the topic
     * @apiName delete topic-comment-comment
     * @apiGroup Comments-Topic
     *
     * @apiDescription Delete specific comment of the comment of specific topic.
     *
     * @apiParam {Number} id  Topic ID, Comment ID,  Comment ID
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No content
     *
     * @apiError 404   Topic not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     *  @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Comment not found
     *     }
     */

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicCommentChild(Topic $topic, Comment $comment, Comment $commentChild)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $commentChild->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  VOTE SECTION START **********/

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentBelongsToVote(Vote $vote, Comment $comment)
    {
        $voteWhichHasThisComment = $comment->votes()->get()->first();

        return ($voteWhichHasThisComment && $voteWhichHasThisComment->id === $vote->id);
    }

    /**
     * @param Vote $vote
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteComments(Vote $vote)
    {
        $comments = $vote->comments()->get();
        return $this->setStatusCode(200)->respond($comments);
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteComment(Vote $vote, Comment $comment)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)) {
            return $this->setStatusCode(200)->respond($comment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteComment(Vote $vote, CommentsRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $vote->comments()->save($comment);
        return $this->setStatusCode(201)->respond($comment);
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteComment(Vote $vote, Comment $comment, CommentsRequest $request)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)) {
            $comment->update($request->all());
            return $this->setStatusCode(200)->respond($comment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteComment(Vote $vote, Comment $comment)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)) {
            $comment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  Vote CommentChild SECTION START **********/

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteCommentChildren(Vote $vote, Comment $comment)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)) {
            $comments = $comment->comments()->get();
            return $this->setStatusCode(200)->respond($comments);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param CommentsRequest $childCommentInput
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteCommentChild(Vote $vote, Comment $comment, CommentsRequest $childCommentInput)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)) {
            $childComment = Comment::create($childCommentInput->all());
            $childComment = $comment->comments()->save($childComment);
            return $this->setStatusCode(200)->respond($childComment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteCommentChild(Vote $vote, Comment $comment, Comment $commentChild)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            return $this->setStatusCode(200)->respond($commentChild);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param Comment $commentChild
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteCommentChild(
        Vote $vote,
        Comment $comment,
        Comment $commentChild,
        CommentsRequest $request
    ) {
        if ($this->isCommentBelongsToVote($vote, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $commentChild->update($request->all());
            return $this->setStatusCode(200)->respond($commentChild);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteCommentChild(Vote $vote, Comment $comment, Comment $commentChild)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $commentChild->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  VoteItem SECTION START **********/

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentBelongsToVoteItem(VoteItem $voteItem, Comment $comment)
    {
        $voteItemWhichHasThisComment = $comment->voteItems()->get()->first();

        return ($voteItemWhichHasThisComment && $voteItemWhichHasThisComment->id === $voteItem->id);
    }

    /**
     * @param VoteItem $voteItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteItemComments(VoteItem $voteItem)
    {
        $comments = $voteItem->comments()->get();
        return $this->setStatusCode(200)->respond($comments);
    }

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteItemComment(VoteItem $voteItem, Comment $comment)
    {
        if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
            return $this->setStatusCode(200)->respond($comment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param VoteItem $voteItem
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteItemComment(VoteItem $voteItem, CommentsRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $voteItem->comments()->save($comment);
        return $this->setStatusCode(201)->respond($comment);
    }

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteItemComment(VoteItem $voteItem, Comment $comment, CommentsRequest $request)
    {
        if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
            $comment->update($request->all());
            return $this->setStatusCode(200)->respond($comment);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteItemComment(VoteItem $voteItem, Comment $comment)
    {
        if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
            $comment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
    * @api {get} votes/:id/comments List comments of the vote
    * @apiName Index vote-comments
    * @apiGroup Comments-Vote
    *
    * @apiDescription Returns the list of  comments of the specific vote
    *
    * @apiParam {Number} id Vote ID
    *
    * @apiSuccess {Json} List List of the Vote comments
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 222,
    *"content_origin": "Quod fugiat fuga sit. Beatae sit corrupti repudiandae vel aut sequi. Rem laboriosam nihil molestias.",
    *"rating": 182,
    *"user_id": 52,
    *"content_generated": "Aut magni animi architecto repellat porro ea qui. Doloremque id dolorem inventore doloribus. Impedit ut et pariatur aut. Vero nobis qui velit quibusdam.",
    *"created_at": "2016-08-18 20:03:54",
    *"updated_at": "2016-08-18 20:03:54",
    *"pivot": {
    *"commentable_id": 83,
    *"comment_id": 222
    *}
    *}
    *],
    *"_meta": []
    *}
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    */
   
    /**
    * @api {get} vote/:id/comments/:id  Get the comment of the vote
    * @apiName View vote-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Returns the specific comment of the specific vote
    *
    * @apiParam {Number} id Vote ID, Comment ID
    *
    * @apiSuccess {Json} Json Vote comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 222,
    *"content_origin": "Quod fugiat fuga sit. Beatae sit corrupti repudiandae vel aut sequi. Rem laboriosam nihil molestias.",
    *"rating": 182,
    *"user_id": 52,
    *"content_generated": "Aut magni animi architecto repellat porro ea qui. Doloremque id dolorem inventore doloribus. Impedit ut et pariatur aut. Vero nobis qui velit quibusdam.",
    *"created_at": "2016-08-18 20:03:54",
    *"updated_at": "2016-08-18 20:03:54"
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found,  Comment not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    
    /**
    * @api {post} votes/:id/comments/ Add comment to the vote
    * @apiName add vote-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Add comment to specific vote.
    *
    * @apiParam {Number} id  Vote ID
    * @apiParam {Number} user_id  ID of user, who create comment
    * @apiParam {String} Text  Text of comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 OK
    *{
    *"data": {
    *"user_id": "52",
    *"content_origin": "laksldk;lk",
    *"updated_at": "2016-08-18 22:40:28",
    *"created_at": "2016-08-18 22:40:28",
    *"id": 258
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *     {
    *      {
    *"content_origin": [
    *"Content is required"
    *],
    *"user_id": [
    *"User not is authorized"
    *]
    *}
    *     }
    */
   
    /**
    * @api {put} votes/:id/comments/:id Update the comment of the vote
    * @apiName update vote-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Update specific comment of specific vote.
    *
    * @apiParam {Number} id  Vote ID, Comment ID
    * @apiParam {Number} user_id  Id of user, who create comment
    * @apiParam {String} text  Text of comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 OK
    *{
    *"data": {
    *"user_id": "52",
    *"content_origin": "taugkjhjkhhGA",
    *"updated_at": "2016-08-18 22:50:28",
    *"created_at": "2016-08-18 22:50:28",
    *"id": 258
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found, Comment not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *  @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *     {
    *      {
    *"content_origin": [
    *"Content is required"
    *],
    *"user_id": [
    *"User not is authorized"
    *]
    *}
    *}
    */
    
    /**
    * @api {delete} votes/:id/comments/:id Delete the comment of the vote
    * @apiName delete vote-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Delete specific comment of specific vote.
    *
    * @apiParam {Number} id  Vote ID, Comment ID
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 204 No content
    *
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    
    /**
    * @api {get} votes/:id/comments/:id/comments List comments of the comment of the vote
    * @apiName View vote-comment-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Returns comments of the  comment of the vote
    *
    * @apiParam {Number} id Vote ID, Comment ID
    *
    * @apiSuccess {Json} Json Vote comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 253,
    *"content_origin": "taugHGSJAHGsjhGA",
    *"rating": 0,
    *"user_id": 52,
    *"content_generated": null,
    *"created_at": "2016-08-18 22:14:12",
    *"updated_at": "2016-08-18 22:14:12",
    *"pivot": {
    *"comment_id": 252,
    *"commentable_id": 253
    *}
    *}
    *],
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found,  Comment not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    
    /**
    * @api {post} votes/:id/comments/:id/comments  Add comment to the comment to the vote
    * @apiName add vote-comment-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Add comment to comment to specific vote.
    *
    * @apiParam {Number} id  Vote ID, Comment ID
    * @apiParam {Number} user_id  ID of user, who create comment
    * @apiParam {String} Text  Text of comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"user_id": "52",
    *"content_origin": "yusdl;slkdf;lk",
    *"updated_at": "2016-08-18 22:56:12",
    *"created_at": "2016-08-18 22:56:12",
    *"id": 259
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found, Comment not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *     {
    *      {
    *"content_origin": [
    *"Content is required"
    *],
    *"user_id": [
    *"User not is authorized"
    *]
    *}
    *     }
    */
    
    /**
    * @api {get} votes/:id/comments/:id/comments:id  Get the comment of the comments of the vote
    * @apiName View vote-comment-comment-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Returns coments of the specific comment of the specific vote
    *
    * @apiParam {Number} id Vote ID, Comment ID, Comment ID
    *
    * @apiSuccess {Json} Json Vote comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 253,
    *"content_origin": "taugHGSJAHGsjhGA",
    *"rating": 0,
    *"user_id": 52,
    *"content_generated": null,
    *"created_at": "2016-08-18 22:14:12",
    *"updated_at": "2016-08-18 22:14:12"
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found,  Comment not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    
    /**
    * @api {put} votes/:id/comments/:id/comments:id  Update the comment of the comment of the vote
    * @apiName update vote-comment-coment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Update specific comment of specific vote.
    *
    * @apiParam {Number} id  Vote ID, Comment ID, Comment ID
    * @apiParam {Number} user_id  Id of user, who create comment
    * @apiParam {String} text  Text of comment
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 OK
    *{
    *"data": {
    *"user_id": "52",
    *"content_origin": "gajshuyuiyjk",
    *"updated_at": "2016-08-18 22:59:12",
    *"created_at": "2016-08-18 22:59:12",
    *"id": 260
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *     {
    *      {
    *"content_origin": [
    *"Content is required"
    *],
    *"user_id": [
    *"User not is authorized"
    *]
    *}
    *}
    */
    
    /**
    * @api {delete} votes/:id/comments/:id/comments/:id Delete the comment of the comment of the vote
    * @apiName delete vote-comment-comment
    * @apiGroup Comments-Vote
    *
    * @apiDescription Delete specific comment of the comment of specific vote.
    *
    * @apiParam {Number} id Vote ID, Comment ID,  Comment ID
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 204 No content
    *
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *  @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Comment not found
    *     }
    */
    
    
}
