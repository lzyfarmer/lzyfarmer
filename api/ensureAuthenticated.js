var jwt = require( "jwt-simple" );

module.exports = function ensureAuth( db ){
    return function ensureAuthenticated( request, response, next ){
        var token;
        var payload = null;

        // If no JWT request headers, throw error
        if( !request.headers.authorization ){
            return response.status( 401 ).send( {
                "error": "TOKEN MISSING"
            } );
        }

        token = request.headers.authorization.split( " " )[1];

        // See if the token can be decoded as a JWT
        try{
            payload = jwt.decode( token, process.env.TOKEN_SECRET );
        }
        catch( error ){
            return response.status( 401 ).send( {
                "error": "TOKEN INVALID"
            } );
        }

        // Check if token is expired
        if( payload.exp <= Date.now() ){
            return response.status( 401 ).send( {
                "error": "TOKEN EXPIRED"
            } );
        }

        next();
    };
}
