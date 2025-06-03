"use strict";

var assert = require( "assert" );
var parse = require( "../source" );
var path = require( "path" );


describe( "parseFile", function ()
{
    it( "should parse a file", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample.xml" ), function ( err, result )
        {
            assert.equal( err, null );
            assert.equal( result.length, 4 );
            assert.equal( result[ 0 ].functions.found, 16 );
            assert.equal( result[ 0 ].functions.hit, 14 );
            assert.equal( result[ 0 ].lines.found, 46 );
            assert.equal( result[ 0 ].lines.hit, 41 );
            assert.equal( result[ 0 ].functions.details[ 0 ].line, 5 );
            assert.equal( result[ 0 ].functions.details[ 0 ].hit, 6 );
            assert.equal( result[ 0 ].lines.details[ 0 ].line, 2 );
            assert.equal( result[ 0 ].lines.details[ 0 ].hit, 178 );
            done();
        } );
    } );

    it( "should parse a sparse file", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample2.xml" ), function ( err, result )
        {
            assert.equal( err, null );
            assert.equal( result.length, 2 );
            assert.equal( result[ 0 ].functions.found, 0 );
            assert.equal( result[ 0 ].functions.hit, 0 );
            assert.equal( result[ 0 ].lines.found, 2 );
            assert.equal( result[ 0 ].lines.hit, 0 );
            assert.equal( result[ 0 ].functions.details.length, 0 );
            assert.equal( result[ 0 ].lines.details.length, 2 );
            done();
        } );
    } );

    it( "should extract branch coverage", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample.xml" ), function ( err, result )
        {
            assert.equal( err, null );
            assert.equal( result[ 0 ].branches.found, 13 );
            assert.equal( result[ 0 ].branches.hit, 9 );
            assert.equal( result[ 0 ].branches.details[ 0 ].taken, 0 );
            assert.equal( result[ 0 ].branches.details[ 1 ].taken, 1 );
            assert.equal( result[ 0 ].branches.details[ 2 ].taken, 0 );
            assert.equal( result[ 0 ].branches.details[ 3 ].taken, 1 );
            assert.equal( result[ 0 ].branches.details[ 4 ].taken, 0 );
            assert.equal( result[ 0 ].branches.details[ 5 ].taken, 1 );

            assert.equal( result[ 2 ].branches.found, 6 );
            assert.equal( result[ 2 ].branches.hit, 5 );
            assert.equal( result[ 2 ].branches.details[ 0 ].taken, 0 );
            assert.equal( result[ 2 ].branches.details[ 1 ].taken, 1 );
            assert.equal( result[ 2 ].branches.details[ 2 ].taken, 1 );
            assert.equal( result[ 2 ].branches.details[ 3 ].taken, 1 );
            assert.equal( result[ 2 ].branches.details[ 4 ].taken, 1 );
            assert.equal( result[ 2 ].branches.details[ 5 ].taken, 1 );
            done();
        } );
    } );

    it( "should generate absolute path by default", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample3.xml" ), function ( err, result )
        {
            assert.equal( err, null );
            assert.equal( result[ 0 ].file, path.join( '/Users/user/dev/project/src', '__init__.py') );
            done();
        } );
    } );

    it( "should keep relative path", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample3.xml" ), function ( err, result )
        {
            assert.equal( err, null );
            assert.equal( result[ 0 ].file, '__init__.py' );
            done();
        }, false );
    } );

    it( "should parse a file without complete functions details", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample4.xml" ), function ( err, result )
        {
            console.log('result -->', err, JSON.stringify(result[0]));
            assert.equal( err, null );
            assert.equal( result.length, 14);
            assert.equal( result[ 0 ].functions.found, 10 );
            assert.equal( result[ 0 ].functions.hit, 9 );
            assert.equal( result[ 0 ].lines.found, 96 );
            assert.equal( result[ 0 ].lines.hit, 86 );
            assert.equal( result[ 0 ].functions.details.length, 10 );
            assert.equal( result[ 0 ].lines.details.length, 96 );
            done();
        } );
    } );

    it( "should parse a file without empty classes", function ( done )
    {
        parse.parseFile( path.join( __dirname, "assets", "sample5.xml" ), function ( err, result )
        {
            console.log('result -->', err, JSON.stringify(result[0]));
            assert.equal( err, null );
            assert.equal( result.length, 1);
            assert.equal( result[ 0 ].functions.found, 2 );
            assert.equal( result[ 0 ].functions.hit, 2 );
            assert.equal( result[ 0 ].lines.found, 2 );
            assert.equal( result[ 0 ].lines.hit, 2 );
            assert.equal( result[ 0 ].functions.details.length, 2 );
            assert.equal( result[ 0 ].lines.details.length, 2 );
            done();
        } );
    } );

} );
