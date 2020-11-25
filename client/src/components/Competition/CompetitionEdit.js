import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateTimeInput,
    BooleanInput,
    ArrayInput,
    SimpleFormIterator,
    ReferenceInput,
    SelectInput
} from 'react-admin';

const CompetitionEdit = (props) => {
    return (
        <Edit title = 'Edit Competition' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='name' />
                <TextInput disabled label = 'Creator' source='creator.email' />
                <DateTimeInput source='deadline' />
                <BooleanInput disabled label = 'Visibility' source='currentVisibility'/>

                <ArrayInput label='Photos in competition' source='photoList'>
                    <SimpleFormIterator>
                        <ReferenceInput label='Selected photo' source='_id' reference='photos'>
                            <SelectInput optionText='title'/>
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>

                <ArrayInput label='VIP members' source='VIP'>
                    <SimpleFormIterator>
                        <ReferenceInput label='Selected member' source='_id' reference='puser'>
                            <SelectInput optionText='email'/>
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>

            </SimpleForm>
        </Edit>
    )
};

export default CompetitionEdit;