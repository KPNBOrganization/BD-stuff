class Rect {

    constructor( renderer ) {

        this.renderer = renderer;

        this.posX = 0.0;
        this.posY = 0.0;

        this.width = 0.0;
        this.height = 0.0;

        this.color = [ 255, 255, 255, 255 ];
        this.texture = null;

    }

    drawRect( posX, posY, width, height, color ) {

        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        this.color = color;

        this.loadTexture();
        this.draw();

    }

    drawImage( posX, posY, width, height, image ) {

        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        this.loadTexture( image );
        this.draw();

    }

    drawText( posX, posY, width, height, text, color ) {

        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        color[ 3 ] = color[ 3 ] / 255;

        this.generateTexture( text, color );
        this.draw();

    }

    draw() {

        let gl = this.renderer.ctx;

        let vertexBuffer = gl.createBuffer();

        // Initializing Vertex Buffer

        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );

        let vertices = [
            this.width, this.height,  0.0,
            0.0, this.height,  0.0,
            this.width, 0.0, 0.0,
            0.0, 0.0, 0.0
        ];

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

        gl.vertexAttribPointer( 
            this.renderer.vertexPositionAttribute,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        // Initializing Texture Buffer

        let textureCoordsBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, textureCoordsBuffer );

        let textureCoords = [
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( textureCoords ), gl.STATIC_DRAW );

        gl.vertexAttribPointer(
            this.renderer.vertexTexCoordAttribute, 
            2, 
            gl.FLOAT, 
            false, 
            0, 
            0
        );

        gl.activeTexture( gl.TEXTURE0 );

        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        gl.uniform1i( this.renderer.fragSamplerUniform, 0 );

        // Initializing Transformation matrix

        let transformationMatrix = new THREE.Matrix4();

        transformationMatrix.makeTranslation( this.posX, this.posY, 0.0 );

        gl.uniformMatrix4fv( this.renderer.vertexTransformUniform, false, new Float32Array( transformationMatrix.toArray() ) );
        
        gl.uniformMatrix4fv( this.renderer.vertexViewUniform, false, new Float32Array( this.renderer.viewMatrix.toArray() ) );

        gl.uniformMatrix4fv( this.renderer.vertexProjectionUniform, false, new Float32Array( this.renderer.projectionMatrix.toArray() ) );

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

        gl.deleteTexture( this.texture );

    }

    loadTexture( image = null ) {

        let gl = this.renderer.ctx;

        this.texture = gl.createTexture();
        
        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        // Because loading the image may take some time, loading a 1x1 placeholder
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( this.color ) );

        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

        if( image ) {

            gl.bindTexture( gl.TEXTURE_2D, this.texture );

            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );

        }

        // gl.bindTexture( gl.TEXTURE_2D, null );

    }

    generateTexture( text, color ) {

        let canvas = document.createElement( 'canvas' );
        
        canvas.width = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext( '2d' );

        ctx.font = "bold 60px 'Comic Sans MS'";

        ctx.textAlign = "center";

        ctx.fillStyle = "rgba(" + color.join( ',' ) + ")";

        ctx.textBaseline = "middle"; 

        ctx.fillText( text, this.width / 2, this.height / 2, this.width );

        let gl = this.renderer.ctx;

        this.texture = gl.createTexture();

        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas );
            
        gl.bindTexture( gl.TEXTURE_2D, null );

    }

}