const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.ultimosCuatro
        });

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.ultimosCuatro
    });

    // client.on('actualizarUltimosCuatro', () => {
    //     client.broadcast.emit('estadoActual', {
    //         actual: ticketControl.getUltimoTicket(),
    //         ultimosCuatro: ticketControl.ultimosCuatro
    //     });
    // });

});