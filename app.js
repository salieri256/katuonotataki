const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const ASSETS = {
    image: {
        "katuo": "./img/katuo.png",
        "tataki": "./img/tataki.png"
    }
};

phina.globalize();// phina.js をグローバルに展開

phina.define("HomeScene", {
    superClass: "DisplayScene",

    // 呼び出される度に実行
    init: function(option) {
        this.superInit(option);

        this.backgroundColor = "pink";

        const x = this.gridX;
        const y = this.gridY;

        const label = Label({
            text: "タッチしてスタート！",
            fill: "black",
            fontSize: 40
        }).addChildTo(this);
        label.setPosition(x.center(), y.center());
    },

    // キーが押されたとき
    onkeydown: function(e) {
        // spaceキーが押されたらシーン遷移
        if(e.keyCode === 32) {
            this.exit();
        }
    },

    // タッチされたとき
    onpointstart: function() {
        // タッチされたらシーン遷移
        this.exit();
    }
});

phina.define("PlayingScene", {
    superClass: "DisplayScene",

    // 呼び出される度に実行
    init: function(option) {
        this.superInit(option);

        const x = this.gridX;
        const y = this.gridY;

        this.frame = 0;// 経過フレーム数

        this.attack = 0;// 何回たたいたか

        // カツオの画像を表示
        const katuoImage = Sprite("katuo").addChildTo(this);
        katuoImage.setPosition(x.center(), y.center());
        katuoImage.width = SCREEN_WIDTH;
        katuoImage.height = SCREEN_HEIGHT;

        // "文字を表示"
        const label = Label({
            text: "たたけ！！",
            fill: "black",
            fontSize: 60
        }).addChildTo(this);
        label.setPosition(x.center(), y.center());
    },

    // キーが押されたとき
    onkeydown: function(e) {
        if(e.keyCode === 32) {
            this.attack++;
        }
    },

    // タッチされたとき
    onpointstart: function() {
        this.attack++;
    },

    // 毎フレーム実行
    update: function() {
        this.frame++;

        if(this.frame === 300) {
            this.exit({
                attack: this.attack
            });
        }
    }
});

phina.define("ResultScene", {
    superClass: "DisplayScene",

    // 呼び出される度に実行
    init: function(option) {
        this.superInit(option);

        const x = this.gridX;
        const y = this.gridY;

        // カツオのタタキの画像を表示
        const tatakiImage = Sprite("tataki").addChildTo(this);
        tatakiImage.setPosition(x.center(), y.center());
        tatakiImage.width = SCREEN_WIDTH;
        tatakiImage.height = SCREEN_HEIGHT;

        // 叩いた数を表示
        const label = Label({
            text: option.attack,
            fill: "black",
            fontSize: 60
        }).addChildTo(this);
        label.setPosition(x.center(), y.center());
    }
});

// メイン
phina.main(function() {
    // アプリを生成
    const app = GameApp({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,

        // 最初に呼び出されるシーン
        startLabel: "home",

        // シーンリスト
        scenes: [
            {
                className: "HomeScene",
                label: "home",
                nextLabel: "playing"
            },
            {
                className: "PlayingScene",
                label: "playing",
                nextLabel: "result"
            },
            {
                className: "ResultScene",
                label: "result",
                nextLabel: "home"
            },
        ]
    });

    // 設定
    app.fps = 60;// fps
    app.enableStats();// fps表示
    app.backgroundColor = "black";// 背景色

    // アプリを実行
    app.run();
});