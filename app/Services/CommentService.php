<?php
/**
 * Created by PhpStorm.
 * User: lyudmila
 * Date: 23.09.16
 * Time: 14:03
 */

namespace App\Services;

use App\Models\Comment;

class CommentService
{

    public static function  commentMeta($userId,Comment $comment)
    {
        if (!empty($currentUser = $comment->likes()->where('user_id', $userId)->get()->first())) {
            $commentMeta['isUser'] = true;
            $commentMeta['likeId'] = $currentUser->id;
            $commentMeta['countOfLikes'] = $comment->likes()->count();
        } else {
            $commentMeta['isUser'] = false;
            $commentMeta['likeId'] = null;
            $commentMeta['countOfLikes'] = 0;
        }

        return $commentMeta;
    }

}