

    //cria classe menu
class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
       //parte preload menu
        this.load.image('bg', 'assets/ground.png');
        this.load.image('pl', 'assets/tuto.png');
        this.load.image('ike', 'assets/gc.png');
        this.load.image('lepinu', 'assets/lepinu.png');

        //parte preload tut

        this.load.image('bg', 'assets/ground.png');
        this.load.image('playy', 'assets/pli.png');
        this.load.image('use', 'assets/use.png');
        this.load.image('touch', 'assets/touch.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('ex', 'assets/mall.png');
        this.load.image('cair', 'assets/cair.png');
        this.load.image('moeda', 'assets/moedaa.png');

        //parte preload game
        this.load.image('lep', 'assets/pixelfundo.png');
        this.load.spritesheet('metinha', 'assets/verda.png', { frameWidth: 21.8, frameHeight: 31 });
        this.load.image('plat', 'assets/platform.png');
        this.load.image('speed', 'assets/speedpixel.png');
        this.load.image('moeda', 'assets/moedaa.png');
        this.load.image('lightt', 'assets/raip.png');
        this.load.spritesheet('bird', 'assets/mal.png', { frameWidth: 21.8, frameHeight: 31 });

        //parte preload gameov
        this.load.image('go', 'assets/pixelfundooo.png');
        this.load.image('rest', 'assets/restar.png');
        this.load.image('over', 'assets/thx.png');
        this.load.image('acaba', 'assets/perdeu.png');
    }
        //cria os objetos do menu
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(700, 400, 'bg').setScale(1.1);
        this.add.image(600, 250, 'ike').setScale(0.7);
        this.add.image(570, 450, 'lepinu').setScale(1.0);
        this.playBt = this.add.image(250, 500, 'pl').setScale(0.7).setOrigin(0, 0).setInteractive();
        //quando o botao for clicado voce troca para cena tut
        this.playBt.on('pointerdown', () => {
            this.scene.start('Tut', this.game);
        });
    }

    update() {
        // Lógica de atualização da cena
    }
}