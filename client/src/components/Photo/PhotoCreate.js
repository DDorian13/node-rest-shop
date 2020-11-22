import React from 'react';
import {Create, SimpleForm, TextInput, ImageField, ImageInput, required} from 'react-admin';

const PhotoCreate = (props) => {
    return (
        <Create title = 'New Photo' {...props}>
            <SimpleForm redirect={'list'}>
                <TextInput source='title' validate={required('Specify a title!')}/>
                <TextInput multiline={true} source='description' defaultValue={' '}/>
                <ImageInput label = 'Image'
                            source='ownImage'
                            validate={required('You must upload a photo!')}>
                    <ImageField source='src'/>
                </ImageInput>
            </SimpleForm>
        </Create>
    )
};

export default PhotoCreate;