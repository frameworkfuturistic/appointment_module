<?php

/**
 * Response Helper for APIs 
 * Opened by: Junaid
 * Open Date: 30-08-2024
 * Status: Open
 */

use Carbon\Carbon;

// Helper function to recursively convert arrays to objects
function array_to_object($array)
{
    // Convert Razorpay objects to arrays if they have a toArray method
    if (is_object($array) && method_exists($array, 'toArray')) {
        $array = $array->toArray();
    }

    if (is_array($array)) {
        // Convert each element in the array to an object recursively
        return (object) array_map('array_to_object', $array);
    }

    // Return the element itself if it's not an array or an object with toArray method
    return $array;
}

if (!function_exists('success_response')) {
    // Format a successful API response.
    function success_response($data = null, $message = 'Request successful', $statusCode = 200)
    {

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }
}

if (!function_exists('error_response')) {
    // Format an error API response.

    function error_response($message = 'An error occurred', $statusCode = 400, $errors = [])
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors
        ], $statusCode);
    }
}

if (!function_exists('not_found_response')) {
    // Format a not found API response.

    function not_found_response($message = 'Resource not found')
    {
        return error_response($message, 404);
    }
}

if (!function_exists('validation_error_response')) {
    // Format a validation error API response.

    function validation_error_response($errors)
    {
        return error_response('Validation failed', 422, $errors);
    }
}


// Standard function for API responses
function responseMsg($status, $msg, $data, $apiId = null, $version = null, $queryRunTime = null, $action = null, $deviceId = null)
{

    return response()->json([
        'status' => $status,
        'message' => $msg,
        'meta-data' => [
            'apiId' => $apiId,
            'version' => $version,
            'queryTime' => $queryRunTime,
            'epoch' => Carbon::now()->format('Y-m-d H:i:m'),
            'action' => $action,
            'deviceId' => $deviceId
        ],
        'data' => $data
    ]);
}
