export type FoodCategory={
'id':number
'name':string,
'image':string,
'description':string
'status':boolean
}

export type SubFoodCategory={
    'id':number,
    'food_category_id': number,
    'food_category'?: FoodCategory,
    'name':string,
    'image':string,
    'description':string,
    'status':boolean,
}
export type MenuItem={
    'id':number,
    'sub_food_category_id':number,
    'sub_food_category'?: SubFoodCategory,
    'name':string,
    'description':string,
    'image':string,
    'status':boolean,
    'price':number
}
