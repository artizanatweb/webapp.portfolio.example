<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Responses\ApiResponse;

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
        $response = new ApiResponse();

        if (!Auth::guard('admin')->check()) {
            $response->setMessage("Request is not allowed!");
            return response()->json($response, 401);
        }

        $user = $request->user();
        $userType = $user->type;
        if (!('admin' === optional($userType)->code)) {
            $response->setMessage("Request is not allowed for this user type!");
            return response()->json($response, 401);
        }

        return $next($request);
    }
}
