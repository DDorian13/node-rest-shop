import React from 'react';
import {List, Datagrid, TextField, BooleanField, DeleteWithConfirmButton} from 'react-admin';
import {Typography} from '@material-ui/core'

const UserList = (props) => {
    return (
        <List {...props} title={'Users'}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='email'/>
                <BooleanField label='Admin' source='admin' valueLabelTrue='Admin' valueLabelFalse='User'/>
                <DeleteWithConfirmButton basePath={'puser'}/>
            </Datagrid>
        </List>
    );
};

export default UserList;