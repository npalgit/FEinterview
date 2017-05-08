Vue.component('work', {
    props: ['item'],
    template: `<div class="row">
                <input type="checkbox" />
                <span class="word">1. 早上去公园跑步</span>
                <button v-show="finish"> finish</button>
                <button>delete</button>
              </div>`
});

let app = new Vue({
    el: "#app",
    data: {
        task: {
            content: '',
            finished: false,
            deleted: false
        },
        list: []
    },
    methods: {
        addTask() {
            this.list.push(this.task);
            this.task = {
                content: '',
                finished: false,
                deleted: false
            }
        },
        finish(index) {
            //为什么不能直接修改this.task.finished????????
            let cur = this.list[index].finished;
            this.list[index].finished = !cur;
        },
        remove(index) {
            this.list.splice(index, 1);
        }
    }
});