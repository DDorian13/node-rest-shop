import React from 'react';
import { Admin, Resource } from 'react-admin';
//import restProvider from 'ra-data-simple-rest';
import customKeysDataProvider from 'ra-data-rest-client';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import OrderList from './components/OrderList';
import OrderCreate from './components/OrderCreate';
import OrderShow from './components/OrderShow';

const customKeysHash = {
    'products': '_id',
    'orders': '_id'
}

function App() {
    return <Admin dataProvider={customKeysDataProvider('http://localhost:5000', customKeysHash)}>
        <Resource name='products'
                  list={ProductList}
                  create = {ProductCreate}
                  edit = {ProductEdit}/>
        <Resource name='orders'
                  list={OrderList}
                  create = {OrderCreate}
                  show = {OrderShow}/>
    </Admin>
}

export default App;
