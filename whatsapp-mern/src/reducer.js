export const initialState = {
    user: null,
    signUpStatus: false
}

const reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SIGN_IN":
            return {
                ...state,
                signUpStatus: false
            }
        case "SIGN_UP":
            return {
                ...state,
                signUpStatus: true
            }
        default:
            return state;
    }
}

export default reducer;

