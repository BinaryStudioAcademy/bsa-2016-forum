<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{

    /**
     * @param $taggableModel
     * @param $tags
     */
    public function TagsHandler($taggableModel, $tags)
    {
        $oldTags = $taggableModel->tags()->get();
        $taggableModel->tags()->detach($oldTags);
        $tags = json_decode($tags, true);

        foreach ($tags as $tag) {
            if (!empty($tag['id'])) {
                $tag = Tag::find($tag['id']);
                $taggableModel->tags()->save($tag);
            } elseif (!empty($tag['name'])) {
                $existedTag = Tag::where('name', $tag['name'])->get()->first();
                if ($existedTag) {
                    $taggableModel->tags()->save($existedTag);
                } else {
                    $newTag = Tag::create($tag);
                    $taggableModel->tags()->save($newTag);
                }
            }
        }
    }
}