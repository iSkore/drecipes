<template>
    <form
        ref="form"
        v-model="valid"
    >
        <input v-model="message" placeholder="edit me">

        <button
            color="success"
            @click="submit"
        >
            Submit
        </button>
    </form>
</template>

<script>
    export default {
        name: 'test',
        data() {
            return {
                valid: null,
                message: ''
            };
        },
        async mounted() {
            // const k = Object.keys( this.$octokit );
            //
            // for ( let i = 0; i < k.length; i++ ) {
            //     const key = k[ i ];
            //     console.log( key, Object.keys( this.$octokit[ k[ i ] ] ).join( ', ' ) );
            // }

            console.log( await this.$git.getCurrentCommit( 'iskore', 'drecipes', 'master' ) );
            console.log( await this.$git.uploadToRepo(
                'iskore',                // org
                'drecipes',              // repo
                'master',                // branch
                'docs/mixology/test.md', // filePath
                'hello world'            // fileContent
            ) );
            // await this.$octokit.pulls.create( {
            //     owner: 'iSkore',
            //     repo: 'drecipes',
            //     title: 'test pr',
            //     head: 'drecipes:new-feature',
            //     base: 'master',
            //     body: 'test body',
            //     maintainer_can_modify: true
            // } )
            // const authorize = new URL( 'https://github.com/login/oauth/authorize' );
            // authorize.searchParams.set( 'state', 'abc123' );
            // this.$router.push( authorize.href );
            // window.location.href = authorize.href;

            // const auth = this.$octoauth.createOAuthAppAuth( {
            //     clientId: '',
            //     clientSecret: '',
            //     code: 'random123' // code from OAuth web flow, see https://git.io/fhd1D
            // } );
            //
            // const appAuthentication   = await auth( {
            //     type: 'oauth-app',
            //     url: '/orgs/:org/repos'
            // } );
            // const tokenAuthentication = await auth( { type: 'token' } );
            //
            // console.log( 'here' );
            // console.log(
            //     await this.$octokit.repos
            //         .listForOrg( {
            //             org: 'octokit',
            //             type: 'public'
            //         } )
            // );
        },
        methods: {
            reset() {
                this.$refs.form.reset();
            },
            submit() {
                console.log( this.$refs.form.validate() );
                if ( this.$refs.form.validate() ) {
                    this.$refs.form.submit();
                }
            }
        }
    };
</script>

<style scoped>

</style>
