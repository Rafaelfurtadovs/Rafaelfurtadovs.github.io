//cria as variaveis que serao utilizadas
var player;
var platform;
var cursors;
var moeda;
var placar;
var pontuacao = 0;
var inimigo;
var speeddd;
var light;

//cria a classe jogo

class Jogo extends Phaser.Scene {
    constructor() {
        super({ key: 'Jogo' });
        
    }
    //preload dos assets do jogo
    preload() {
        this.load.image('lep', 'assets/pixelfundo.png');
        this.load.spritesheet('duende', 'assets/verda.png', { frameWidth: 21.8, frameHeight: 31 });
        this.load.image('plat', 'assets/platform.png');
        this.load.image('speed', 'assets/speedpixel.png');
        this.load.image('moeda', 'assets/moedaa.png');
        this.load.image('lightt', 'assets/raip.png');
        this.load.spritesheet('enemy', 'assets/mal.png', { frameWidth: 21.8, frameHeight: 31 });
        
    }   

    create() {
       
       //define pontuacao como 0
        pontuacao = 0;
        //define a plataforma como um grupo estatico na fisica
        platform = this.physics.add.staticGroup();
        //cria a platafotma
        platform.create(600, 710, 'plat').setScale(3).refreshBody();
       //cria o fundo
        this.add.image(400, 400, 'lep').setScale(1.2);
        //cria o efeito de speed
        light = this.add.image(597, 397, 'lightt').setScale(1.0);
       //tira a visibilidade do efeito
        light.setVisible(false);
        //cria o texto speed area
        speeddd = this.add.image(600, 400, 'speed').setScale(0.5);
        //tira a visibilidade do texto
        speeddd.setVisible(false);
        //adiciona um sprite fisico no caso o personagem
        player = this.physics.add.sprite(100, 600, 'duende').setScale(4.0);
        //adiciona colisao ao personagem
        player.setCollideWorldBounds(true);
        //adiciona gravidade propria ao personagem
        player.setGravityY(300);
        //anima o movimento do sprite para esquerda
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('duende', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        //anima o personagem quando ele estiver parado
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'duende', frame: 4 }],
            frameRate: 20
        });
        //anima o personagem para direita
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('duende', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //adiciona o sprite do inimigo
        inimigo = this.physics.add.sprite(200, 600, 'enemy').setScale(4.0);
        //adiciona colisao ao inimigo
        inimigo.setCollideWorldBounds(true);
        //adiciona colisao entre o inimigo e a plataforma
        this.physics.add.collider(platform, inimigo);
        //adiciona gravidade especifica ao inimigo
        inimigo.setGravityY(-230);
        
        //anima o movimento do inimigo sozinho
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('enemy', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        //torna verdadeiro o movimento
        inimigo.anims.play('fly', true);
    
        //  Eventos de entrada
        cursors = this.input.keyboard.createCursorKeys();
        //adiciona colisao entre o player e a plataforma
        this.physics.add.collider(player, platform);
        //adiciona fisica a moeda
        moeda = this.physics.add.sprite(600, 100, 'moeda');
        //adiciona colisao a moeda
        moeda.setCollideWorldBounds(true);
        
        //caso a moeda encoste na plataforma -> game over
        this.physics.add.overlap(moeda, platform, () => {
            this.scene.start('GameOver', this.game);
        });
        //caso o player encoste no inimigo -> gameover
        this.physics.add.overlap(player, inimigo, () => {
            this.scene.start('GameOver', this.game);
        });
        
        //adiciona placar, e o anexa as moedas e pontuacao
        placar = this.add.text(50, 50, 'Moedas:' + pontuacao, {fontSize:'45px', fill:'#000000'});

            //faz com que sempre que a hitbox do personagem encoste na moeda ela suma

            this.physics.add.overlap(player, moeda, function(){ 
                
                moeda.setVisible(false);

                // faz com que a moeda spawne em qualquer uma dessas cordenadas

                var posicaoMoeda_Y = Phaser.Math.RND.between(50, 1100);
                moeda.setVelocityY(10);
               
                moeda.setPosition(posicaoMoeda_Y, 100);
               
                //adiciona mais 1 a pontuacao ao coletar moeda

                pontuacao +=1;
                
                //atribui o texto moedas a pontuacao

                placar.setText('Moedas:' + pontuacao);

                //ativa a visibilidade da moeda

                moeda.setVisible(true);

                
            });
    }
            // Lógica de atualização da cena
    update() {
        // faz o movimento para esquerda ser ativado ao usar a seta esquerda
        if (cursors.left.isDown) {
            player.setVelocityX(-400);
    
            player.anims.play('left', true);
        }
        //faz o movimento para direita ser ativado ao clicar a seta direita
        else if (cursors.right.isDown) {
            player.setVelocityX(400);
    
            player.anims.play('right', true);
        }
       //caso nada seja pressionado a velocidade é zero
        else {
            player.setVelocityX(0);
    
            player.anims.play('turn');
        }
        //habilita o pulo caso o jogador esteja no chao
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-500);
        }
        //adiciona a speed zone
        if (player.x > 300 && player.x < 900 && cursors.right.isDown) {
            player.setVelocityX(700);
        }
        //adiciona a speed zone
        else if (player.x > 300 && player.x < 900 && cursors.left.isDown) {
            player.setVelocityX(-700);
        }
        //adiciona o texto da speed zone
        if (player.x > 300 && player.x < 900) {
            speeddd.setVisible(true);
        }
        //desativa a speedzone
        if (player.x < 300 || player.x > 900) {
            speeddd.setVisible(false);
        }
        //ativa o efeito de luz
        if (player.x > 300 && player.x < 900) {
            light.setVisible(true);
        }
        //ativa o efeito de luz
        if (player.x < 300 || player.x > 900) {
            light.setVisible(false);
        }
        //faz a ida do personagem
        if (inimigo.x <= 200) {
            inimigo.setFlip(false, false);
            inimigo.ida = true;
        }
        
        //inimigo vai pra direita
        if (inimigo.x <= 1100 && inimigo.ida === true) {
            console.log('define a direção, no caso para direita');
            inimigo.x += 5;
        }
        
           
        //faz o inimigo girar
        if (inimigo.x >= 1100) {
            inimigo.setFlip(true, false);
            inimigo.ida = false;
        }
        
        //faz o inimigo voltar
        if (inimigo.x > 200 && inimigo.ida === false) {
            console.log('define a direção no caso esquerda')
            inimigo.x -= 5;
        }
    }
    
}