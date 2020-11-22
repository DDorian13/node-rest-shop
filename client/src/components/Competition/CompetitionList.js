import React from 'react';
import {List, Datagrid, TextField, BooleanField, EditButton, ShowButton, DeleteButton, DateField, Pagination} from 'react-admin';

const CompetitionPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />;

const CompetitionList = (props) => {
    return <List {...props} pagination={<CompetitionPagination/>}>
        <Datagrid>
            <TextField source = 'name' />
            <TextField label = 'Creator' source = 'creator.email' />
            <DateField showTime={true} source = 'deadline'/>
            <BooleanField label = 'Visibility' source = 'currentVisibility'/>
            <EditButton basePath = '/competitions'/>
            <ShowButton basePath = '/competitions'/>
            <DeleteButton basePath = '/competitions'/>
        </Datagrid>
    </List>
};

export default CompetitionList;