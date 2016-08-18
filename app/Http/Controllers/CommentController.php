<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Vote;
use App\Models\VoteItem;
use App\Http\Requests\CommentsRequest;
use App\Models\Topic;
use App\Http\Requests;
use DCN\RBAC\Exceptions\PermissionDeniedException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class CommentController extends ApiController
{
    /**
     * @param $type
     * @param Comment $comment
     * @param $essence
     * @return bool
     * @throws PermissionDeniedException
     */
    protected function checkPermission($type, $message, $comment = null, $essence = null)
    {
        if (is_null($comment)) {
            $comment = new Comment();
        }

        if (!(Auth::user()->allowed($type, $comment))) {
            throw new PermissionDeniedException($message);
        }

        if ((!is_null($essence)) && ($essence->user_id != Auth::user()->id)) {
            $isAdmin = DB::table('role_user')
                ->leftJoin('roles', 'role_user.role_id', '=', 'roles.id')
                ->where('role_user.user_id', Auth::user()->id)
                ->first();

            if (($isAdmin->slug != 'admin') && $this->isCommentHasAnyChild($comment)) {
                throw new PermissionDeniedException($message);
            }
        }

        return true;
    }

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
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComments(Topic $topic)
    {
        if ($this->checkPermission('view.comment', 'getTopicComments')) {
            $comments = $topic->comments()->get();
            return $this->setStatusCode(200)->respond($comments);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComment(Topic $topic, Comment $comment)
    {
        if ($this->checkPermission('view.comment', 'getTopicComments', $comment)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)) {
                return $this->setStatusCode(200)->respond($comment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param Topic $topic
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicComment(Topic $topic, CommentsRequest $request)
    {
        if ($this->checkPermission('create.comment', 'storeTopicComment')) {
            $comment = Comment::create($request->all());
            $comment = $topic->comments()->save($comment);
            return $this->setStatusCode(201)->respond($comment);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopicComment(Topic $topic, Comment $comment, CommentsRequest $request)
    {
        if ($this->checkPermission('update.comment', 'updateTopicComment', $comment, $topic)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)) {
                $comment->update($request->all());
                return $this->setStatusCode(200)->respond($comment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicComment(Topic $topic, Comment $comment)
    {
        if ($this->checkPermission('delete.comment', 'destroyTopicComment', $comment, $topic)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)) {
                $comment->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**********  Topic CommentChild SECTION START **********/

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws PermissionDeniedException
     */
    public function getTopicCommentChildren(Topic $topic, Comment $comment)
    {
        if ($this->checkPermission('view.comment', 'getTopicCommentChildren', $comment)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)) {
                $comments = $comment->comments()->get();
                return $this->setStatusCode(200)->respond($comments);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentsRequest $childCommentInput
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicCommentChild(Topic $topic, Comment $comment, CommentsRequest $childCommentInput)
    {
        if ($this->checkPermission('create.comment', 'storeTopicCommentChild', $childCommentInput)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)) {
                $childComment = Comment::create($childCommentInput->all());
                $childComment = $comment->comments()->save($childComment);
                return $this->setStatusCode(200)->respond($childComment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicCommentChild(Topic $topic, Comment $comment, Comment $commentChild)
    {
        if ($this->checkPermission('view.comment', 'getTopicCommentChild', $commentChild)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)
                && $this->isCommentChildBelongsToComment($comment, $commentChild)
            ) {
                return $this->setStatusCode(200)->respond($commentChild);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

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
        if ($this->checkPermission('update.comment', 'updateTopicCommentChild', $commentChild, $topic)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)
                && $this->isCommentChildBelongsToComment($comment, $commentChild)
            ) {
                $commentChild->update($request->all());
                return $this->setStatusCode(200)->respond($commentChild);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicCommentChild(Topic $topic, Comment $comment, Comment $commentChild)
    {
        if ($this->checkPermission('delete.comment', 'destroyTopicCommentChild', $commentChild, $topic)) {
            if ($this->isCommentBelongsToTopic($topic, $comment)
                && $this->isCommentChildBelongsToComment($comment, $commentChild)
            ) {
                $commentChild->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('view.comment', 'getVoteComments')) {
            $comments = $vote->comments()->get();
            return $this->setStatusCode(200)->respond($comments);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteComment(Vote $vote, Comment $comment)
    {
        if ($this->checkPermission('view.comment', 'getVoteComment', $comment)) {
            if ($this->isCommentBelongsToVote($vote, $comment)) {
                return $this->setStatusCode(200)->respond($comment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param Vote $vote
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteComment(Vote $vote, CommentsRequest $request)
    {
        if ($this->checkPermission('create.comment', 'storeVoteComment')) {
            $comment = Comment::create($request->all());
            $comment = $vote->comments()->save($comment);
            return $this->setStatusCode(201)->respond($comment);
        }
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteComment(Vote $vote, Comment $comment, CommentsRequest $request)
    {
        if ($this->checkPermission('update.comment', 'updateVoteComment', $comment, $vote)) {
            if ($this->isCommentBelongsToVote($vote, $comment)) {
                $comment->update($request->all());
                return $this->setStatusCode(200)->respond($comment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('delete.comment', 'destroyVoteComment', $comment, $vote)) {
            if ($this->isCommentBelongsToVote($vote, $comment)) {
                $comment->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('view.comment', 'getVoteCommentChildren', $comment)) {
            if ($this->isCommentBelongsToVote($vote, $comment)) {
                $comments = $comment->comments()->get();
                return $this->setStatusCode(200)->respond($comments);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('create.comment', 'storeVoteCommentChild', $childCommentInput)) {
            if ($this->isCommentBelongsToVote($vote, $comment)) {
                $childComment = Comment::create($childCommentInput->all());
                $childComment = $comment->comments()->save($childComment);
                return $this->setStatusCode(200)->respond($childComment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('view.comment', 'getVoteCommentChild', $commentChild)) {
            if ($this->isCommentBelongsToVote($vote, $comment)
                && $this->isCommentChildBelongsToComment($comment, $commentChild)
            ) {
                return $this->setStatusCode(200)->respond($commentChild);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('update.comment', 'updateVoteCommentChild', $commentChild, $vote)) {
            if ($this->isCommentBelongsToVote($vote, $comment)
                && $this->isCommentChildBelongsToComment($comment, $commentChild)
            ) {
                $commentChild->update($request->all());
                return $this->setStatusCode(200)->respond($commentChild);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('delete.comment', 'destroyVoteCommentChild', $commentChild, $vote)) {
            if ($this->isCommentBelongsToVote($vote, $comment)
                && $this->isCommentChildBelongsToComment($comment, $commentChild)
            ) {
                $commentChild->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('view.comment', 'getVoteItemComments')) {
            $comments = $voteItem->comments()->get();
            return $this->setStatusCode(200)->respond($comments);
        }
    }

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteItemComment(VoteItem $voteItem, Comment $comment)
    {
        if ($this->checkPermission('view.comment', 'getVoteItemComment', $comment)) {
            if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
                return $this->setStatusCode(200)->respond($comment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

    /**
     * @param VoteItem $voteItem
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteItemComment(VoteItem $voteItem, CommentsRequest $request)
    {
        if ($this->checkPermission('create.comment', 'storeVoteItemComment')) {
            $comment = Comment::create($request->all());
            $comment = $voteItem->comments()->save($comment);
            return $this->setStatusCode(201)->respond($comment);
        }
    }

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteItemComment(VoteItem $voteItem, Comment $comment, CommentsRequest $request)
    {
        if ($this->checkPermission('update.comment', 'updateVoteItemComment', $comment, $voteItem)) {
            if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
                $comment->update($request->all());
                return $this->setStatusCode(200)->respond($comment);
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
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
        if ($this->checkPermission('delete.comment', 'destroyVoteItemComment', $comment, $voteItem)) {
            if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
                $comment->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Comment::class);
            }
        }
    }

}
