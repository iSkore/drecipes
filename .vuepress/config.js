const
    fs                = require( 'fs' ),
    { join, resolve } = require( 'path' );

const
    cwd     = process.cwd(),
    pdocs   = resolve( 'docs' ),
    pdrinks = join( pdocs, 'drinks' );

function p( n ) {
    return n.replace( cwd, '' );
}

module.exports = {
    themeConfig: {
        docsDir: 'docs',
        editLinkText: 'Help us improve this page!',
        nav: [
            { text: 'home', link: '/' },
            { text: 'info', link: '/docs/info/' }
        ],
        sidebar: [
            [ '/', 'home' ],
            '/docs/food/',
            {
                title: 'drinks',
                path: p( pdrinks ),
                sidebarDepth: 1,
                children: fs.readdirSync( pdrinks )
                    .map( ( i ) => p( join( pdrinks, i ) ) )
                    .filter( i => !i.endsWith( 'README.md' ) )
                // c: [
                //     '/docs/drinks/rage-potion.md'
                // ]
            }
        ]
    }
};