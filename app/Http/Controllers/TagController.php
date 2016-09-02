<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\TagRequest;
use Illuminate\Auth\Access\AuthorizationException;

class TagController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tag = new Tag();
        $this->authorize('viewAll', $tag);

        $tags = Tag::all();

        return $this->setStatusCode(200)->respond($tags);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);

        $this->authorize('delete', $tag);

        $tag->topics()->sync([]);
        $tag->votes()->sync([]);
        $tag->delete();

        return $this->setStatusCode(204)->respond();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param  TagRequest $request
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function update($id, TagRequest $request)
    {
        $tag = Tag::findOrFail($id);

        $this->authorize('update', $tag);

        $tag->update($request->all());

        return $this->setStatusCode(200)->respond($tag);
    }

}
