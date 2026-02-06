<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy {

    public function before(User $user, string $ability): bool|null {

        if ($user->is_admin) {
            return true; // skips other policy methods below
        }
    
        return null; // starts checking policy methods below (all false at the moment)
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Category $category): bool {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Category $category): bool {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Category $category): bool {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Category $category): bool {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Category $category): bool {
        return false;
    }
}
