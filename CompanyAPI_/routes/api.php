<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('companies', CompanyController::class); 

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
Route::apiResource('employees', EmployeeController::class);
});

Route::get('/company/{company_id}/employees', [EmployeeController::class, 'getEmployees']);

Route::middleware('auth:sanctum')->group(function () {
    // Csak a bejelentkezett felhasználó cégei lesznek elérhetők
    Route::apiResource('companies', CompanyController::class);
});


