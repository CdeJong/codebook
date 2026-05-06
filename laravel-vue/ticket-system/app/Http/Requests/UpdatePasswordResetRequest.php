<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordResetRequest extends BaseFormRequest {


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        
        return [
            'token' => 'required|string',
            'public_id' => 'required|string|exists:password_resets,public_id',
            'password' => 'required|confirmed'
        ];
    }
}
