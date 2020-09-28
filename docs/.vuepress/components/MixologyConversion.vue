<template>
    <span @click="convert()">
        <Badge
            :text="amount"
            :type="badgeColor"
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
            mUnit: null,
            selectedUnitPtr: null,
            badgeColor: 'success',

            // unit option index
            unitOptionIndex: 0,

            // don't add all available to these arrays because users probably don't want to convert cups to barspoons
            volumeOptions: [ 'floz', 'mL' ],
            massOptions: [ 'g', 'oz' ]
        };
    },
    computed: {
        amount() {
            try {
                this.mUnit = this.$math.unit( this.n );

                const { unit } = this.mUnit.toJSON();

                this.selectedUnitPtr = (
                    this.mUnit.hasBase( 'MASS' ) ? this.massOptions :
                        this.mUnit.hasBase( 'VOLUME' ) ? this.volumeOptions :
                            this.volumeOptions
                );

                if ( !this.selectedUnitPtr.includes( unit ) ) {
                    this.selectedUnitPtr.push( unit );
                    this.unitOptionIndex = this.selectedUnitPtr.indexOf( unit );
                }

                return this.round(
                    this.$math.unit( this.n )
                        .to( this.selectedUnitPtr[ this.unitOptionIndex ] )
                        .toString()
                );
            }
            catch ( e ) {
                console.log( e );
                this.badgeColor = 'warning';
                return this.n;
            }
        }
    },
    methods: {
        convert() {
            this.unitOptionIndex++;

            if ( this.unitOptionIndex >= this.selectedUnitPtr.length ) {
                this.unitOptionIndex = 0;
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
