<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class UpdateTicketRequest extends BaseFormRequest {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array{

        return [
            'title' => 'required|string|max:250',
            'content' => 'required|string|max:2000',
            'category_ids' => 'required|array',
            'category_ids.*' => 'integer|exists:categories,id'
        ];
    }
}
