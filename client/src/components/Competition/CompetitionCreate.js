import React from 'react';
import {Create, SimpleForm, TextInput, DateTimeInput} from 'react-admin';

const CompetitionCreate = (props) => {
    return (
        <Create title = 'New Competition' {...props}>
            <SimpleForm redirect='show'>
                <TextInput source='name'/>
                <DateTimeInput source='deadline' />
            </SimpleForm>
        </Create>
    )
};

export default CompetitionCreate;