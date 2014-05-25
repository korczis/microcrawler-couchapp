function (doc) {
    if (doc.type && doc.type == 'data') {
        var data = doc.data || {};
        emit(data.processor, 1);
    }
};