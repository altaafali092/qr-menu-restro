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
