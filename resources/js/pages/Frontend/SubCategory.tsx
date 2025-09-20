import React from 'react';
import { ChevronRight, Clock, Tag, ArrowLeft } from 'lucide-react';
import { FoodCategory, SubFoodCategory } from '@/types/Frontend';
import { Link } from '@inertiajs/react';
import { itemDetail } from '@/routes';
import menuItems from '@/routes/admin/menu-items';

interface SubCategoryProps {
  foodCategory: FoodCategory;
  subFoodCategories: SubFoodCategory[];
}

export default function SubCategory({ foodCategory, subFoodCategories = [] }: SubCategoryProps) {
  const handleNavigation = () => {
    window.history.back()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="sr-only">
        <h1>{foodCategory.name || 'Category'} - Subcategories</h1>
      </div>

      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => handleNavigation()}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => handleNavigation('/categories')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Categories
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{foodCategory.name || 'Category'}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigation()}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {foodCategory.name || 'Food Category'}
                </h1>
                <p className="text-lg text-gray-600">
                  Explore our {(foodCategory.name || 'food').toLowerCase()} subcategories
                </p>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-orange-100 px-4 py-2 rounded-full">
                <span className="text-orange-800 font-medium">
                  {subFoodCategories.length} Subcategories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {subFoodCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subFoodCategories.map((subCategory) => (

              <div
                key={subCategory.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200"
              >
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center overflow-hidden">

                  <img
                    src={subCategory.image}
                    alt={subCategory.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Link href={itemDetail(subCategory.id)}>
                        <span className="text-sm font-medium bg-blue-300 px-3 py-2 rounded-3xl">View Items</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {subCategory.name}
                  </h3>

                  {subCategory.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {subCategory.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(subCategory.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {subCategory.items_count && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {subCategory.items_count} items
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleNavigation(`/subcategory/${subCategory.id}`)}
                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium text-center transition-colors duration-200 group-hover:bg-orange-600"
                  >
                    Explore Items
                    <ChevronRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Subcategories Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              There are currently no active subcategories in {foodCategory.name || 'this category'}.
              Check back later for new additions.
            </p>
            <button
              onClick={() => handleNavigation('/categories')}
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </button>
          </div>
        )}
      </div>

      {subFoodCategories.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 mt-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
              Discover More Food Categories
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Explore our complete collection of food categories and find exactly what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation('/categories')}
                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Browse All Categories
              </button>
              <button
                onClick={() => handleNavigation('/search')}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-white hover:text-orange-600 transition-colors"
              >
                Search Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}