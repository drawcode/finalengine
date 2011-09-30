/*jshint sub: true */
/*global Matrix3: true, Vector3: true*/

/** @class
 *
 * A fast implementation of 4x4 transformation matrixes.
 *
 * It is used as an array of length 16 in row-major order
 * (e.g. you can use the [] operator to access elements).
 */
var Matrix4 = (
    /** @constructor */
    function () {
    // check to see if we can modify the instance of a Float32Array
    var testSubject = new Float32Array();
    var a = {};
    testSubject[ '__proto__' ] = a;
    if ( testSubject[ '__proto__' ] === a ) {
        // instance __proto__ is configurable
        // chrome
        return function Matrix4( data ) {
            var ret = new Float32Array( 16 );
            ret[ '__proto__' ] = this.constructor.prototype;
            ret.data = ret;
            if ( data ) {
                ret.set( data );
            }
            return ret;
        };
    }
    // instance __proto__ is not configurable
    // we'll have to hack it
    return function Matrix4( data ) {
        var ret = new Array( 16 );
        ret[ '__proto__' ] = this.constructor.prototype;
        ret.data = ret;
        if ( data ) {
            ret.set( data );
        }
        else {
            ret.identity();
        }
        return ret;
    };
}() );

Matrix4.prototype = {
    constructor: Matrix4,
    /**
     * Returns a clone of this matrix.
     * @param {Matrix4} [dest] A matrix4 or any other array-like object to copy to.
     * @returns {Matrix4}
     */
    clone: function( dest ) {
        if ( !dest ) {
            dest = new Matrix4();
        }
        dest[ 0 ] = this[ 0 ];
        dest[ 1 ] = this[ 1 ];
        dest[ 2 ] = this[ 2 ];
        dest[ 3 ] = this[ 3 ];
        dest[ 4 ] = this[ 4 ];
        dest[ 5 ] = this[ 5 ];
        dest[ 6 ] = this[ 6 ];
        dest[ 7 ] = this[ 7 ];
        dest[ 8 ] = this[ 8 ];
        dest[ 9 ] = this[ 9 ];
        dest[ 10 ] = this[ 10 ];
        dest[ 11 ] = this[ 11 ];
        dest[ 12 ] = this[ 12 ];
        dest[ 13 ] = this[ 13 ];
        dest[ 14 ] = this[ 14 ];
        dest[ 15 ] = this[ 15 ];
        return dest;
    },
    /**
     * Copies the values of an array to this matrix.
     * @param {Array} src An array-like object to copy from.
     */
    set: function( src ) {
        this[ 0 ] = src[ 0 ];
        this[ 1 ] = src[ 1 ];
        this[ 2 ] = src[ 2 ];
        this[ 3 ] = src[ 3 ];
        this[ 4 ] = src[ 4 ];
        this[ 5 ] = src[ 5 ];
        this[ 6 ] = src[ 6 ];
        this[ 7 ] = src[ 7 ];
        this[ 8 ] = src[ 8 ];
        this[ 9 ] = src[ 9 ];
        this[ 10 ] = src[ 10 ];
        this[ 11 ] = src[ 11 ];
        this[ 12 ] = src[ 12 ];
        this[ 13 ] = src[ 13 ];
        this[ 14 ] = src[ 14 ];
        this[ 15 ] = src[ 15 ];

        return this;
    },
    /**
     * Copies the values of this matrix to another matrix.
     * @param {Array} src An array-like object to copy to.
     */
    copyTo: function( dest ) {
        dest[ 0 ] = this[ 0 ];
        dest[ 1 ] = this[ 1 ];
        dest[ 2 ] = this[ 2 ];
        dest[ 3 ] = this[ 3 ];
        dest[ 4 ] = this[ 4 ];
        dest[ 5 ] = this[ 5 ];
        dest[ 6 ] = this[ 6 ];
        dest[ 7 ] = this[ 7 ];
        dest[ 8 ] = this[ 8 ];
        dest[ 9 ] = this[ 9 ];
        dest[ 10 ] = this[ 10 ];
        dest[ 11 ] = this[ 11 ];
        dest[ 12 ] = this[ 12 ];
        dest[ 13 ] = this[ 13 ];
        dest[ 14 ] = this[ 14 ];
        dest[ 15 ] = this[ 15 ];
    },
    /** Returns the translation vector of this matrix.
     * @returns {Vector3}
     */
    getTranslation: function( dest ) {
        if ( !dest ) {
            dest = new Vector3();
        }
        dest[ 0 ] = this[ 12 ];
        dest[ 1 ] = this[ 13 ];
        dest[ 2 ] = this[ 14 ];
        return dest;
    },
    /**
     * Returns the rotation matrix corresponding to this matrix.
     * @returns {Matrix3}
     */
    getRotationMatrix: function( dest ) {
        if ( !dest ) {
            dest = new Matrix4();
        }

        dest[ 0 ] = this[ 0 ];
        dest[ 1 ] = this[ 1 ];
        dest[ 2 ] = this[ 2 ];

        dest[ 3 ] = this[ 4 ];
        dest[ 4 ] = this[ 5 ];
        dest[ 5 ] = this[ 6 ];

        dest[ 6 ] = this[ 8 ];
        dest[ 7 ] = this[ 9 ];
        dest[ 8 ] = this[ 10 ];
        return dest;
    },
    /**
     * Sets this matrix to its transpose.
     * @returns this
     */
    transpose: function() {
        var a01 = this[ 1 ],
            a02 = this[ 2 ],
            a03 = this[ 3 ],
            a12 = this[ 6 ],
            a13 = this[ 7 ],
            a23 = this[ 11 ];

        this[ 1 ] = this[ 4 ];
        this[ 2 ] = this[ 8 ];
        this[ 3 ] = this[ 12 ];
        this[ 4 ] = a01;
        this[ 6 ] = this[ 9 ];
        this[ 7 ] = this[ 13 ];
        this[ 8 ] = a02;
        this[ 9 ] = a12;
        this[ 11 ] = this[ 14 ];
        this[ 12 ] = a03;
        this[ 13 ] = a13;
        this[ 14 ] = a23;
        return this;
    },
    /** Get the determinant of this matrix. */
    getDeterminant: function() {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = this[ 0 ], a01 = this[ 1 ], a02 = this[ 2 ], a03 = this[ 3 ],
            a10 = this[ 4 ], a11 = this[ 5 ], a12 = this[ 6 ], a13 = this[ 7 ],
            a20 = this[ 8 ], a21 = this[ 9 ], a22 = this[ 10 ], a23 = this[ 11 ],
            a30 = this[ 12 ], a31 = this[ 13 ], a32 = this[ 14 ], a33 = this[ 15 ];

        return  a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
                        a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
                        a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
                        a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
                        a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
                        a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
    },
    /**
     * Set this matrix to its inverse.
     * @returns this
     */
    inverse: function() {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = this[ 0 ], a01 = this[ 1 ], a02 = this[ 2 ], a03 = this[ 3 ];
        var a10 = this[ 4 ], a11 = this[ 5 ], a12 = this[ 6 ], a13 = this[ 7 ];
        var a20 = this[ 8 ], a21 = this[ 9 ], a22 = this[ 10 ], a23 = this[ 11 ];
        var a30 = this[ 12 ], a31 = this[ 13 ], a32 = this[ 14 ], a33 = this[ 15 ];

        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant (inlined to avoid double-caching)
        var invDet = 1 / ( b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06 );

        this[ 0 ] = ( a11 * b11 - a12 * b10 + a13 * b09 ) * invDet;
        this[ 1 ] = ( -a01 * b11 + a02 * b10 - a03 * b09 ) * invDet;
        this[ 2 ] = ( a31 * b05 - a32 * b04 + a33 * b03 ) * invDet;
        this[ 3 ] = ( -a21 * b05 + a22 * b04 - a23 * b03 ) * invDet;
        this[ 4 ] = ( -a10 * b11 + a12 * b08 - a13 * b07 ) * invDet;
        this[ 5 ] = ( a00 * b11 - a02 * b08 + a03 * b07 ) * invDet;
        this[ 6 ] = ( -a30 * b05 + a32 * b02 - a33 * b01 ) * invDet;
        this[ 7 ] = ( a20 * b05 - a22 * b02 + a23 * b01 ) * invDet;
        this[ 8 ] = ( a10 * b10 - a11 * b08 + a13 * b06 ) * invDet;
        this[ 9 ] = ( -a00 * b10 + a01 * b08 - a03 * b06 ) * invDet;
        this[ 10 ] = ( a30 * b04 - a31 * b02 + a33 * b00 ) * invDet;
        this[ 11 ] = ( -a20 * b04 + a21 * b02 - a23 * b00 ) * invDet;
        this[ 12 ] = ( -a10 * b09 + a11 * b07 - a12 * b06 ) * invDet;
        this[ 13 ] = ( a00 * b09 - a01 * b07 + a02 * b06 ) * invDet;
        this[ 14 ] = ( -a30 * b03 + a31 * b01 - a32 * b00 ) * invDet;
        this[ 15 ] = ( a20 * b03 - a21 * b01 + a22 * b00 ) * invDet;
        return this;
    },
    /*
     * Sets this matrix to the product of this matrix with the parameter passed.
     * @param {Matrix4} The matrix to multiply with.
     */
    multiply: function( matrix ) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = this[ 0 ], a01 = this[ 1 ], a02 = this[ 2 ], a03 = this[ 3 ];
        var a10 = this[ 4 ], a11 = this[ 5 ], a12 = this[ 6 ], a13 = this[ 7 ];
        var a20 = this[ 8 ], a21 = this[ 9 ], a22 = this[ 10 ], a23 = this[ 11 ];
        var a30 = this[ 12 ], a31 = this[ 13 ], a32 = this[ 14 ], a33 = this[ 15 ];

        var b00 = matrix[ 0 ], b01 = matrix[ 1 ], b02 = matrix[ 2 ], b03 = matrix[ 3 ];
        var b10 = matrix[ 4 ], b11 = matrix[ 5 ], b12 = matrix[ 6 ], b13 = matrix[ 7 ];
        var b20 = matrix[ 8 ], b21 = matrix[ 9 ], b22 = matrix[ 10 ], b23 = matrix[ 11 ];
        var b30 = matrix[ 12 ], b31 = matrix[ 13 ], b32 = matrix[ 14 ], b33 = matrix[ 15 ];

        this[ 0 ] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        this[ 1 ] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        this[ 2 ] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        this[ 3 ] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        this[ 4 ] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        this[ 5 ] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        this[ 6 ] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        this[ 7 ] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        this[ 8 ] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        this[ 9 ] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        this[ 10 ] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        this[ 11 ] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        this[ 12 ] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        this[ 13 ] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        this[ 14 ] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        this[ 15 ] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return this;
    },
    /**
     * Multiply with a Vector3 and store the value to the vector.
     * @param {Vector3} vector A vector or array-like object to multiply with.
     * @returns {Vector4} The vector.
     */
    multiplyVector3: function( vector ) {
        var x = vector[ 0 ], y = vector[ 1 ], z = vector[ 2 ];

        vector[ 0 ] = this[ 0 ] * x + this[ 4 ] * y + this[ 8 ] * z + this[ 12 ];
        vector[ 1 ] = this[ 1 ] * x + this[ 5 ] * y + this[ 9 ] * z + this[ 13 ];
        vector[ 2 ] = this[ 2 ] * x + this[ 6 ] * y + this[ 10 ] * z + this[ 14 ];
        return vector;
    },
    /**
     * Multiply with a Vector4 and store the value to the vector.
     * @param {Vector4} vector A vector or array-like object to multiply with.
     * @returns {Vector4} The vector.
     */
    multiplyVector4: function( vector ) {
        var x = vector[ 0 ], y = vector[ 1 ], z = vector[ 2 ], w = vector[ 3 ];

        vector[ 0 ] = this[ 0 ] * x + this[ 4 ] * y + this[ 8 ] * z + this[ 12 ] * w;
        vector[ 1 ] = this[ 1 ] * x + this[ 5 ] * y + this[ 9 ] * z + this[ 13 ] * w;
        vector[ 2 ] = this[ 2 ] * x + this[ 6 ] * y + this[ 10 ] * z + this[ 14 ] * w;
        vector[ 3 ] = this[ 3 ] * x + this[ 7 ] * y + this[ 11 ] * z + this[ 15 ] * w;

        return vector;
    }
};

