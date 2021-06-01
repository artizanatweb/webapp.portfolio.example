<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::get('/', [AdminController::class, 'index']);

Route::get('/{any}', [AdminController::class, 'index'])->where('any', '.*');
