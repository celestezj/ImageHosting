var dydbsx = localStorage.getItem('dydaibanshixiang');
dydbsx = JSON.parse(dydbsx);

new Vue ({
	el: '#taskList',
	data: {
		title: 'to do list',
		tasks: dydbsx ? dydbsx : []
	},
	methods: {
		newItem: function() {
			if (!this.tasks.name) {
				return
			}
			this.tasks.push ( {
				name: this.tasks.name,
                checked: false,
				del: ''
			});
            this.tasks.name = "";
            localStorage.setItem('dydaibanshixiang',JSON.stringify(this.tasks));
		},
        setItem: function (task) {
            var curdbsxstat = this.tasks[this.tasks.indexOf(task)].checked;
            this.tasks[this.tasks.indexOf(task)].checked = curdbsxstat ? false : true;
            localStorage.setItem('dydaibanshixiang',JSON.stringify(this.tasks));
        },
		delItem: function (task) {
			this.tasks.splice(this.tasks.indexOf(task), 1);
            localStorage.setItem('dydaibanshixiang',JSON.stringify(this.tasks));
            updatedbsxstat(this.tasks);
		}
	}
})

function updatedbsxstat(newestdbsx){
    var taskList = document.getElementById('taskList');
    var taskListLi = taskList.lastChild.childNodes;
    for(var i=0; i<(newestdbsx?(taskListLi.length>newestdbsx.length?newestdbsx.length:taskListLi.length):taskListLi.length); i++){
        taskListLi[i].firstChild.firstChild.checked=newestdbsx[i].checked;
    }
}
updatedbsxstat(dydbsx);