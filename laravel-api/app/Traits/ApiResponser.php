<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponser
{
    /**
     * Success response
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function successResponse(mixed $data, string $message = 'Operation successful', int $code = 200): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'source' => 'laravel'
        ], $code);
    }

    /**
     * Error response
     *
     * @param string $message
     * @param int $code
     * @param mixed|null $data
     * @return JsonResponse
     */
    protected function errorResponse(string $message, int $code = 500, mixed $data = null): JsonResponse
    {
        $response = [
            'status' => 'error',
            'message' => $message,
            'source' => 'laravel'
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $code);
    }

    /**
     * Not found response
     *
     * @param string $message
     * @return JsonResponse
     */
    protected function notFoundResponse(string $message = 'Resource not found'): JsonResponse
    {
        return $this->errorResponse($message, 404);
    }

    /**
     * Validation error response
     *
     * @param array $errors
     * @param string $message
     * @return JsonResponse
     */
    protected function validationErrorResponse(array $errors, string $message = 'Validation failed'): JsonResponse
    {
        return $this->errorResponse($message, 422, ['errors' => $errors]);
    }
}
