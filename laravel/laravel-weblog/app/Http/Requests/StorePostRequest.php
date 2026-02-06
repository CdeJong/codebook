<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_pinned' => $this->boolean('is_pinned'),
            'is_premium' => $this->boolean('is_premium')
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'content' => 'required|max:4000',
            'categories' => 'required|array',
            'categories.*' => 'integer|exists:categories,id',
            'is_pinned' => 'required|boolean',
            'is_premium' => 'required|boolean'
        ];
    }
}
