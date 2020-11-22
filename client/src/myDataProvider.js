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
    'products': '_id',
    'orders': '_id',
    'users': '_id',
    'categories': '_id',
    'competitions': '_id',
    'photos': '_id'
}

const dataProvider = customKeysDataProvider('http://localhost:5000', customKeysHash, {}, httpClient);

const myDataProvider = {
    ...dataProvider,
    create: (resource, params) => {
        if (resource !== 'products' || !params.data.productImage) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

        let formData = new FormData();

        formData.append('title', params.data.title);
        formData.append('year', params.data.year);
        formData.append('author', params.data.author);
        formData.append('desc', params.data.desc);
        formData.append('productImage', params.data.productImage.rawFile);

        return httpClient(`http://localhost:5000/products`, {
            method: 'POST',
            body: formData,
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    }
};

export default myDataProvider;