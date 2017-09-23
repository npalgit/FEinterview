class Watcher{
    constructor(options) {
        this.key = options.key;
        this.observer = options.observer;
        this.callback = options.callback;
        this.get();
    }

    get() {
        Dep.target = this;
        let value = this.observer.data[this.key];
        if (typeof value === 'object') {
            this.dfs(value);
        }
        Dep.target = null;
        return value;
    }

    dfs(obj) {
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr) && typeof obj[attr] === 'object') {
                this.dfs(obj[attr]);
            }
        }
    }

    update() {
        this.callback.call(this.observer, this.get())
    }
}