<?php

namespace Tests\Feature\Admin;

use App\Models\Admin\FoodCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FoodCategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_remove_image_from_food_category_on_update(): void
    {
        // 1. Create a user with necessary permissions and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        // 2. Create a FoodCategory with an image
        Storage::fake('public');
        $image = UploadedFile::fake()->image('food.jpg');
        $imagePath = $image->store('FoodCategory', 'public');

        $foodCategory = FoodCategory::factory()->create([
            'image' => $imagePath,
        ]);

        // Assert the file exists initially and the database record is correct
        Storage::disk('public')->assertExists($imagePath);
        $this->assertDatabaseHas('food_categories', [
            'id' => $foodCategory->id,
            'image' => $imagePath,
        ]);

        // 3. Send a PUT request to the update endpoint with image as null
        $response = $this->put(route('admin.food-categorys.update', $foodCategory), [
            'name' => 'Updated Name',
            'image' => null,
            'description' => 'Updated description',
        ]);

        // 4. Assert the response is a redirect to the index page
        $response->assertRedirect(route('admin.food-categorys.index'));

        // 5. Assert the image column in the database is null
        $this->assertNull($foodCategory->fresh()->getRawOriginal('image'));

        // 6. Assert the file is deleted from storage
        Storage::disk('public')->assertMissing($imagePath);
    }
}
