import React from 'react';
import {List, Datagrid, TextField, BooleanField, DeleteButton} from 'react-admin';
import {Typography} from '@material-ui/core'

const UserList = (props) => {
    return (
        <List {...props} title={'Users'}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='email'/>
                <BooleanField label='Role' source='admin' valueLabelTrue='Admin' valueLabelFalse='User'/>
                <DeleteButton basePath={'puser'}/>
            </Datagrid>
        </List>
    );
};

export default UserList;