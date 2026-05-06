<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class VerifyPasswordResetRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'public_id' => 'required|string|exists:password_resets,public_id',
            'token' => 'required|string'
        ];
    }

}
