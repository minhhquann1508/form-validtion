const initialState = {
    listUser: [],
    userEdit: {
        maSV: '',
        hoTen: '',
        email: '',
        soDT: ''
    },
    findingList: []
}

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_USER': {
            state.listUser = [...state.listUser, action.payload]
            return { ...state };
        }
        case 'DELETE_USER': {
            const newListUser = state.listUser.filter(user => user.maSV !== action.payload)
            state.listUser = newListUser;
            return { ...state };
        }
        case 'GET_USER_EDIT': {
            let newUserEdit = state.listUser.find(user => user.maSV == action.payload)
            state.userEdit = newUserEdit;
            return { ...state };
        }
        case 'UPDATE_USER': {
            let newUserList = [...state.listUser];
            let index = newUserList.findIndex((user) => user.maSV === action.payload.maSV);
            if (index !== -1) {
                newUserList[index] = action.payload;
            }
            state.listUser = newUserList;
            return { ...state };
        }
        case 'FINDING_USER': {
            const filteredListUser = state.listUser.filter(user =>
                user.hoTen.trim().toLowerCase().match(action.payload.toLowerCase())
            );
            return { ...state, findingList: filteredListUser };
        }
        default:
            return state
    }
}
