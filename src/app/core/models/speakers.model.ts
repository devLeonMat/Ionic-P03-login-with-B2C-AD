export class SpeakersModel {
    collection: Collection;
}

export class Collection {
    version: string;
    href: string;
    links: any[];
    items: Item[];
    queries: any[];
    template: Template;
}

export class Template {
    data: any[];
}

export class Item {
    href: string;
    data: Datum[];
    links: Link[];
}

export class Link {
    rel: string;
    href: string;
}

export class Datum {
    name: string;
    value: string;
}
