<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $user->with('type');
        $userType = optional($user->type)->code;
        if (!('admin' === $userType)) {
            $response = new ApiResponse();
            $response->setMessage("Request is not allowed for this user type!");
            return response()->json($response, 401);
        }

        return $next($request);
    }
}
