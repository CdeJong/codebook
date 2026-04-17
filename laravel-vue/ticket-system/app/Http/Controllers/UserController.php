<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserController extends Controller {
    
    public function index() : ResourceCollection {
        /** @var \App\Models\User $auth_user */
        $auth_user = Auth::user();

        if ($auth_user->is_admin) {
            $users = User::all();
        } else {
            $users = User::where(function (Builder $query) use ($auth_user) {
                $query->where('is_admin', '=', True)->orWhere('id', '=', $auth_user->id);
            })->get();
        }

        return UserResource::collection($users);
    }

    public function show(User $user) {
        $this->requiresAdmin();
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user) {
        /** @var \App\Models\User $auth_user */
        $auth_user = Auth::user();

        $this->requiresResourceOwner($user->id);
        $user->fill($request->validated()); // should ignore is_admin field

        if ($auth_user->is_admin) {
            $user->is_admin = $request->validated('is_admin');
        }

        $user->save();

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {
        /** @var \App\Models\User $auth_user */
        $auth_user = Auth::user();

        if ($user->id === $auth_user->id) {
            throw new HttpResponseException(response()->json([
                'message' => 'You cannot delete your own account!',
                'errors' => []
            ], 422)); 
        }

        $hasUnfinishedTickets = $user->tickets()
            ->where('status', '!=', 'COMPLETED')
            ->exists();

        if ($hasUnfinishedTickets) {
            throw new HttpResponseException(response()->json([
                'message' => 'User cannot be deleted as they are still part of an unfinished ticket!',
                'errors' => []
            ], 422)); 
        }
        
        $user->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }

}
