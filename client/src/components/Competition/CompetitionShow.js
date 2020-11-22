import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    BooleanField,
    SingleFieldList,
    ChipField,
    ReferenceArrayField,
    ArrayField
} from 'react-admin';

const CompetitionShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source='id' />
                <TextField source='name' />
                <TextField source='creator.email' />
                <DateField showTime={true} source='deadline' />
                <BooleanField label = 'Visibility' source='currentVisibility'/>
                <ReferenceArrayField
                    label='Photos in competition'
                    source='photoList'
                    reference='photos'>
                    <ArrayField>
                        <ChipField source='title'/>
                    </ArrayField>
                </ReferenceArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default CompetitionShow;