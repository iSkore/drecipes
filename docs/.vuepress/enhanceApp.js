import axios         from 'axios';
import * as math     from 'mathjs';
import { Octokit }   from '@octokit/rest';
import * as OctoAuth from '@octokit/auth';
import Git           from './Git';

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
        math.createUnit( 'barspoon', '1 mL' );
        math.createUnit( 'barspoons', '1 mL' );
        Vue.prototype.$math = math;
    }

    if ( !Vue.prototype.$octokit ) {
        Vue.prototype.$octokit = new Octokit();
    }

    if ( !Vue.prototype.$octoauth ) {
        Vue.prototype.$octoauth = OctoAuth;
    }

    if ( !Vue.prototype.$git ) {
        Vue.prototype.$git = new Git( Vue.prototype.$octokit );
    }
}
