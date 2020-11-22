import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    BooleanField,
    SingleFieldList,
    ChipField,
    ReferenceManyField
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
                <ReferenceManyField
                    label='Photos in competition'
                    source='photoList'
                    reference='photos'>
                    <SingleFieldList>
                        <ChipField source='title'/>
                    </SingleFieldList>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    )
};

export default CompetitionShow;