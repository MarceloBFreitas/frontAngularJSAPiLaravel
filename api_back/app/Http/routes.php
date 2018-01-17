<?php
header("Access-Control-Allow-Origin: *");
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/lista', 'ProdutoController@index');
Route::post('/adicionar', 'ProdutoController@create');
Route::get('/detalhe/{id}', 'ProdutoController@show');
Route::delete('/destroy/{id}','ProdutoController@destroy');