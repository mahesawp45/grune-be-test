<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Models\Prefecture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $meta = $request->input('meta', ['per_page' => 10, 'page' => 1]);
        $searchTerm = $request->input('search');

        $companiesQuery = Company::query();

        if ($searchTerm) {
            $companiesQuery->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('email', 'like', "%{$searchTerm}%")
                    ->orWhere('phone', 'like', "%{$searchTerm}%");
            });
        }

        $companies = $companiesQuery->paginate(
            $meta['per_page'] ?? 10,
            ['*'],
            'page',
            $meta['page'] ?? 1
        );

        $companiesData = $companies->items();

        // Map the data to include full image URLs for files stored in public/storage
        $companiesData = array_map(function ($company) {
            $company['image'] = $company['image']
                ? Storage::url($company['image']) // Generate correct URL for storage files
                : asset('images/default.png');    // Use a fallback if the image doesn't exist
            return $company;
        }, $companiesData);

        $data = [
            'data' => $companiesData,
            'pagination' => [
                'total'        => $companies->total(),
                'per_page'     => $companies->perPage(),
                'current_page' => $companies->currentPage(),
                'last_page'    => $companies->lastPage(),
                'from'         => $companies->firstItem(),
                'to'           => $companies->lastItem(),
            ],
            'links' => [
                'prev_page_url' => $companies->previousPageUrl(),
                'next_page_url' => $companies->nextPageUrl(),
            ],
        ];

        if ($request->expectsJson()) {
            return response()->json($data);
        }

        return Inertia::render('Company/Company', $data);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Company/AddCompany');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {

        try {
            // Validate the request data
            $validatedData = $request->validated();

            // Create the company record in the database without the image path first
            $company = Company::create($validatedData);

            // Check if an image is present in the request
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                // Generate a new file name using the company ID
                $customName = 'image_' . $company->id . '.' . $file->getClientOriginalExtension();

                // Store the file in the 'public/images' directory with the custom name
                $imagePath = $file->storeAs('images', $customName, 'public');

                // Update the company's image path in the database
                $company->update(['image' => $imagePath]);
            }

            return Redirect::route('company.index')->with('success', 'Company successfully created!');
        } catch (\Throwable $th) {
            return Redirect::back()->with('error', 'Company unsuccessfully created!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {

        try {
            $company = Company::findOrFail($request->id);
            $company['image'] = $company['image']
                ? Storage::url($company['image']) // Generate correct URL for storage files
                : asset('images/default.png');

            $prefecture = Prefecture::where('id', $company->prefecture_id)->first();

            return Inertia::render('Company/DetailCompany', compact('company', 'prefecture'));
        } catch (\Throwable $th) {
            return Redirect::back()->with('error', 'Failed Get Detail Company with id ' . $request->id, '!');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        try {
            $company = Company::findOrFail($request->id);
            $company['image'] = $company['image']
                ? Storage::url($company['image']) // Generate correct URL for storage files
                : asset('images/default.png');

            $prefecture = Prefecture::where('id', $company->prefecture_id)->first();

            return Inertia::render('Company/EditCompany', compact('company', 'prefecture'));
        } catch (\Throwable $th) {
            return Redirect::back()->with('error', 'Failed Get Detail for Edit Company with id ' . $request->id, '!');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
