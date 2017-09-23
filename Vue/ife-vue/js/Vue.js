class Vue{
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        this._observer = new Observer(this);
        this._observer.$watch('$data', this.render.bind(this));
        this._originHtml = this.$el.innerHTML;
        this.render();
    }

    render() {
        let self = this,
            inner = self._originHtml,
            reg = /.*({{(.*)?}})/g,
            result = null,
            origin = inner;
        while(result = reg.exec(origin)) {
            let str = result[1],
            key = result[2].trim(),
            value = '';
            value = self.getValue(key, self.$data);
            inner = inner.replace(str, value);
        }
        self.$el.innerHTML = inner;
    }

    getValue(key, data) {
        let keys = key.split('.');
        for (let item of keys) {
            if (data === undefined) {
                return undefined;
            } 
            data = data[item];
        }
        return data;
    }

}