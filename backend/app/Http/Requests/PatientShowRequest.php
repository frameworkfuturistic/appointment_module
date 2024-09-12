<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PatientShowRequest extends FormRequest
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
        return [
            'patient_id' => 'required|integer|exists:patients,id',
        ];
    }

    // Merge route parameters with the request data
    public function validationData()
    {
        return array_merge($this->request->all(), $this->route()->parameters());
    }

    protected function failedValidation(Validator $validator)
    {
        // Throw a custom validation error response when validation fails
        throw new HttpResponseException(
            validation_error_response($validator->errors()->toArray())
        );
    }
}
