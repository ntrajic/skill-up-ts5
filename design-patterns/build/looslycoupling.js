"use strict";
// implementations
class NewsFeed {
    _service;
    constructor(_service) {
        this._service = _service;
    }
    show() {
        this._service.getAll().then((posts) => {
            posts.forEach(post => {
                console.log(`${post.title} - ${post.body}`);
            });
        });
    }
}
class JsonExportService {
    export(posts) {
        return JSON.stringify(posts);
    }
}
class MockPostsService {
    posts = [];
    constructor() {
        this.posts = [
            { id: 1, title: 'Test Post 1', body: 'Test Post 1', postedBy: 'Me' },
            { id: 2, title: 'Test Post 2', body: 'Test Post 2', postedBy: 'Me' },
            { id: 3, title: 'Test Post 3', body: 'Test Post 3', postedBy: 'Me' },
            { id: 4, title: 'Test Post 4', body: 'Test Post 4', postedBy: 'Me' },
        ];
    }
    getAll() {
        return Promise.resolve(this.posts);
    }
    save(post) {
        this.posts.push(post);
        return Promise.resolve();
    }
    export(service) {
        return this.getAll().then(posts => service.export(posts));
    }
}
// MAINLINE
let mockService = new MockPostsService();
mockService.export(new JsonExportService()).then(result => console.log(result));
