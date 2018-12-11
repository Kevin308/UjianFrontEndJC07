import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import selectedProdukReducer from './SelectProdukReducer';

export default combineReducers({
    pikachu : () => 'Ryan Reynolds',
    auth : AuthReducer,
    selectedProduk : selectedProdukReducer
});