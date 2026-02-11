<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubscribePremiumRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation() {
        $plan = $this->input('plan');

        # TODO maybe just remove this?

        $duration_in_months = -1;
        if ($plan === '12_month') {
            $duration_in_months = 12;
        } else if ($plan === '1_month') {
            $duration_in_months = 1;
        }

        $this->merge([
            'duration_in_months' => $duration_in_months
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
            'duration_in_months' => ['required', 'integer', Rule::in([1, 12])]
        ];
    }

}
