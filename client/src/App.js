import React from 'react';
import { Admin, Resource } from 'react-admin';
import myDataProvider from "./addUploadFeature";
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import OrderList from './components/OrderList';
import OrderCreate from './components/OrderCreate';
import OrderShow from './components/OrderShow';
import authProvider from "./authentication/authProvider";
import MyLoginPage from "./MyLoginPage";

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
