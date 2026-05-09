export type Comment = { id: number; text: string; date: string };

type Action =
    | { type: 'ADD_COMMENT'; payload: string }
    | { type: 'DELETE_COMMENT'; payload: number }
    | { type: 'CLEAR_COMMENTS' };

export const commentReducer = (state: Comment[], action: Action): Comment[] => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [{ id: Date.now(), text: action.payload, date: new Date().toLocaleString() }, ...state];
        case 'DELETE_COMMENT':
            return state.filter(c => c.id !== action.payload);
        case 'CLEAR_COMMENTS':
            return [];
        default:
            return state;
    }
};