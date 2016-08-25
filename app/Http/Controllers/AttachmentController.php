<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Comment;
use App\Models\Message;
use App\Models\Topic;
use App\Models\Vote;
use App\Models\VoteItem;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Facades\AttachmentService;
use App\Http\Requests\AttachmentRequest;

use App\Http\Requests;

class AttachmentController extends ApiController
{

    /**
     * @param $model
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToModel($model, Attachment $attachment)
    {
        return !!$model->attachments()->find($attachment->id);
    }

    /**********  TOPIC SECTION START **********/

    /**
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllTopicAttachments(Topic $topic)
    {
        $attachments = $topic->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param Topic $topic
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicAttachment(Topic $topic, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($topic, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }


    /**
     * @param Topic $topic
     * @param AttachmentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicAttachment(Topic $topic, AttachmentRequest $request)
    {
        $this->authorize('createTopicAttachment', $topic);

        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $topic->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param Topic $topic
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicAttachment(Topic $topic, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($topic, $attachment)) {

            $this->authorize('deleteTopicAttachment', $topic);

            if ($this->isAttachmentBelongsToModel($topic, $attachment)) {
                AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
                $attachment->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Attachment::class);
            }
        }
    }

    /**********  VOTE SECTION START **********/

    /**
     * @param Vote $vote
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllVoteAttachments(Vote $vote)
    {
        $attachments = $vote->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param Vote $vote
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteAttachment(Vote $vote, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($vote, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param AttachmentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteAttachment(Vote $vote, AttachmentRequest $request)
    {
        $this->authorize('createVoteAttachment', $vote);

        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $vote->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param Vote $vote
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteAttachment(Vote $vote, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($vote, $attachment)) {

            $this->authorize('deleteVoteAttachment', $vote);

            if ($this->isAttachmentBelongsToModel($vote, $attachment)) {
                AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
                $attachment->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Attachment::class);
            }
        }
    }

    /**********  COMMENT SECTION START **********/

    /**
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllCommentAttachments(Comment $comment)
    {
        $attachments = $comment->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param Comment $comment
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCommentAttachment(Comment $comment, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($comment, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }


    /**
     * @param Comment $comment
     * @param AttachmentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeCommentAttachment(Comment $comment, AttachmentRequest $request)
    {
        $this->authorize('createCommentAttachment', $comment);

        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $comment->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param Comment $comment
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyCommentAttachment(Comment $comment, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($comment, $attachment)) {

            $this->authorize('deleteCommentAttachment', $comment);

            if ($this->isAttachmentBelongsToModel($comment, $attachment)) {
                AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
                $attachment->delete();
                return $this->setStatusCode(204)->respond();
            } else {
                throw (new ModelNotFoundException)->setModel(Attachment::class);
            }
        }
    }

    /**********  MESSAGE SECTION START **********/

    /**
     * @param Message $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllMessageAttachments(Message $message)
    {
        $attachments = $message->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param Message $message
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMessageAttachment(Message $message, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($message, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }


    /**
     * @param Message $message
     * @param AttachmentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeMessageAttachment(Message $message, AttachmentRequest $request)
    {
        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $message->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param Message $message
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyMessageAttachment(Message $message, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($message, $attachment)) {
            AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  VoteItem SECTION START **********/

    /**
     * @param VoteItem $voteItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllVoteItemAttachments(VoteItem $voteItem)
    {
        $attachments = $voteItem->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param VoteItem $voteItem
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteItemAttachment(VoteItem $voteItem, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($voteItem, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param VoteItem $voteItem
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteItemAttachment(VoteItem $voteItem, Request $request)
    {
        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $voteItem->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param VoteItem $voteItem
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteItemAttachment(VoteItem $voteItem, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToModel($voteItem, $attachment)) {
            AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }
}

