import axios     from 'axios';
import * as math from 'mathjs';

export default function ( { Vue, options, router, siteData } ) {
    Vue.use( {
        install() {
            if ( !Vue.prototype.$axios ) {
                Vue.prototype.$axios = axios;
            }

            if ( !Vue.prototype.$math ) {
                math.createUnit( 'barspoon', '1 mL' );
                math.createUnit( 'barspoons', '1 mL' );
                Vue.prototype.$math = math;
            }
        }
    } );
}
