<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Http\Request;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    $employees = Employee::where('company_id', $request->query('company_id'))->get();
    return response()->json($employees);
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
        $fields = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'name' => 'required|max:255',
            'position' => 'required|max:255',
            'email' => 'required|email|unique:employees',
        ]);
    
        $employee = Employee::create([
            'company_id' => $fields['company_id'],
            'user_id' => $request->user()->id, // Mentjük, hogy ki hozta létre
            'name' => $fields['name'],
            'position' => $fields['position'],
            'email' => $fields['email'],
        ]);
    
        return response()->json($employee, 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }

    public function getEmployees($company_id) {
        $company = Company::findOrFail($company_id);
        $employees = $company->employees; // Tegyük fel, hogy van egy employees reláció a Company modelben
        return response()->json($employees);
    }
}
