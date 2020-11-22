import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    ShowButton,
    DeleteButton,
    BooleanField,
    Pagination
} from 'react-admin';

const CategoryPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />;

const CategoryList = (props) => {
    return <List {...props} pagination={<CategoryPagination/>}>
        <Datagrid>
            <TextField source = 'name' />
            <TextField label = 'Creator' source = 'creator.email' />
            <NumberField source = 'limit'/>
            <BooleanField label = 'Only creator' source = 'visibility'/>
            <EditButton basePath = '/categories'/>
            <ShowButton basePath = '/categories'/>
            <DeleteButton basePath = '/categories'/>
        </Datagrid>
    </List>
};

export default CategoryList;