<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrefectureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:prefectures,name',
            'display_name' => 'required|string|max:255',
            'area_id' => 'required|integer|exists:areas,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'The name of the prefecture is required.',
            'name.string' => 'The name must be a valid string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'name.unique' => 'The name must be unique.',

            'display_name.required' => 'The display name is required.',
            'display_name.string' => 'The display name must be a valid string.',
            'display_name.max' => 'The display name may not be greater than 255 characters.',

            'area_id.required' => 'The area ID is required.',
            'area_id.integer' => 'The area ID must be an integer.',
            'area_id.exists' => 'The selected area ID does not exist.',
        ];
    }
}
