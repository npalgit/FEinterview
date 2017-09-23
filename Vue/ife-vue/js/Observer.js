class Observer {
    constructor (data) {
        this.data = data;
        this.dep = new Dep();
        this.walk(data);
    }

    walk() {
        for (let key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                let value = this.data[key];
                if (typeof value === 'object') {
                    new Observer(value);
                }
                this.convert(key, value);
            }
        }
    }

    convert(key, value) {
        let self = this;

        Object.defineProperty(self.data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if (Dep.target) {
                    self.dep.addSub(Dep.target);
                }
                return value;
            },
            set: function(newVal) {
                if (typeof newVal === 'object') {
                    new Observer(newVal);
                }
                value = newVal;
                self.dep.notify();
            }
        });
    }
    
    $watch(key, fn) {
        new Watcher({
            observer: this,
            key: key,
            callback: fn
        });
    }
}