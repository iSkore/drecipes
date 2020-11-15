const
    pack     = require( '../../package.json' ),
    fs       = require( 'fs' ),
    { join } = require( 'path' );

const
    repo        = pack.repository.url.replace( 'git+', '' ).replace( '.git, ' ),
    cwd         = process.cwd(),
    pdocs       = join( cwd, 'docs' ),
    pfood       = join( pdocs, 'food' ),
    pAuntEuniav = join( pdocs, 'aunt-euniav' ),
    pmixology   = join( pdocs, 'mixology' );

function relativePath( n ) {
    return n.replace( pdocs, '' );
}

function readAndMapDocs( docPath ) {
    return fs.readdirSync( docPath )
        .map( ( item ) => {
            const fpath = join( docPath, item );

            if ( fs.lstatSync( fpath ).isDirectory() ) {
                return relativePath( join( fpath, `${ item }.md` ) );
            }

            return relativePath( join( docPath, item ) );
        } )
        .filter( ( i ) => !i.endsWith( 'README.md' ) && i.endsWith( '.md' ) );
}

module.exports = {
    title: pack.name,
    description: pack.description,
    head: [
        [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
        [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
        [ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
    ],
    base: process.env.NODE_ENV === 'production' ? '/drecipes/' : '',
    host: '0.0.0.0',
    themeConfig: {
        repo,
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit',
        activeHeaderLinks: false,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Info', link: '/info/' }
        ],
        sidebar: [
            [ '/', 'Home' ],
            {
                title: 'Food',
                path: relativePath( pfood ),
                sidebarDepth: 1,
                children: readAndMapDocs( pfood )
            },
            {
                title: 'Aunt Euniav',
                path: relativePath( pAuntEuniav ),
                sidebarDepth: 1,
                children: readAndMapDocs( pAuntEuniav )
            },
            {
                title: 'Mixology',
                path: relativePath( pmixology ),
                sidebarDepth: 1,
                children: readAndMapDocs( pmixology )
            },
            [
                `${ pack.bugs.url }/new?assignees=iSkore&labels=new-recipe&template=new_recipe.md&title=Recipe%3A+`,
                'Create'
            ]
        ]
    },
    plugins: [
        require( './buffer' ),
        [
            'vuepress-plugin-mathjax',
            {
                target: 'svg',
                macros: {
                    '*': '\\times'
                }
            }
        ]
    ]
};
