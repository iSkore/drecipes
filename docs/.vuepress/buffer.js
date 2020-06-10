const Buffer = require( 'buffer' );

module.exports = ( options, ctx ) => {
    console.log( options, ctx );
    return {
        extendPageData( $page ) {
            $page.buffer = Buffer;
        }
    };
};
