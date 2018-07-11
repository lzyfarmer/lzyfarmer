module.exports = function handleApiError( error, props ){
    if( error.response.status == 401 ){
        props.history.push( "/" );
    }
}
