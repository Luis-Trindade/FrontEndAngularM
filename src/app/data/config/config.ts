

export class Config {
    SERVICES_ENDPOINT = {
        services_host: 'localhost',
        services_port: 3000
    };

    constructor() {
    }

    public getHost() { return this.SERVICES_ENDPOINT.services_host; };
    public getPort() { return this.SERVICES_ENDPOINT.services_port; };
}
