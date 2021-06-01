<?php

use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('api')->group(function () {
    Route::post('oauth/token', [AccessTokenController::class, 'issueToken'])->name("passport.token");
});

Route::get('/', function () {
    return view('default');
});

Route::get('/home-cooking', function () {
    return view('home-cooking');
});

Route::get('/working-kitchen', function () {
    return view('working-kitchen');
});

Route::get('/smart-kitchen', function () {
    return view('smart-kitchen');
});
