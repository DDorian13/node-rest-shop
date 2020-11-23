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
                <ArrayField label='VIP members' source='VIP'>
                    <SingleFieldList>
                        <ChipField source='email'/>
                    </SingleFieldList>
                </ArrayField>
                <ArrayField
                    label='Photos in competition'
                    source='photoList'
                    reference='photos'>
                    <SingleFieldList>
                        <ChipField source='title'/>
                    </SingleFieldList>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default CompetitionShow;