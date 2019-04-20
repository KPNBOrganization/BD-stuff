class Player {

    constructor( level ) {

        this.level = level;

        this.positionX = 0.0;
        this.positionY = 20.0;

        this.velocityX = 0.0;
        this.velocityY = 0.0;

        this.onGround = true;

        this.height = 84;
        this.width = 55;

        this.image = false;

        this.loadTexture();

    }

    update() {

        let velocityX = this.velocityX;
        let velocityY = this.velocityY - this.level.gravity;

        let positionX = this.positionX + velocityX * this.level.renderer.deltaTime;
        let positionY = this.positionY + velocityY * this.level.renderer.deltaTime;

        let onGround = false;

        // Out of map check

        if( positionY < -200.00 ) {

            velocityY = 0.00;

            positionX = 0.00;
            positionY = 20.00;

            onGround = true;

        } else {

            for( let obstacle of this.level.obstacles ) {

                if( this.detectCollision( obstacle, positionX, positionY ) == true ) {

                    // Detecting, where we hit the obstacle
                    
                    if( this.positionY >= obstacle.positionY + obstacle.height ) {
                        
                        velocityY = 0.00;
                        positionY = obstacle.positionY + obstacle.height;
                        onGround = true;

                    } else if( this.positionY + this.height <= obstacle.positionY ) {

                        velocityY = -this.level.gravity; 
                        positionY = obstacle.positionY - this.height;

                    } else if( this.positionX < obstacle.positionX ) {

                        positionX = obstacle.positionX - this.width;

                    } else if( this.positionX > obstacle.positionX ) {

                        positionX = obstacle.positionX + obstacle.width;

                    }

                }

            }

        }

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.positionX = positionX;
        this.positionY = positionY;

        this.onGround = onGround;

        this.level.renderer.camera.update( this );

    }

    draw() {

        let positionX = this.positionX - this.level.renderer.camera.positionX; 
        let positionY = this.positionY - this.level.renderer.camera.positionY; 

        if( this.image ) {

            this.level.renderer.ctx.drawImage( 
                this.image,
                positionX, 
                this.level.renderer.canvasHeight - this.height - positionY, 
                this.width, 
                this.height
            );

        }

        /*this.level.renderer.ctx.fillStyle = '#00ff00';
        this.level.renderer.ctx.fillRect( 
            positionX, 
            this.level.renderer.canvasHeight - this.height - positionY, 
            this.width, 
            this.height 
        );*/

    }

    jump() {

        if( this.onGround ) {

            this.velocityY = 500.0;
            this.onGround = false;

        }

    }

    startMove( direction ) {

        this.velocityX = direction * 500;

    }

    endMove() {

        this.velocityX = 0;

    }

    detectCollision( obstacle, positionX, positionY ) {
        
        if( positionX < obstacle.positionX + obstacle.width && 
            positionX + this.width > obstacle.positionX &&
            positionY < obstacle.positionY + obstacle.height &&
            positionY + this.height > obstacle.positionY ) {

            return true;

        }

        return false;

    }

    loadTexture() {

        let image = new Image();

        image.onload = () => {
            this.image = image;
        };

        image.src = 'images/Mexican_Texturised_180-resized.png';

    }

}