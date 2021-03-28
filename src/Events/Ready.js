const Base = require("../Base/Event"),
    { Client } = global,
    cfg = require('../../config.json');

class Ready extends Base {
    constructor(client) {
        super({ 
            Name: "ready"
        });
    }
    async Execute() {
        console.log(`${Client.user.tag} başarıyla giriş yaptı!`);
       Client.user.setPresence({ activity: { name: cfg.Bot.status }, status: "idle" });
    }
}

module.exports = Ready;
