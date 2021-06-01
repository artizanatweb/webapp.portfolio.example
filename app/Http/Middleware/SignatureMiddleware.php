<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SignatureMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string $headerName
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $headerName = 'X-Name')
    {
        $response = $next($request);

        $response->headers->set($headerName, config('app.name'));

        return $response;
    }
}
