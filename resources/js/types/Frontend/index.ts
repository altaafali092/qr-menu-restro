export type FoodCategory = {
    id: number,
    name: string,
    status: boolean,
    meta: string,
    image:string,
    created_at: string,
    updated_at: string,
}
export type SubFoodCategory = {
    id: number,
    food_category_id: number,
    food_category?: FoodCategory[],
    status: boolean,
    name: string,
    description: string,
    image: string,
}
export type MenuItem = {
    id: number,
    sub_food_category_id: number,
    sub_food_category?: SubFoodCategory[],
    status: boolean,
    name: string,
    description: string,
    image: string,
    price: number,
    created_at: string,
    updated_at: string,
}