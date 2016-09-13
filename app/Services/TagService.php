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
    public function TagsHandler($taggableModel, $tags)
    {
        foreach ($tags as $tag) {
            $tagEntity =  Tag::firstOrCreate(['name' => $tag]);
            $taggableModel->tags()->save($tagEntity);
        }
    }

    /**
     * @param $taggableModel
     * @param string $tagName
     * @return static
     */
    public function storeTag($taggableModel, $tagName)
    {
        $existedTag = Tag::where('name', $tagName)->get()->first();
        if ($existedTag && !$taggableModel->tags()->find($existedTag->id)) {
            $taggableModel->tags()->save($existedTag);
            return $existedTag;
        } elseif ($existedTag && $taggableModel->tags()->find($existedTag->id)) {
            return $existedTag;
        }

        if (!$existedTag) {
            $newTag = Tag::create(['name' => $tagName]);
            $taggableModel->tags()->save($newTag);
            return $newTag;

        }
    }
}