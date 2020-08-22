export class BlogPost {
    status: string[];
    _id: string;
    content: string;
    title: string;
    author: string;
    Created_date: string;
    preview: string;
    file: any;

    //assign vals from json to properties
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
