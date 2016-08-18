<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bookmark;
use App\Models\Topic;
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
     * @param BookmarksRequest $request
     * @return \Illuminate\Http\Response
     * @throws PermissionDeniedException
     */
    public function destroy(BookmarksRequest $request)
    {
        $bookmark = new Bookmark();

        if (!(Auth::user()->allowed('delete.bookmarks', $bookmark)))
            throw new PermissionDeniedException('delete');

        $bookmark = Bookmark::where($request->all())->first();
        $bookmark->delete();

        return $this->setStatusCode(204)->respond();
    }
}
