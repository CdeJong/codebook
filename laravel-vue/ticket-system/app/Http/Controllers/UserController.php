<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserController extends Controller {
    
    public function index() : ResourceCollection {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->is_admin) {
            $users = User::all();
        } else {
            $users = User::where(function (Builder $query) use ($user) {
                $query->where('is_admin', '=', True)->orWhere('id', '=', $user->id);
            })->get();
        }

        return UserResource::collection($users);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {

        // todo make it so users cant delete themselves

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
