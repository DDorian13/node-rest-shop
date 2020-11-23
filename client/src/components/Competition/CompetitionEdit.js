import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateTimeInput,
    BooleanInput,
    SelectArrayInput,
    ReferenceArrayInput,
    SelectInput,
    ReferenceInput,
    ArrayInput
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
                <ReferenceArrayInput
                    label='Photos in competition'
                    source="photoList"
                    reference='photos'>
                    <SelectArrayInput
                        multiple={true}
                        allowNull={true}
                        source='photoList'
                        optionText='title'
                        optionValue='id'
                    />
                </ReferenceArrayInput>
                <ReferenceArrayInput
                    label='VIP'
                    source="VIP"
                    reference='puser'
                    allowEmpty={true}
                    multiple={true}>
                    <SelectArrayInput
                        source='VIP'
                        optionText='email'
                        optionValue='id'
                    />
                </ReferenceArrayInput>
            </SimpleForm>
        </Edit>
    )
};

export default CompetitionEdit;