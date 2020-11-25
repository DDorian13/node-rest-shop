import React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from "./authentication/authProvider";
import myDataProvider from "./myDataProvider";
import categories from './components/Category';
import competitions from './components/Competition';
import photos from './components/Photo';
import users from './components/User';

function App() {
    return <Admin authProvider={authProvider} dataProvider={myDataProvider}>
        {permissions => [
        <Resource name='categories' {...categories} />,
        <Resource name='competitions' {...competitions} />,
        <Resource name='photos' {...photos} />,
        <Resource name='puser' {...users} options={{label: 'Users'}}/>
        ]}
    </Admin>
}

export default App;
