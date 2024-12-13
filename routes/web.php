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
        Route::get('/company', 'index')->name('company.index');
        Route::get('/add-company', 'create')->name('company.create');
        // Route::get('/customer-message/{id}', 'show')->name('show_message');
        // Route::put('/customer-message/{id}', 'reply')->name('reply_message');
        // Route::delete('/customer-message/{id}', 'destroy')->name('destroy_message');
    });

    Route::get('/postcodes', [PostCodeController::class, 'search'])->name('search');
    Route::get('/prefecture', [PrefectureController::class, 'getOneByName'])->name('getOneByName');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');





require __DIR__ . '/auth.php';
