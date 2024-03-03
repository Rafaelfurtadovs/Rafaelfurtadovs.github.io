//cria a classe menu

class Tut extends Phaser.Scene {
    constructor() {
        super({ key: 'Tut' });
    }
    //faz o preload dos assets do tutorial
    preload() {
        this.load.image('bg', 'assets/ground.png');
        this.load.image('playy', 'assets/pli.png');
        this.load.image('use', 'assets/use.png');
        this.load.image('touch', 'assets/touch.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('ex', 'assets/mall.png');
        this.load.image('cair', 'assets/cair.png');
        this.load.image('moeda', 'assets/moeda.png');
        
    }
    //cria os assets do tutorial
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(700, 400, 'bg').setScale(1.1);
        this.add.image(600, 170, 'use').setScale(0.7);
        this.add.image(420, 350, 'touch').setScale(0.3);
        this.add.image(490, 430, 'cair').setScale(0.45);
        this.add.image(750, 430, 'moeda').setScale(1.0);
        this.add.image(600, 350, 'ex').setScale(3.0);
        this.add.image(585, 170, 'arrow').setScale(1.3);
        this.playBt = this.add.image(400, 500, 'playy').setScale(0.4).setOrigin(0, 0).setInteractive();
        //quando voce clicar no botao play voce vai para a cena jogo
        this.playBt.on('pointerdown', () => {
            this.scene.start('Jogo', this.game);
        });
    }

    update() {
        // Lógica de atualização da cena
    }
}