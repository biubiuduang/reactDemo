import { createStore } from 'redux'
import $ from 'jquery'

function counter(state={value:0}, action){
    let {type, value} = action;

    switch (type){
        case 'INCREMENT':
            return Object.assign({},state,{value: state.value + value});
        default:
            return state;
    }
}

let store = createStore(counter);

$(document).click(ev=>{
    store.dispatch( { type: 'INCREMENT',value: 6} );
});

let curt = store.getState();

store.subscribe(()=>{
    let pre = curt;

    curt = store.getState();
    console.log(pre,curt,pre === curt);
});
