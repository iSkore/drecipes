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
    base: '/drecipes/',
    themeConfig: {
        convert: 123,
        repo,
        docsDir: 'docs',
        editLinkText: 'Help us improve this page!',
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
                // c: [
                //     '/docs/mixology/rage-potion.md'
                // ]
            }
        ]
    }
};
