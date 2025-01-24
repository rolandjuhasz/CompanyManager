<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CompanyPolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function modify(User $user, Company $company): Response
    {
        return $user->id === $company->user_id
        ? Response::allow()
        : Response::deny('You do not own this company!');
    }

}
