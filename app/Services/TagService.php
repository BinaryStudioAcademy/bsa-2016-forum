<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{

    /**
     * Attach array of tags to entity
     *
     * Store and update collection of tags for taggable model
     * @param $taggableModel
     * @param $tags
     */
    public function TagsHandler($taggableModel, $tags){
        
        $taggableModel->tags()->detach();
        foreach ($tags as $tag) {
            $tagEntity =  Tag::firstOrCreate(['name' => $tag]);
            $taggableModel->tags()->save($tagEntity);
        }
    }
}