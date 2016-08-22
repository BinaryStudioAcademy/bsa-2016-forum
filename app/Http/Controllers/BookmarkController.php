<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\User;
use App\Http\Requests\BookmarksRequest;
use Illuminate\Support\Facades\Auth;
use DCN\RBAC\Exceptions\PermissionDeniedException;

class BookmarkController extends ApiController
{
    #TODO: Delete this after the authorization implement
    public function __construct()
    {
        $users = User::all();
        Auth::login($users[1]);
    }

    /**
     * @param $bookmarks array
     * @return array $data array
     */
    private function getMetaData($bookmarks)
    {
        $data = [];
        foreach ($bookmarks as $bookmark) {
            $data['topic'][$bookmark->id] = $bookmark->topic()->first();
        }
        return $data;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function index()
    {
        $bookmark = new Bookmark();

        if (!(Auth::user()->allowed('view.bookmarks', $bookmark)))
            throw new PermissionDeniedException('view');

        $bookmarks = Bookmark::where('user_id', Auth::user()->id)->get();

        $meta = $this->getMetaData($bookmarks);

        return $this->setStatusCode(200)->respond($bookmarks, $meta);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BookmarksRequest $request
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function store(BookmarksRequest $request)
    {
        $bookmark = new Bookmark();

        if (!(Auth::user()->allowed('create.bookmarks', $bookmark)))
            throw new PermissionDeniedException('create');

        $bookmark = Bookmark::create($request->all());

        return $this->setStatusCode(201)->respond($bookmark);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $bookmarkId
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function destroy($bookmarkId)
    {
        $bookmark = new Bookmark();

        if (!(Auth::user()->allowed('delete.bookmarks', $bookmark)))
            throw new PermissionDeniedException('delete');

        $bookmark = Bookmark::where('id', $bookmarkId)
            ->where('user_id', Auth::user()->id)
            ->first();

        $bookmark->delete();

        return $this->setStatusCode(204)->respond();
    }
}
