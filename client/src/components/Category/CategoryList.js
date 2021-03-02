import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    ShowButton,
    DeleteWithConfirmButton,
    BooleanField
} from 'react-admin';

const CategoryList = (props) => {
    return <List {...props}>
        <Datagrid>
            <TextField source = 'name' />
            <TextField label = 'Creator' source = 'creator.email' />
            <NumberField source = 'limit'/>
            <BooleanField label = 'Only creator' source = 'visibility'/>
            <EditButton basePath = '/categories'/>
            <ShowButton basePath = '/categories'/>
            <DeleteWithConfirmButton basePath = '/categories'/>
        </Datagrid>
    </List>
};

export default CategoryList;