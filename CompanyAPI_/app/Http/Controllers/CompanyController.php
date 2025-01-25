<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller implements HasMiddleware
{

    public static function middleware() {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Az aktuális felhasználó cégeit adja vissza
        return Company::where('user_id', Auth::id())->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required'
        ]);
        
        $company = $request->user()->company()->create($fields);

        return ['company' => $company, 'user' => $company->user];
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Csak a bejelentkezett felhasználóhoz tartozó céget adja vissza
        $company = Company::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        
        return response()->json([
            'company' => $company,
            'user' => $company->user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        Gate::authorize('modify', $company);

        $fields = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required'
        ]);
        
        $company->update($fields);

        return $company;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        Gate::authorize('modify', $company);
        
        $company->delete();

        return ['message' => 'The company was deleted!'];
    }
}
