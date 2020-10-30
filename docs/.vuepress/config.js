const
    pack     = require( '../../package.json' ),
    fs       = require( 'fs' ),
    { join } = require( 'path' );

const
    repo        = pack.repository.url.replace( 'git+', '' ).replace( '.git, ' ),
    cwd         = process.cwd(),
    pdocs       = join( cwd, 'docs' ),
    pAuntEuniav = join( pdocs, 'aunt-euniav' ),
    pdrinks     = join( pdocs, 'mixology' );

function relativePath( n ) {
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
            [ '/food/', 'Food' ],
            {
                title: 'Aunt Euniav',
                path: relativePath( pAuntEuniav ),
                sidebarDepth: 1,
                children: fs.readdirSync( pAuntEuniav )
                    .map( ( item ) => {
                        const fpath = join( pAuntEuniav, item );

                        if ( fs.lstatSync( fpath ).isDirectory() ) {
                            return relativePath( join( fpath, `${ item }.md` ) );
                        }

                        return relativePath( join( pAuntEuniav, item ) );
                    } )
                    .filter( ( i ) => !i.endsWith( 'README.md' ) && i.endsWith( '.md' ) )
            },
            {
                title: 'Mixology',
                path: relativePath( pdrinks ),
                sidebarDepth: 1,
                children: fs.readdirSync( pdrinks )
                    .map( ( item ) => {
                        const fpath = join( pdrinks, item );

                        if ( fs.lstatSync( fpath ).isDirectory() ) {
                            return relativePath( join( fpath, `${ item }.md` ) );
                        }

                        return relativePath( join( pdrinks, item ) );
                    } )
                    .filter( ( i ) => !i.endsWith( 'README.md' ) && i.endsWith( '.md' ) )
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
