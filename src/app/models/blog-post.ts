export class BlogPost {
    status: string[];
    _id: string;
    content: string;
    title: string;
    author: string;
    Created_date: string;
    file: any;

    //assign vals from json to properties
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
