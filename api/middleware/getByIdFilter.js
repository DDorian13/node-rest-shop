
module.exports = function (docs, req) {
    if (req.query.hasOwnProperty('filter') && JSON.parse(req.query.filter).hasOwnProperty('_id')) {
        const filterId = JSON.parse(req.query.filter)._id;
        const ids = [];
        var i = 0;
        for (var i in filterId) {
            ids[i] = filterId[i];
        }
        i = 0;
        const docsFiltered = [];
        docs.forEach(doc => {
            if (ids.includes(doc.id)) {
                if (req.params.hasOwnProperty('photos')){
                    docsFiltered[i] = {
                        id: doc.id,
                        title: doc.title
                    }
                } else if (req.params.hasOwnProperty('puser')) {
                    docsFiltered[i] = {
                        id: doc.id,
                        email: doc.email
                    }
                } else {
                    docsFiltered[i] = doc;
                }
                ++i;
            }
        });
        return docsFiltered;
    }
    return docs;
}