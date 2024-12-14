<?php

namespace App\Http\Controllers;

use App\Models\PostCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PostCode $postCode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostCode $postCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostCode $postCode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostCode $postCode)
    {
        //
    }

    public function search(Request $request)
    {
        // Get the input from the request

        $req = $request->query('postcode');

        $postcode = PostCode::where('postcode', 'like', '%' . $req . '%')->first();

        return response()->json([
            'issuccess' => true,
            'data' => $postcode,
            'message' => "Success",
        ]);
    }
}
