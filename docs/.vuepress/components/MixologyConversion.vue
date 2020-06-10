<template>
    <span @click="convert()">
        <Badge
            :text="amount"
            type="success"
        />
    </span>
</template>

<script>
    // Converter
    export default {
        name: 'MixologyConversion',
        props: [ 'n' ],
        data() {
            return {
                // liquid volume index
                lvi: 0,
                liquidVolumeOptions: [ 'floz', 'mL' ]
            };
        },
        computed: {
            amount() {
                const { unit } = this.$math.unit( this.n ).toJSON();

                if ( !this.liquidVolumeOptions.includes( unit ) ) {
                    this.liquidVolumeOptions.push( unit );
                    this.lvi = this.liquidVolumeOptions.indexOf( unit );
                }

                return this.round( this.$math.unit( this.n ).to(
                    this.liquidVolumeOptions[ this.lvi ]
                ).toString() );
            }
        },
        methods: {
            convert() {
                console.log( 'ok' );
                this.lvi++;

                if ( this.lvi >= this.liquidVolumeOptions.length ) {
                    this.lvi = 0;
                }
            },
            round( n ) {
                let x   = +( n.match( /(?<x>^-?\d+(,\d+)*(\.\d+(e\d+)?)?)/i ).groups.x );
                const y = +x;

                if ( x < 1 ) {
                    x = this.$math.round( x * 1e6 ) / 1e6;
                }
                else if ( x < 10 ) {
                    x = parseFloat( x.toFixed( 2 ) );
                }
                else {
                    x = this.$math.round( x );
                }

                // remove trailing zeros
                if ( x === ~~x ) {
                    x = x.toFixed( 0 );
                }

                return n.replace( y, x );
            }
        }
    };
</script>
