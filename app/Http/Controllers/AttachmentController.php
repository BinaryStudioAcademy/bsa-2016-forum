<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Comment;
use App\Models\Message;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Requests\AttachmentsRequest;

use App\Http\Requests;

class AttachmentController extends ApiController
{

    /**********  TOPIC SECTION START **********/

    /**
     * @param Topic $topic
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToTopic(Topic $topic, Attachment $attachment)
    {
        $topicWhichHasThisAttachment = $attachment->topics()->get()->first();

        return ($topicWhichHasThisAttachment && $topicWhichHasThisAttachment->id === $topic->id);
    }

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
        if ($this->isAttachmentBelongsToTopic($topic, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param AttachmentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicAttachment(Topic $topic, Request $request)
    {
        /*ToDo before deploying: move cloud config defining to .env file*/
        \Cloudinary::config([
            "cloud_name" => "dmxebkh7h",
            "api_key" => "726481723843648",
            "api_secret" => "PyBAFmxpaB3eJsgoOwOghF7ih9Q"
        ]);

        $tmp_file_path = $request->file('f')->getRealPath();
        // we need to move tmp file with new real file name because of problems with file type defining on cloud server side
        $new_tmp_file = sys_get_temp_dir().DIRECTORY_SEPARATOR.$request->file('f')->getClientOriginalName();
        move_uploaded_file($tmp_file_path,$new_tmp_file);

        $cloud_answer = \Cloudinary\Uploader::upload($new_tmp_file,['resource_type' => 'raw',"public_id" => time().'_'.$request->file('f')->getClientOriginalName()]);
        unlink($new_tmp_file);
        $attachment_data['cloud_public_id'] = $cloud_answer['public_id'];
        $attachment_data['type'] = $cloud_answer['type'];
        $attachment_data['url'] = $cloud_answer['url'];
        $attachment = Attachment::create($request->all());
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
        if ($this->isAttachmentBelongsToTopic($topic, $attachment)) {
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  VOTE SECTION START **********/

    /**
     * @param Vote $vote
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToVote(Vote $vote, Attachment $attachment)
    {
        $voteWhichHasThisAttachment = $attachment->votes()->get()->first();

        return ($voteWhichHasThisAttachment && $voteWhichHasThisAttachment->id === $vote->id);
    }

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
        if ($this->isAttachmentBelongsToVote($vote, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param AttachmentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteAttachment(Vote $vote, AttachmentsRequest $request)
    {
        $attachment = Attachment::create($request->all());
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
        if ($this->isAttachmentBelongsToVote($vote, $attachment)) {
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  COMMENT SECTION START **********/

    /**
     * @param Comment $comment
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToComment(Comment $comment, Attachment $attachment)
    {
        $commentWhichHasThisAttachment = $attachment->comments()->get()->first();

        return ($commentWhichHasThisAttachment && $commentWhichHasThisAttachment->id === $comment->id);
    }

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
        if ($this->isAttachmentBelongsToComment($comment, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Comment $comment
     * @param AttachmentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeCommentAttachment(Comment $comment, AttachmentsRequest $request)
    {
        $attachment = Attachment::create($request->all());
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
        if ($this->isAttachmentBelongsToComment($comment, $attachment)) {
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  MESSAGE SECTION START **********/

    /**
     * @param Message $message
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToMessage(Message $message, Attachment $attachment)
    {
        $messageWhichHasThisAttachment = $attachment->messages()->get()->first();

        return ($messageWhichHasThisAttachment && $messageWhichHasThisAttachment->id === $message->id);
    }

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
        if ($this->isAttachmentBelongsToMessage($message, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Message $message
     * @param AttachmentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeMessageAttachment(Message $message, AttachmentsRequest $request)
    {
        $attachment = Attachment::create($request->all());
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
        if ($this->isAttachmentBelongsToMessage($message, $attachment)) {
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }
}
