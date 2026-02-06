<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    public function before(User $user, string $ability): bool|null {

        if ($user->is_admin) {
            return true; // skips other policy methods below
        }
    
        return null; // starts checking policy methods below
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Post $post): bool {
        return true;
    }

    public function viewPremiumContent(User $user, Post $post) {
        // authors should be able to read their own posts even if they don't have premium
        if ($post->user_id === $user->id) {
            return true;
        }

        return !$post->is_premium || $user->has_premium;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // every authenticated user can create posts
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Post $post): bool
    {
        // every authenticated user can update their own posts, admins bypass this in before(user, ability)
        return $post->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Post $post): bool
    {
        // every authenticated user can update their own posts, admins bypass this in before(user, ability)
        return $post->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Post $post): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Post $post): bool
    {
        return false;
    }
}
