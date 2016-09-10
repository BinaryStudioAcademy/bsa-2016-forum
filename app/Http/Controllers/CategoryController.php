<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

use App\Http\Requests\CategoryRequest;

class CategoryController extends ApiController
{
    private function getCategoryModel($id) {
        if (is_numeric($id) === false) {
            return  Category::where('slug', '=', $id)->firstOrFail();
        }

        return Category::findOrFail($id);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        $categories = Category::all();
        if($categories){
            foreach ($categories as $category){
                $data[$category->id]['topicCount'] = $category->topics()->count();
                $data[$category->id]['lastThreeTopics'] = $category->topics()->orderBy('updated_at', 'DESC')->limit(3)->get(['name','slug','updated_at']);
            }
        }
        return $this->setStatusCode(200)->respond($categories,$data);
    }


    /**
     * @param CategoryRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CategoryRequest $request)
    {
        $this->authorize('storeCategory', new Category());

        $category = Category::create($request->all());
        return $this->setStatusCode(201)->respond($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = $this->getCategoryModel($id);
        return $this->setStatusCode(200)->respond($category);
    }


    /**
     * @param CategoryRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = $this->getCategoryModel($id);
        $this->authorize('updateCategory', $category);

        $category->update($request->all());
        return $this->setStatusCode(200)->respond($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = $this->getCategoryModel($id);
        $this->authorize('destroyCategory', $category);

        $category->delete();
        return $this->setStatusCode(204)->respond();
    }
}
