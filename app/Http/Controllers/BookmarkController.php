<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Http\Requests\BookmarksRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookmarkController extends ApiController
{
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
     */
    public function index(Request $request)
    {

        if ($request->limit) {
            $bookmarks = Bookmark::where('user_id', Auth::user()->id)
                ->limit($request->limit)->orderBy('updated_at', 'DESC')->get();
        } else {
            $bookmarks = Bookmark::where('user_id', Auth::user()->id)->get();
        }

        $meta = $this->getMetaData($bookmarks);

        return $this->setStatusCode(200)->respond($bookmarks, $meta);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BookmarksRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(BookmarksRequest $request)
    {
        $bookmark = Bookmark::create($request->all());

        return $this->setStatusCode(201)->respond($bookmark);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $bookmarkId
     * @return \Illuminate\Http\Response
     */
    public function destroy($bookmarkId)
    {

        $bookmark = Bookmark::where('id', $bookmarkId)
            ->where('user_id', Auth::user()->id)
            ->first();

        if (!$bookmark) {
            throw (new ModelNotFoundException)->setModel(Bookmark::class);
        }

        $bookmark->delete();
        return $this->setStatusCode(204)->respond();
    }
}
