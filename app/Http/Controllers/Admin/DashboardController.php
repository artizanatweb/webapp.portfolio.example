<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends ApiController
{
    public function index() : JsonResponse
    {
        $elements = [];

        $this->apiResponse->setData($elements);
        return $this->successResponse($this->apiResponse);
    }
}
