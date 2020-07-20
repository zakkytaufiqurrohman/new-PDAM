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
Route::group(['middleware' => 'auth:api'], function () {
    // Route::get('getAll', 'CustomerController@getAllCustomer');
    // Route::post('insert', 'CustomerController@insert');
    // Route::patch('edit/{id}', 'CustomerController@edit');
    // Route::delete('delete/{id}', 'CustomerController@delete');

    Route::get('customers', 'CustomerController@getAllCustomer');
    Route::post('customers', 'CustomerController@insert');
    Route::patch('customers/{id}', 'CustomerController@edit');
    Route::delete('customers/{id}', 'CustomerController@delete');

    Route::get('users', 'UserController@index');
    Route::post('users', 'UserController@store');
    Route::patch('users/{id}', 'UserController@update');
    Route::delete('users/{id}', 'UserController@destroy');
});
Route::post('login', 'AuthController@login');
Route::post('signup', 'AuthController@signup');
