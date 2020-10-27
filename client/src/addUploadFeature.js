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
    'users': '_id'
}

const dataProvider = customKeysDataProvider('http://localhost:5000', customKeysHash, {}, httpClient);

const myDataProvider = {
    ...dataProvider,
    post: (resource, params) => {
        if (resource !== 'products' || !params.data.productImage) {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }
        /**
         * For posts update only, convert uploaded image in base 64 and attach it to
         * the `picture` sent property, with `src` and `title` attributes.
         */

            // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = params.data.productImage.filter(
            p => p.rawFile instanceof File
            );
        const formerPictures = params.data.productImage.filter(
            p => !(p.rawFile instanceof File)
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map(picture64 => ({
                    src: picture64,
                    title: `${params.data.title}`,
                }))
            )
            .then(transformedNewPictures =>
                dataProvider.post(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        productImage: [
                            ...transformedNewPictures,
                            ...formerPictures,
                        ],
                    },
                })
            );
    },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

export default myDataProvider;