<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'property_id' => ['required', 'integer', 'exists:properties,id'],
            'agent_id' => ['required', 'integer', 'exists:agents,id'],
            'title' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'property_id.required' => 'A property must be selected',
            'property_id.exists' => 'The selected property does not exist',
            'agent_id.required' => 'An agent must be selected',
            'agent_id.exists' => 'The selected agent does not exist',
            'title.required' => 'The listing title is required',
            'title.max' => 'The listing title must not exceed 255 characters',
            'price.required' => 'The listing price is required',
            'price.numeric' => 'The price must be a number',
            'price.min' => 'The price cannot be negative',
        ];
    }
}
