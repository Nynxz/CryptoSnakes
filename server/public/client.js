import { NetworkManager} from './connections.js';
import { Snake } from './snake.js';


class ClientManager{

    Application = PIXI.Application;
    app = new this.Application({
        width: 1200,
        height: 1200,
        transparent: true,
        antialias: true
    });

    

    constructor(){

        this.networkManager = new NetworkManager(this, '127.0.0.1:3000')

        this.setup()

        
        this.players = {}
        //Move to Interaction Manager
        this.mouse = this.app.renderer.plugins.interaction.mouse.global;
        //this.personalHand = PIXI.Sprite.from('./assets/hand.png');
        this.USERS = {}
        console.log("Setup Complete");
    }

    setup() {
        console.log("Setting Up Client Manager");

        document.getElementById('display').appendChild(this.app.view);
        //window.onresize = this.resizeWindow.bind(this);

        this.app.ticker.add(delta => this.loop(delta));

        
        this.playerSnake = new Snake(25);
        this.app.stage.addChild(this.playerSnake.snakeContainer)

        //#region 
        // this.socket.on('InitUsers', (data) => {
        //     console.log("INIT")
        //     // for(let [k, v] of Object.entries(data)) {
        //     //     this.USERS[k] = {
        //     //         hand: PIXI.Sprite.from('./assets/hand.png'),
        //     //         x: 0,
        //     //         y: 0
        //     //     }
        //     //     this.app.stage.addChild(this.USERS[k].hand)
        //     // }
        // })

        // this.socket.on('NewUser', (id) => {
        //     this.USERS[id] = {
        //         hand: PIXI.Sprite.from('./assets/hand.png'),
        //         x: 0,
        //         y: 0
        //     }
        //     this.app.stage.addChild(this.USERS[id].hand)
        // })

        // this.socket.on('RemoveUser', (id) => {
        //     this.app.stage.removeChild(this.USERS[id].hand)

        //     delete this.USERS[id]
        // })

        // this.socket.on('AllUsers', (data) => {
        //     console.log(data)
        //     //console.log(this.USERS)
        //     for(let [k, v] of Object.entries(data)) {
        //         if(k != undefined && v != undefined && this.USERS[k]){
        //         //console.log(k)
        //         console.log(this.USERS[k])
        //         this.USERS[k].hand.position.x = v.x
        //         this.USERS[k].hand.position.y = v.y
        //         this.USERS[k].x = v.x
        //         this.USERS[k].y = v.y
        //         }
        //     }
        // })
        //#endregion
        this.networkManager.socket.on('AllPlayers', players => {
            for (const [key, value] of Object.entries(players)) {
                if(!this.players[key]){
                    if(key != this.networkManager.socket.id){
                        let body = new PIXI.SimpleRope(PIXI.Texture.from('/assets/snake2.png'), value);
                        this.players[key] = {body: body};
                        this.app.stage.addChild(this.players[key].body)

                    }



                } else{
                    this.players[key].body.geometry.points = value
                }
            }
        })
    }

    loop(delta) {
        this.playerSnake.draw();
        this.playerSnake.moveTowards(this.mouse.x, this.mouse.y, delta)


        //this.socket.emit('UserMouse', {x: this.mouse.x, y: this.mouse.y})
        // this.personalHand.position.x = this.mouse.x
        // this.personalHand.position.y = this.mouse.y

        this.networkManager.socket.emit('PlayerMovement', this.playerSnake.points)
    }



    // Helpers
    resizeWindow() {
        console.log("RESIZING")
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

}

export {ClientManager}