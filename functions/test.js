exports.handler = (event, context, callback) => {
    let res = 'yes we can';

    return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
    });
}