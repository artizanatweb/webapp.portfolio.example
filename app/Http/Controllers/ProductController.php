<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\Interfaces\ProductRepository;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductCollection;
use App\Exceptions\ProductAssetException;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\CompleteProductResource;
use App\Http\Resources\ProductDetailsResource;

class ProductController extends ApiController
{
    protected ProductRepository $repository;

    public function __construct(ProductRepository $repository, Request $request)
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
        return new ProductCollection(Product::all()->sortByDesc('updated_at'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductCreateRequest  $request
     * @return JsonResponse
     */
    public function store(ProductCreateRequest $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $this->repository->create($request);
        } catch (ProductAssetException $pae) {
            DB::rollBack();
            $this->apiResponse->setMessage($pae->getMessage());
            $this->apiResponse->setData([
                $pae->getAssetKey() => $pae->getField()
            ]);
            return $this->errorResponse($this->apiResponse, Response::HTTP_METHOD_NOT_ALLOWED);
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return JsonResource
     */
    public function show(Product $product) : JsonResource
    {
        return new CompleteProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductUpdateRequest  $request
     * @param  \App\Models\Product  $product
     * @return JsonResponse
     */
    public function update(ProductUpdateRequest $request, Product $product) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $this->repository->update($request, $product);
        } catch (ProductAssetException $pae) {
            DB::rollBack();
            $this->apiResponse->setMessage($pae->getMessage());
            $this->apiResponse->setData([
                $pae->getAssetKey() => $pae->getField()
            ]);
            return $this->errorResponse($this->apiResponse, Response::HTTP_METHOD_NOT_ALLOWED);
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
     * @param  \App\Models\Product  $product
     * @return JsonResponse
     */
    public function destroy(Product $product) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $this->repository->remove($product);
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, 406);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }

    public function view(Product $product)
    {
        return new ProductDetailsResource($product);
    }
}
