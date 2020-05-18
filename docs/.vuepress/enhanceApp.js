import axios     from 'axios';
import * as math from 'mathjs';

export default function ( { Vue, options, router, siteData } ) {
    Vue.use( {
        install() {
            Vue.prototype.$axios = axios;

            math.createUnit( 'barspoon', '1 mL' );
            math.createUnit( 'barspoons', '1 mL' );
            Vue.prototype.$math = math;
        }
    } );
}
