class Renderer {

    constructor( ctx, canvas ) {

        this.ctx = ctx;

        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.vertexPositionAttribute = null;
        this.vertexColorAttribute = null;
        this.vertexTexCoordAttribute = null;

        this.vertexTransformUniform = null;
        this.vertexViewUniform = null;
        this.vertexProjectionUniform = null;

        this.fragSamplerUniform = null;

        this.projectionMatrix = new THREE.Matrix4();
            
        this.projectionMatrix.makePerspective( 
            -this.ctx.canvas.width / 2, 
            this.ctx.canvas.width / 2, 
            this.ctx.canvas.height / 2, 
            -this.ctx.canvas.height / 2, 
            1.0, 
            100 
        );

        this.viewMatrix = new THREE.Matrix4();
        this.viewMatrix.makeTranslation( 0.0, 0.0, -1.0 );

        this.initShaders( this.ctx );

        this.posX = 0.0;
        this.posY = 0.0;

        this.width = 0.0;
        this.height = 0.0;

        this.color = [ 255, 255, 255, 255 ];
        this.texture = null;

    }

    loadShader( gl, type ) {

        var shaderScript = document.getElementById( type );
        var shaderSource = shaderScript.innerHTML;
        var shader = null;

        if( shaderScript.type == 'x-shader/x-fragment' ) {

            shader = gl.createShader( gl.FRAGMENT_SHADER );

        } else if( shaderScript.type == 'x-shader/x-vertex' ) {

            shader = gl.createShader( gl.VERTEX_SHADER );

        }

        gl.shaderSource( shader, shaderSource );
        gl.compileShader( shader );

        if( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {

            console.error( 
                "An error occured compiling the shaders", 
                gl.getShaderInfoLog( shader ) 
            );

            return null;

        }

        return shader;

    }

    initShaders( gl ) {

        var vertexShader    = this.loadShader( gl, 'shader-vs' );
        var fragmentShader  = this.loadShader( gl, 'shader-fs' );

        var shaderProgram = gl.createProgram();

        gl.attachShader( shaderProgram, vertexShader );
        gl.attachShader( shaderProgram, fragmentShader );
        gl.linkProgram( shaderProgram );

        if ( !gl.getProgramParameter( shaderProgram, gl.LINK_STATUS ) ) {
            console.error( 'Unable to initialize the shader program.' );
        }

        gl.useProgram( shaderProgram );

        this.vertexPositionAttribute = gl.getAttribLocation( shaderProgram, 'aVertexPosition' );
        gl.enableVertexAttribArray( this.vertexPositionAttribute );

        this.vertexTexCoordAttribute = gl.getAttribLocation( shaderProgram, 'aTextureCoord' );
        gl.enableVertexAttribArray( this.vertexTexCoordAttribute );

        this.vertexTransformUniform = gl.getUniformLocation( shaderProgram, 'uTransformMatrix' );
        this.vertexProjectionUniform = gl.getUniformLocation( shaderProgram, 'uProjectionMatrix' );
        this.vertexViewUniform = gl.getUniformLocation( shaderProgram, 'uViewMatrix' );

        this.fragSamplerUniform = gl.getUniformLocation( shaderProgram, 'uSampler' );

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

    drawText( posX, posY, width, height, text, color = [ 0, 0, 0, 255 ] ) {

        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        color[ 3 ] = color[ 3 ] / 255;

        this.generateTexture( text, color );
        this.draw();

    }

    draw() {

        let gl = this.ctx;

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
            this.vertexPositionAttribute,
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
            this.vertexTexCoordAttribute, 
            2, 
            gl.FLOAT, 
            false, 
            0, 
            0
        );

        gl.activeTexture( gl.TEXTURE0 );

        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        gl.uniform1i( this.fragSamplerUniform, 0 );

        // Initializing Transformation matrix

        let transformationMatrix = new THREE.Matrix4();

        transformationMatrix.makeTranslation( this.posX, this.posY, 0.0 );

        gl.uniformMatrix4fv( this.vertexTransformUniform, false, new Float32Array( transformationMatrix.toArray() ) );
        
        gl.uniformMatrix4fv( this.vertexViewUniform, false, new Float32Array( this.viewMatrix.toArray() ) );

        gl.uniformMatrix4fv( this.vertexProjectionUniform, false, new Float32Array( this.projectionMatrix.toArray() ) );

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

        gl.deleteTexture( this.texture );

    }

    loadTexture( image = null ) {

        let gl = this.ctx;

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

        let gl = this.ctx;

        this.texture = gl.createTexture();

        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas );
            
        gl.bindTexture( gl.TEXTURE_2D, null );

    }

}