import React from 'react';
import { Admin, Resource } from 'react-admin';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import OrderList from './components/OrderList';
import OrderCreate from './components/OrderCreate';
import OrderShow from './components/OrderShow';
import authProvider from "./authentication/authProvider";
import MyLoginPage from "./MyLoginPage";
import myDataProvider from "./myDataProvider";

//-------------------
import customKeysDataProvider from 'ra-data-rest-client';
import {fetchUtils} from "react-admin";

// const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: '*/*' });
//     }
//     const token = JSON.parse(localStorage.getItem('token'));
//     options.headers.set('Authorization', `Bearer ${token}`);
//     return fetchUtils.fetchJson(url, options);
// };
//
// const customKeysHash = {
//     'products': '_id',
//     'orders': '_id',
//     'users': '_id'
// }
//
// const dataProvider = customKeysDataProvider('http://localhost:5000', customKeysHash, {}, httpClient);
// const uDataProvider = myDataProvider(dataProvider);
//-------------------

function App() {
    return <Admin authProvider={authProvider} dataProvider={myDataProvider}>
        {permissions => [
        <Resource name='products'
                  list={ProductList}
                  create = {ProductCreate}
                  edit = {ProductEdit}/>,
        <Resource name='orders'
                  list={OrderList}
                  create = {OrderCreate}
                  show = {OrderShow}/>
        ]}
    </Admin>
}

export default App;
