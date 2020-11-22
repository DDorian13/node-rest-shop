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
    ReferenceInput
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
                <ReferenceInput
                    label='VIP'
                    source="VIP"
                    reference='products'
                    allowEmpty={true}
                    multiple={true}>
                    <SelectInput
                        source='VIP'
                        optionText='name'
                        optionValue='id'
                    />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
};

export default CompetitionEdit;