import React from 'react';
import {List, Datagrid, TextField, EmailField, ImageField, EditButton, ShowButton, DeleteButton} from 'react-admin';

const PhotoList = ({permissions, ...props}) => {
    return <List {...props}>
        <Datagrid>
            <TextField source = 'title' />
            <EmailField label='owner' source = 'ownerID.email' />
            <ImageField source = 'ownImage' />
            <EditButton basePath = '/photos' />
            <ShowButton basePath = '/photos' />
            <DeleteButton basePath = '/photos' />
        </Datagrid>
    </List>
};

export default PhotoList;