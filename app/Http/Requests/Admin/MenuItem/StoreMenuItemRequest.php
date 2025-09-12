<?php

namespace App\Http\Requests\Admin\MenuItem;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuItemRequest extends FormRequest
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
            'sub_food_category_id' => ['required', 'exists:sub_food_categories,id,status,1'],
            'name'=>['required','string'],
            'description'=>['required','string'],
            'price'=>['required','string'],
            'image' => ['nullable','array','min:1'],
            'image.*' => ['image','mimes:jpeg,png,jpg,gif,webp','max:2048'],
        ];
    }
}
