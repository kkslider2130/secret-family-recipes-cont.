const initialState = {
    recipeList= [],
    isLoading: false,
    isLoggedIn: false,
    error: '',
    userId: '',
    user: {
        username: '',
        user_id: ''
    },
 
    recipes:{
       user_id: '',
       recipe_name: '',
       description:'',
       prep_time: '',
       cook_time: '',
       serving_size: '',
       image_url: '' 
    },
    addFav: {
        recipes_id: '',
        user_id: ''
    },
    addSteps: {
        step_number: '',
        instructions: '',
        recipe_id: '',
    },
    addIngrediant: {
        recipe_id: '',
        ingrediant_name: '',
        quantity: ''
    }
}

export const Reducer = (state = initialState, action) => {
    switch(action.type){
      //Login
     case LOGIN_START:
         return {
             ...state,
             isLoading: true
         }
     case LOGIN_SUCCESS:
         return {
             ...state,
             isLoggedIn: true,
             isLoading: false,
             userId: action.payload
         }
     case LOGIN_FAILURE:
         return {
             ...state,
             error: action.payload,
             isLoading: false 
         }
    }
}