/**
 * Generates an identity matrix.
 * @param {Matrix4} [dest] A matrix to reset to the identity matrix.
 * @returns{Matrix4} dest if specified, a new Matrix4 otherwise
 */
Matrix4.identity = function( dest ) {
    if ( !dest ) {
        dest = new Matrix4();
    }
    dest[ 0 ] = 1;
    dest[ 1 ] = 0;
    dest[ 2 ] = 0;
    dest[ 3 ] = 0;

    dest[ 4 ] = 0;
    dest[ 5 ] = 1;
    dest[ 6 ] = 0;
    dest[ 7 ] = 0;

    dest[ 8 ] = 0;
    dest[ 9 ] = 0;
    dest[ 10 ] = 1;
    dest[ 11 ] = 0;

    dest[ 12 ] = 0;
    dest[ 13 ] = 0;
    dest[ 14 ] = 0;
    dest[ 15 ] = 1;
    return dest;
};

/**
 * Generates a frustrum matrix with the given bounds.
 * @returns {Matrix4} dest if specified, a new Matrix4 otherwise
 */
Matrix4.frustrum = function( left, right, bottom, top, near, far, dest ) {
    if ( !dest ) {
        dest = new Matrix4();
    }

    var rl = ( right - left );
    var tb = ( top - bottom );
    var fn = ( far - near );
    dest[ 0 ] = ( near * 2 ) / rl;
    dest[ 1 ] = 0;
    dest[ 2 ] = 0;
    dest[ 3 ] = 0;
    dest[ 4 ] = 0;
    dest[ 5 ] = ( near * 2 ) / tb;
    dest[ 6 ] = 0;
    dest[ 7 ] = 0;
    dest[ 8 ] = ( right + left ) / rl;
    dest[ 9 ] = ( top + bottom ) / tb;
    dest[ 10 ] = -( far + near ) / fn;
    dest[ 11 ] = -1;
    dest[ 12 ] = 0;
    dest[ 13 ] = 0;
    dest[ 14 ] = -( far * near * 2 ) / fn;
    dest[ 15 ] = 0;
    return dest;
};

