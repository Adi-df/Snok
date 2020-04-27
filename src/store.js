import { createStore } from "redux";

const store = createStore((state, action) => {
    switch (action.type){
        case "START":
            return Object.assign({}, state, {running: true});
        case "STOP":
            return Object.assign({}, state, {running: false});
        case "INCREMENT_SCORE":
            return Object.assign({}, state, {score: state.score+1});
        default:
            return {
                running: false,
                score: 0
            }
    }
})
export default store;