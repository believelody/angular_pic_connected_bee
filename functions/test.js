exports.handler = (event, context, callback) => {
    let res = 'yes we can';

    console.log(event);    

    return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
    });
}