<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class StoreCommentRequest extends BaseFormRequest {


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        
        return [
            'ticket_id' => 'required|integer|exists:tickets,id',
            'content' => 'required|string|max:2000'
        ];
    }
}
