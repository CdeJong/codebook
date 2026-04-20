<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class PatchTicketCategoriesRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'category_ids' => 'array',
            'category_ids.*' => 'integer|exists:categories,id'
        ];
    }
}
