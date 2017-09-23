class Dep{
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        if (this.subs.indexOf(sub) == -1) {
            this.subs.push(sub);
        }
    }
    
    notify() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}
Dep.target = null;