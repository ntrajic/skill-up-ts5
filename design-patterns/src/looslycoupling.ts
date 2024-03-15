interface Post {
    id: number;
    title: string;
    body: string;
    postedBy: string;
}

interface IExportPostsService {
    export(post: Post[]): string;
}

interface IPostsService {
    getAll(): Promise<Post[]>;
    save(post: Post): Promise<void>;
    export(service: IExportPostsService): Promise<string>;
}

// implementations

class NewsFeed {
    constructor(private _service: IPostsService) {
    }
    show() {
        this._service.getAll().then( (posts: Post[]) => {
            posts.forEach(post => {
                console.log(`${post.title} - ${post.body}`);
            });
        });
    }
}

class JsonExportService implements IExportPostsService {
    export(posts: Post[]): string {
        return JSON.stringify(posts);
    }
}

class MockPostsService implements IPostsService {
    posts: Post[] = [];
    constructor() {
        this.posts = [
            { id: 1, title: 'Test Post 1', body: 'Test Post 1', postedBy: 'Me' },
            { id: 2, title: 'Test Post 2', body: 'Test Post 2', postedBy: 'Me' },
            { id: 3, title: 'Test Post 3', body: 'Test Post 3', postedBy: 'Me' },
            { id: 4, title: 'Test Post 4', body: 'Test Post 4', postedBy: 'Me' },
        ];
    }
    getAll(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }
    save(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }

    export(service: IExportPostsService): Promise<string> {
        return this.getAll().then(posts => service.export(posts));
    }
}


// MAINLINE
let mockService = new MockPostsService();
mockService.export(new JsonExportService()).then(result => console.log(result));


// \design-patterns> tsc
// \design-patterns> node .\build\looslycoupling.js
// OUT:
// [{"id":1,"title":"Test Post 1","body":"Test Post 1","postedBy":"Me"},{"id":2,"title":"Test Post 2","body":"Test Post 2","postedBy":"Me"},{"id":3,"title":"Test Post 3","body":"Test Post 3","postedBy":"Me"},{"id":4,"title":"Test Post 4","body":"Test Post 4","postedBy":"Me"}]