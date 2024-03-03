class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('go', 'assets/pixelfundooo.png');
        this.load.image('rest', 'assets/restar.png');
        this.load.image('over', 'assets/thx.png');
        this.load.image('acaba', 'assets/perdeu.png');
    }

    create() {
        
        this.add.image(700, 400, 'go').setScale(1.1);
        this.add.image(600, 300, 'over').setScale(1.0);
        this.add.image(600, 475, 'acaba').setScale(1.2);
        this.restBt = this.add.image(250, 500, 'rest').setScale(0.7).setOrigin(0, 0).setInteractive();

        this.restBt.on('pointerdown', () => {
            this.scene.start('Tut', this.game);
        });
    }

    update() {
        // Lógica de atualização da cena
    }
}