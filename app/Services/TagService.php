<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{

    /**
     * Attach array of tags to topic
     *
     * @param $taggableModel
     * @param $tags
     */
    public function TagsHandler($taggableModel, $tags)
    {
        foreach ($tags as $tag) {
            $tagEntity =  Tag::firstOrCreate(['name' => $tag]);
            $taggableModel->tags()->save($tagEntity);
        }
    }
}