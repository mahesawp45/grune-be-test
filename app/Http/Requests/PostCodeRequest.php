<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'public_body_code' => 'required|string|max:255',
            'old_postcode' => 'required|string|max:255',
            'postcode' => 'required|string|max:255',
            'prefecture_kana' => 'required|string|max:255',
            'city_kana' => 'required|string|max:255',
            'local_kana' => 'required|string|max:255',
            'prefecture' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'local' => 'required|string|max:255',
            'indicator_1' => 'required|boolean',
            'indicator_2' => 'required|boolean',
            'indicator_3' => 'required|boolean',
            'indicator_4' => 'required|boolean',
            'indicator_5' => 'required|boolean',
            'indicator_6' => 'required|boolean',
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
            'public_body_code.required' => 'The public body code is required.',
            'old_postcode.required' => 'The old postcode is required.',
            'postcode.required' => 'The postcode is required.',
            'prefecture_kana.required' => 'The prefecture kana is required.',
            'city_kana.required' => 'The city kana is required.',
            'local_kana.required' => 'The local kana is required.',
            'prefecture.required' => 'The prefecture is required.',
            'city.required' => 'The city is required.',
            'local.required' => 'The local is required.',

            'indicator_1.required' => 'Indicator 1 is required.',
            'indicator_2.required' => 'Indicator 2 is required.',
            'indicator_3.required' => 'Indicator 3 is required.',
            'indicator_4.required' => 'Indicator 4 is required.',
            'indicator_5.required' => 'Indicator 5 is required.',
            'indicator_6.required' => 'Indicator 6 is required.',

            'indicator_1.boolean' => 'Indicator 1 must be true or false.',
            'indicator_2.boolean' => 'Indicator 2 must be true or false.',
            'indicator_3.boolean' => 'Indicator 3 must be true or false.',
            'indicator_4.boolean' => 'Indicator 4 must be true or false.',
            'indicator_5.boolean' => 'Indicator 5 must be true or false.',
            'indicator_6.boolean' => 'Indicator 6 must be true or false.',
        ];
    }
}
