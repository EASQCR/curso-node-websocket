const express = require('express');
const cors = require('cors');
const { sockerController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi app.
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio Público.
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.paths.auth,       require('../routes/auth'));
        // this.app.use(this.paths.buscar,     require('../routes/buscar'));
        // this.app.use(this.paths.categorias, require('../routes/categorias'));
        // this.app.use(this.paths.productos,  require('../routes/productos'));
        // this.app.use(this.paths.uploads,    require('../routes/uploads'));
        // this.app.use(this.paths.usuarios,   require('../routes/user'));
    }

    sockets() {

        this.io.on('connection', sockerController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });        
    }

}

module.exports = Server;