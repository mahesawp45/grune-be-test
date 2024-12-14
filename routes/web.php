<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PostCodeController;
use App\Http\Controllers\PrefectureController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->name('dashboard');
//    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');





    Route::controller(CompanyController::class)->group(function () {
        // show index/list company page
        Route::get('/company', 'index')->name('company.index');

        // show add company page
        Route::get('/add-company', 'create')->name('company.create');

        // show store company to DB
        Route::post('/store-company', 'store')->name('company.store');

        // show detail company page
        Route::get('/detail-company', 'show')->name('company.show');

        // show edit company page
        Route::get('/edit-company', 'edit')->name('company.edit');

        // update company
        Route::patch('/update-company/{id}', 'update')->name('company.update');

        // delete company
        Route::delete('/delete-company/{id}', 'destroy')->name('company.destroy');
    });

    Route::get('/postcodes', [PostCodeController::class, 'search'])->name('searchPostCode');
    Route::get('/prefecture', [PrefectureController::class, 'getOneByName'])->name('getOnePrefectureByName');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');





require __DIR__ . '/auth.php';
