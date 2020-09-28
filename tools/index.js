'use strict';

const fs   = require( 'fs' );
const path = require( 'path' );

let dir = fs.readdirSync( './' );

dir = dir.filter( ( i ) => !( i.endsWith( '.md' ) || i.endsWith( '.js' ) || i.includes( 'apple-butter' ) ) );

const file = `---
title: {{TITLE}}
tags:
  - aunt euniav
---

# {{ $frontmatter.title }}

### ingredients:

- <MixologyConversion n="12 cups"/> apples

### instructions:

- stir all together

---

**citation**:
[Aunt Euniav](../README.md)

![image](./image.jpg)
![image2](./image2.jpg)
`;
console.log( file );
const cwd = process.cwd();
for ( let i = 0; i < dir.length; i++ ) {
    const item = dir[ i ];
    const str  = file.replace(
        '{{TITLE}}',
        item.replace( /-/g, ' ' )
    );
    console.log( str );
    fs.writeFileSync( path.join( cwd, item, `${ item }.md` ), str );
}
