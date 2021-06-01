<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompleteCategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\Interfaces\CategoryRepository;
use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use Illuminate\Support\Facades\DB;
use \Exception;
use App\Http\Resources\CategoryCollection;

class CategoryController extends ApiController
{
    protected CategoryRepository $repository;

    public function __construct(CategoryRepository $repository, Request $request)
    {
        parent::__construct($request);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index() : JsonResource
    {
        return new CategoryCollection(Category::all()->sortBy('position'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CategoryCreateRequest $request
     * @return JsonResponse
     */
    public function store(CategoryCreateRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->repository->create($request);
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, 406);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return JsonResource
     */
    public function show(Category $category) : JsonResource
    {
        return new CompleteCategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CategoryUpdateRequest
     * @param  \App\Models\Category  $category
     * @return JsonResponse
     */
    public function update(CategoryUpdateRequest $request, Category $category) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $this->repository->update($request, $category);
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, 406);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return JsonResponse
     */
    public function destroy(Category $category) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $this->repository->remove($category);
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, 406);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }
}
