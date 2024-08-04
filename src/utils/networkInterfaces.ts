'use strict';

import { networkInterfaces, NetworkInterfaceInfo } from 'os';

export const getNetworkInterfaces = (): { [key: string]: string[] } => {
    const nets = networkInterfaces();
    const results: { [key: string]: string[] } = {};

    for (const name of Object.keys(nets)) {
        const netInfo = nets[name];
        if (netInfo) {
            for (const net of netInfo) {
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
                if (net.family === familyV4Value && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                }
            }
        }
    }

    return results;
};

export const getNetworkInterfacesArray = (): string[] => {
    const nets = networkInterfaces();
    const results: string[] = [];

    for (const name of Object.keys(nets)) {
        const netInfo = nets[name];
        if (netInfo) {
            for (const net of netInfo) {
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
                if (net.family === familyV4Value && !net.internal) {
                    results.push(net.address);
                }
            }
        }
    }

    return results;
};
