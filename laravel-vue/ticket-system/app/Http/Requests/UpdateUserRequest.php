<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class UpdateUserRequest extends BaseFormRequest {

    protected function prepareForValidation()
    {
        $this->merge([
            'is_admin' => $this->boolean('is_admin')
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array{

        return [
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|email',
            'phone_number' => 'string|max:50',
            'is_admin' => 'boolean'
        ];
    }
}
