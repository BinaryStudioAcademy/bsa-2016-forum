<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{

    /**
     * Store and update collection of tags for taggable model
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
                if ($tag && !$taggableModel->tags()->find($tag->id)) {
                    $taggableModel->tags()->save($tag);
                }
            } elseif (!empty($tag['name'])) {
                $existedTag = Tag::where('name', $tag['name'])->get()->first();
                if ($existedTag && !$taggableModel->tags()->get()->find($existedTag->id)) {
                    $taggableModel->tags()->save($existedTag);
                } elseif (!$existedTag) {
                    $newTag = Tag::create($tag);
                    $taggableModel->tags()->save($newTag);
                }
            }
        }
    }

    public function storeTag($taggableModel, string $tagName)
    {
        $existedTag = Tag::where('name', $tagName)->get()->first();
        if($existedTag && !$taggableModel->tags()->find($existedTag->id)){
            $taggableModel->tags()->save($existedTag);
            return $existedTag;
        }elseif ($existedTag && $taggableModel->tags()->find($existedTag->id)){
            return $existedTag;
        }

        if(!$existedTag){
            $newTag = Tag::create(['name'=>$tagName]);
            $taggableModel->tags()->save($newTag);
            return $newTag;

        }
    }
}