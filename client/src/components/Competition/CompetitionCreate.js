import React from 'react';
import {Create, SimpleForm, TextInput, DateTimeInput, required} from 'react-admin';

const CompetitionCreate = (props) => {
    return (
        <Create title = 'New Competition' {...props}>
            <SimpleForm redirect='show'>
                <TextInput source='name' validate={required('Specify a name!')}/>
                <DateTimeInput source='deadline' validate={required('You must enter a deadline!')}/>
            </SimpleForm>
        </Create>
    )
};

export default CompetitionCreate;