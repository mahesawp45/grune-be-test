<?php

namespace App\Http\Controllers;

use App\Models\Prefecture;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrefectureController extends Controller
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
    public function show(Prefecture $prefecture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prefecture $prefecture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prefecture $prefecture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prefecture $prefecture)
    {
        //
    }

    public function getOneByName(Request $request)
    {
        // Get the input from the request
        $req = $request->query('prefecture');

        $prefecture = Prefecture::where('display_name', $req)->first();

        return response()->json([
            'issuccess' => true,
            'data' => $prefecture,
            'message' => "Success",
        ]);
    }
}
