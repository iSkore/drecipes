const
    pack     = require( '../../package.json' ),
    fs       = require( 'fs' ),
    { join } = require( 'path' );

const
    repo    = pack.repository.url.replace( 'git+', '' ).replace( '.git, ' ),
    cwd     = process.cwd(),
    pdocs   = join( cwd, 'docs' ),
    pdrinks = join( pdocs, 'mixology' );

function p( n ) {
    return n.replace( pdocs, '' );
}

module.exports = {
    title: pack.name,
    description: pack.description,
    head: [
        [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
        [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
        [ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
    ],
    // base: '/drecipes/',
    host: '0.0.0.0',
    themeConfig: {
        repo,
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit',
        nav: [
            { text: 'home', link: '/' },
            { text: 'info', link: '/info/' }
        ],
        sidebar: [
            [ '/', 'home' ],
            '/food/',
            {
                title: 'mixology',
                path: p( pdrinks ),
                sidebarDepth: 1,
                children: fs.readdirSync( pdrinks )
                    .map( ( i ) => p( join( pdrinks, i ) ) )
                    .filter( i => !i.endsWith( 'README.md' ) )
            },
            [ '/create/', 'create' ]
        ]
    },
    plugins: [
        require( './buffer' )
    ]
};
