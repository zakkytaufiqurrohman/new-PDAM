<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
   
});
Route::group(['prefix' => 'customer', 'middleware' => 'auth:api'], function () {
    Route::get('getAll', 'CustomerController@getAllCustomer');
    Route::post('insert', 'CustomerController@insert');
    Route::patch('edit/{id}', 'CustomerController@edit');
    Route::delete('delete/{id}', 'CustomerController@delete');
});
Route::post('login', 'AuthController@login');
Route::post('signup', 'AuthController@signup');
