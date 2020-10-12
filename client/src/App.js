import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import OrderList from './components/OrderList';
import OrderCreate from './components/OrderCreate';
import OrderShow from './components/OrderShow';

function App() {
  return <Admin dataProvider={restProvider('http://localhost:5000')}>
      <Resource name='products' list={ProductList}
                create = {ProductCreate}
                edit = {ProductEdit}/>
      <Resource name='orders' list={OrderList}
                create = {OrderCreate}
                show = {OrderShow}/>
      </Admin>
      ;
}

export default App;
