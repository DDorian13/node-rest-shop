import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    BooleanField,
    SingleFieldList,
    ChipField,
    ReferenceField,
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

                <ArrayField
                    label='Photos in competition'
                    source='photoList'>
                    <SingleFieldList>
                        <ReferenceField source='_id' reference='photos'>
                            <ChipField source='title'/>
                        </ReferenceField>
                    </SingleFieldList>
                </ArrayField>

                <ArrayField
                    label='VIP members'
                    source='VIP'>
                    <SingleFieldList>
                        <ReferenceField source='_id' reference='puser'>
                            <ChipField source='email'/>
                        </ReferenceField>
                    </SingleFieldList>
                </ArrayField>

            </SimpleShowLayout>
        </Show>
    )
};

export default CompetitionShow;