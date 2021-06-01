<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AuthController extends ApiController
{
    public function user() : JsonResource
    {
        $loggedUser = Auth::user();
        $loggedUser->with('type');

        return new UserResource($loggedUser);
    }
}
