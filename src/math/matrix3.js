// extern
var Matrix4, Quaternion;

function Matrix3( data ) {
    /* Float32Array does not implement call method in chrome.
     * prototype hacking to the resque
     */
    if ( Float32Array.call ) {
        Float32Array.call( this, 9 );
        if ( data ) {
            this.set( data );
        }
    }
    else {
        var old = Float32Array.prototype;
        Float32Array.prototype = Matrix3.prototype;
        var ret = new Float32Array( 9 );
        Float32Array.prototype = old;

        if ( data ) {
            ret.set( data );
        }
        return ret;
    }
}

Matrix3.prototype = {
    constructor: Matrix3,
    set: function( data ) {
        this[ 0 ] = data[ 0 ];
        this[ 1 ] = data[ 1 ];
        this[ 2 ] = data[ 2 ];
        this[ 3 ] = data[ 3 ];
        this[ 4 ] = data[ 4 ];
        this[ 5 ] = data[ 5 ];
        this[ 6 ] = data[ 6 ];
        this[ 7 ] = data[ 7 ];
        this[ 8 ] = data[ 8 ];
        return this;
    },
    setTo: function( dest ) {
        dest[ 0 ] = this[ 0 ];
        dest[ 1 ] = this[ 1 ];
        dest[ 2 ] = this[ 2 ];
        dest[ 3 ] = this[ 3 ];
        dest[ 4 ] = this[ 4 ];
        dest[ 5 ] = this[ 5 ];
        dest[ 6 ] = this[ 6 ];
        dest[ 7 ] = this[ 7 ];
        dest[ 8 ] = this[ 8 ];
        return dest;
    },
    identity: function() {
        this[ 0 ] = 1;
        this[ 1 ] = 0;
        this[ 2 ] = 0;

        this[ 3 ] = 0;
        this[ 4 ] = 1;
        this[ 5 ] = 0;

        this[ 6 ] = 0;
        this[ 7 ] = 0;
        this[ 8 ] = 1;

        return this;
    },
    toQuaternion: function() {
//        var ret = new Quaternion();
//        if ( this[ 0 ] > this[ 4 ] && this[ 0 ] > this[ 8 ] ) {
//            var r =
//
//        }
//        else if ( this[ 4 ] > this[ 0 ] && this[ 4 ] > this[ 8 ] ) {
//
//        }
//        else {
//
//        }
    },
    clone: function() {
        return new this.constructor( this );
    }
};

Matrix4.extend( Float32Array );