/**
 * Generates a perspective projection matrix with the given bounds.
 * @returns {Matrix4} dest if specified, a new Matrix4 otherwise
 */
Matrix4.perspective = function( fovy, aspect, near, far, dest ) {
    var top = near * Math.tan( fovy * Math.PI / 360.0 );
    var right = top * aspect;
    return Matrix4.frustrum( -right, right, -top, top, near, far, dest );
};

/**
 * Generates an orthogonal projection matrix with the given bounds
 * returns {Matrix4} dest if specified, a new Matrix4 otherwise
 */
Matrix4.ortho = function( left, right, bottom, top, near, far, dest ) {
    if ( !dest ) {
        dest = new Matrix4();
    }

    var rl = ( right - left );
    var tb = ( top - bottom );
    var fn = ( far - near );
    this[ 0 ] = 2 / rl;
    this[ 1 ] = 0;
    this[ 2 ] = 0;
    this[ 3 ] = 0;
    this[ 4 ] = 0;
    this[ 5 ] = 2 / tb;
    this[ 6 ] = 0;
    this[ 7 ] = 0;
    this[ 8 ] = 0;
    this[ 9 ] = 0;
    this[ 10 ] = -2 / fn;
    this[ 11 ] = 0;
    this[ 12 ] = -( left + right ) / rl;
    this[ 13 ] = -( top + bottom ) / tb;
    this[ 14 ] = -( far + near ) / fn;
    this[ 15 ] = 1;
    return this;
};

( function () {
    // check to see if we can modify the instance of a Float32Array
    var testSubject = new Float32Array();
    var a = {};
    testSubject[ '__proto__' ] = a;
    if ( testSubject[ '__proto__' ] === a ) {
        // instance __proto__ is configurable
        // chrome
        Matrix4.extend( Float32Array );
    }
    else {
        Matrix4.prototype.toString = function() {
            return this.join( ',' );
        };
        Matrix4.prototype.subarray = Array.prototype.slice;
        Matrix4.extend( Array );
    }
}() );
