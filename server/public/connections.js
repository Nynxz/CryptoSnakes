class NetworkManager {
    //SERVER_URL = '127.0.0.1:3000';
    
    constructor(ClientManager, URL){
        this.clientManager = ClientManager

        console.log("Connecting to Socket");
        this.SERVER_URL = URL;
        this.socket = io.connect(this.SERVER_URL); 
        this.setupNetwork();
    }

    setupNetwork() {
        this.socket.emit('connected')

        this.socket.on('Init', data => {
            console.log("Setting Up Game");
            console.log(data)
        });

        this.socket.on('NewUser', id => {
            console.log("New User Connected");

        });

        
        this.socket.on('RemoveUser', (id) => {
            console.log("User Disconnected");

        });
    }

}

// On Join

// On User Join

// On User Leave

export {NetworkManager}