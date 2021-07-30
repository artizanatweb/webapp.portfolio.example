<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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

        if (!('admin' === optional(auth()->user()->type)->code)) {
            $response->setMessage("Request is not allowed for this user type!");
            return response()->json($response, 401);
        }

        return $next($request);
    }
}
