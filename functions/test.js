exports.handler = (event, context, callback) => {
    console.log('test');

    return callback(null, {
        statusCode: 200,
        body: 'yes we can'
    });
}