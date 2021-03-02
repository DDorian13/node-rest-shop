import customKeysDataProvider from 'ra-data-rest-client';
import {fetchUtils} from "react-admin";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: '*/*' });
    }
    const token = JSON.parse(localStorage.getItem('token'));
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const customKeysHash = {
    'categories': '_id',
    'competitions': '_id',
    'photos': '_id',
    'puser': '_id'
}

const dataProvider = customKeysDataProvider('http://localhost:5000', customKeysHash, {}, httpClient);

const myDataProvider = {
    ...dataProvider,
    create: (resource, params) => {
        if (resource !== 'photos' || !params.data.ownImage) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        let formData = new FormData();

        formData.append('title', params.data.title);
        formData.append('description', params.data.description);
        formData.append('ownImage', params.data.ownImage.rawFile);

        return httpClient(`http://localhost:5000/photos`, {
            method: 'POST',
            body: formData,
        }).then(({json}) => ({
            data: {...params.data, id: json.id},
        }));
    }
};

export default myDataProvider;