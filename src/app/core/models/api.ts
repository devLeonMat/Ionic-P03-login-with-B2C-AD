export interface ApiRealEstate {
    getSpeakers: () => string;
}

export class Api {
    public realEstate: ApiRealEstate = {
        getSpeakers: () => `speakers`,
    };
}

export const protocolRegExp = {
    httpOrHttps: '^(http|https)://',
};
