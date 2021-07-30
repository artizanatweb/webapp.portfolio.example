<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

Route::middleware('auth:admin')->group(function () {
    Route::middleware('admin-api')->group(function () {
        Route::get('/auth/user', [AuthController::class, 'user']);
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::apiResources([
            'campaigns' => CampaignController::class,
            'categories' => CategoryController::class,
            'products' => ProductController::class,
        ]);
        Route::get('/product/{product:code}', [ProductController::class, "view"]);
    });
});
