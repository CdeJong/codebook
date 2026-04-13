<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends BaseFormRequest {


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        
        return [
            //'assigned_user_id' => 'integer|exists:users,id', # todo not required, as normal users cannot assign an admin, but admins can?
            // 'status' => ['string', Rule::in(['PENDING', 'IN_PROGRESS', 'RESOLVED'])], # not required, but it should be an existing from list for admins
            'title' => 'required|string|max:250',
            'content' => 'required|string|max:2000',
            'category_ids' => 'required|array',
            'category_ids.*' => 'integer|exists:categories,id'
        ];
    }
}
