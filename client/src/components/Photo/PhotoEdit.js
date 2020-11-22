import React from 'react';
import {Edit, SimpleForm, TextInput, DateTimeInput, ImageField, ArrayInput, SimpleFormIterator} from 'react-admin';
import authProvider from '../../authentication/authProvider';

const PhotoEdit = (props) => {
    return (
        <Edit title = 'Edit Photo' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='title' />
                <TextInput source='description' />
                <ImageField source='ownImage'/>
                <TextInput disabled label = 'Owner' source='ownerID.email'/>
                <DateTimeInput disabled label = 'Uploaded at' source='upload'/>
                <ArrayInput label='Comments' source='comment'>
                    <SimpleFormIterator disableRemove={true}>
                        <TextInput disabled label='User' source='user.email'/>
                        <TextInput disabled label='comment' source='text'/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
};

export default PhotoEdit;