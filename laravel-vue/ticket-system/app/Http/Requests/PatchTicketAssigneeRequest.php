<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class PatchTicketAssigneeRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'assigned_user_id' => 'integer|exists:users,id'
        ];
    }
}
