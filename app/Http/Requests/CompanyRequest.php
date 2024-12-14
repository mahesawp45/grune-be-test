<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $companyId = $this->route('id');

        return [
            'name' => 'required|string|max:50',
            'email' => 'required|email|max:255|unique:companies,email,' . $companyId,
            'postcode' => 'required|string|min:7|max:7',
            'prefecture_id' => 'required|integer|exists:prefectures,id',
            'city' => 'required|string|max:255',
            'local' => 'required|string|max:255',
            'street_address' => 'nullable|string|max:255',
            'business_hour' => 'nullable|string|max:255',
            'regular_holiday' => 'nullable|string|max:255',
            'phone' => 'nullable|string',
            'fax' => 'nullable|string|max:50',
            'url' => 'nullable|url|max:255',
            'license_number' => 'nullable|string|max:50',
            'image' => 'required|file|image|max:2048',
        ];
    }

    /**
     * Custom error messages (optional).
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'The company name is required.',
            'name.string' => 'The company name must be a valid string.',
            'name.max' => 'The company name must not exceed 50 characters.',

            'email.required' => 'The email address is required.',
            'email.email' => 'The email address must be a valid email format.',
            'email.max' => 'The email address must not exceed 255 characters.',
            'email.unique' => 'This email address is already in use.',

            'postcode.required' => 'The postcode is required.',
            'postcode.string' => 'The postcode must be a valid string.',
            'postcode.min' => 'The postcode must be exactly 7 characters long.',
            'postcode.max' => 'The postcode must not exceed 7 characters.',

            'prefecture_id.required' => 'The prefecture is required.',
            'prefecture_id.integer' => 'The prefecture must be a valid integer.',
            'prefecture_id.exists' => 'The selected prefecture is invalid.',

            'city.required' => 'The city is required.',
            'city.string' => 'The city must be a valid string.',
            'city.max' => 'The city must not exceed 255 characters.',

            'local.required' => 'The local address is required.',
            'local.string' => 'The local address must be a valid string.',
            'local.max' => 'The local address must not exceed 255 characters.',

            'street_address.string' => 'The street address must be a valid string.',
            'street_address.max' => 'The street address must not exceed 255 characters.',

            'business_hour.string' => 'The business hour must be a valid string.',
            'business_hour.max' => 'The business hour must not exceed 255 characters.',

            'regular_holiday.string' => 'The regular holiday must be a valid string.',
            'regular_holiday.max' => 'The regular holiday must not exceed 255 characters.',

            'phone.string' => 'The phone number must be a valid string.',

            'fax.string' => 'The fax number must be a valid string.',
            'fax.max' => 'The fax number must not exceed 50 characters.',

            'url.string' => 'The URL must be a valid string.',
            'url.max' => 'The URL must not exceed 255 characters.',
            'url.url' => 'The URL format is invalid.',

            'license_number.string' => 'The license number must be a valid string.',
            'license_number.max' => 'The license number must not exceed 50 characters.',

            'image.required' => 'An image is required.',
            'image.file' => 'The uploaded file must be an image.',
            'image.image' => 'The uploaded file must be a valid image format.',
            'image.max' => 'The image size must not exceed 2MB.',
        ];
    }
}
