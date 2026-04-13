<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user->id,
            'assigned_user_id' => $this->assignedUser?->id, // could be null
            'category_ids' => $this->categories->pluck('id'),
            'title' => $this->title,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'content' => $this->content,
            'notes' => NoteResource::collection($this->whenLoaded('notes')), 
            'comments' => CommentResource::collection($this->whenLoaded('comments')) 
        ];
    }
}
