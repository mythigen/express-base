import net from "net";

export function isPortInUse(port: number, host: string) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.once('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
                resolve(true);
            } else {
                reject(err);
            }
        });
        server.once('listening', () => {
            server.close();
            resolve(false);
        });
        server.listen(port, host);
    });
};

