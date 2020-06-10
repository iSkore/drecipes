import axios         from 'axios';
import * as math     from 'mathjs';

export default ( {
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
} ) => {
    if ( !Vue.prototype.$axios ) {
        Vue.prototype.$axios = axios;
    }

    if ( !Vue.prototype.$math ) {
        math.createUnit( 'barspoon', '2 mL' );
        math.createUnit( 'barspoons', '2 mL' );
        Vue.prototype.$math = math;
    }
}
