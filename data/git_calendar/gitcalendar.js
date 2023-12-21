/*
  gitcalendar_simplemode设为true时使用canvas绘制gitgitcalendar，
                        设为false时使用svg绘制gitgitcalendar
                        canvas：dom数少，但图像会发生模糊，自适应一般
                        svg：dom数多，图像清晰，自适应更佳
  gitcalendar_user是你的github用户名
  gitcalendar_apiurl留空为默认公共API，自建api内容详见https://akilar.top/posts/1f9c68c9/
  gitcalendar_color从以下选择一个即可：
                   ['#e4dfd7', '#f9f4dc', '#f7e8aa', '#f7e8aa', '#f8df72', '#fcd217', '#fcc515', '#f28e16', '#fb8b05', '#d85916', '#f43e06'] #橘黄色调
                   ['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f'] #浅紫色调
                   ['#ebedf0', '#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620'] #翠绿色调
                   ['#ebedf0', '#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c'] #天青色调
*/
if (document.getElementById("gitcalendar")){
  var gitcalendar_simplemode = false;
  var gitcalendar_user = "muggledy";
  var gitcalendar_apiurl = 'calendargh.muggledy.top'; //可采用小冰老师的公开API爬取数据（置空），或自建（python-github-calendar-api-rho.vercel.app或者python-github-calendar-api.vercel.app）
  var gitcalendar_color = ['#ebedf0', '#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620'];
  var gitcalendar = new Vue({
    el: '#gitcalendar',
    data: {
      simplemode: gitcalendar_simplemode, 
      user: gitcalendar_user,
      fixed: 'fixed',
      px: 'px',
      x: '',
      y: '',
      span1: '',
      span2: '',
      month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthchange: [],
      oneyearbeforeday: '',
      thisday: '',
      amonthago: '',
      aweekago: '',
      weekdatacore: 0,
      datacore: 0,
      total: 0,
      datadate: '',
      data: [],
      positionplusdata: [],
      firstweek: [],
      lastweek: [],
      beforeweek: [],
      thisweekdatacore: 0,
      mounthbeforeday: 0,
      mounthfirstindex: 0,
      crispedges: 'crispedges',
      thisdayindex: 0,
      amonthagoindex: 0,
      amonthagoweek: [],
      firstdate: [],
      first2date: [],
      montharrbefore: [],
      monthindex: 0,
      color: gitcalendar_color
    },
    methods: {
      resetData: function () {
        // 创建一个包含默认值的对象
        var defaultData = {simplemode: gitcalendar_simplemode,user: gitcalendar_user,fixed: 'fixed',px: 'px',x: '',y: '',span1: '',span2: '',month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],monthchange: [],oneyearbeforeday: '',thisday: '',amonthago: '',aweekago: '',weekdatacore: 0,datacore: 0,total: 0,datadate: '',data: [],positionplusdata: [],firstweek: [],lastweek: [],beforeweek: [],thisweekdatacore: 0,mounthbeforeday: 0,mounthfirstindex: 0,crispedges: 'crispedges',thisdayindex: 0,amonthagoindex: 0,amonthagoweek: [],firstdate: [],first2date: [],montharrbefore: [],monthindex: 0,color: gitcalendar_color};
        // 使用 Object.assign 将数据重置为默认值
        Object.assign(this.$data, defaultData);
      },
      selectStyle(data, event) {
        document.querySelector('.angle-wrapper').style.display = 'block'
        this.span1 = data.date;
        this.span2 = data.count;
        this.x = event.clientX - 100;
        this.y = event.clientY - 60
      },
      outStyle() {
        document.querySelector('.angle-wrapper').style.display = 'none'
      },
      thiscolor(x) {
        if (x === 0) {
          let i = parseInt(x / 2);
          return this.color[0]
        } else if (x < 2) {
          return this.color[1]
        } else if (x < 20) {
          let i = parseInt(x / 2);
          return this.color[i]
        } else {
          return this.color[9]
        }
      },
    }
  });
  var apiurl = gitcalendar_apiurl ? 'https://'+ gitcalendar_apiurl +'/api?' : 'https://githubapi.ryanchristian.dev/user/'
  var githubapiurl = apiurl + gitcalendar.user;
  //canvas绘图
  function responsiveChart() {
    let c = document.getElementById("gitcanvas");
    if (c) {
      let cmessage = document.getElementById("gitmessage");
      let ctx = c.getContext("2d");
      c.width = document.getElementById("gitcalendarcanvasbox").offsetWidth;
      let linemaxwitdh = 0.96 * c.width / gitcalendar.data.length;
      c.height = 9 * linemaxwitdh;
      let lineminwitdh = 0.8 * linemaxwitdh;
      let setposition = {
        x: 0.02 * c.width,
        y: 0.025 * c.width
      };
      for (let week in gitcalendar.data) {
        weekdata = gitcalendar.data[week];
        for (let day in weekdata) {
          let dataitem = {
            date: "",
            count: "",
            x: 0,
            y: 0
          };
          gitcalendar.positionplusdata.push(dataitem);
          ctx.fillStyle = gitcalendar.thiscolor(weekdata[day].count);
          setposition.y = Math.round(setposition.y * 100) / 100;
          dataitem.date = weekdata[day].date;
          dataitem.count = weekdata[day].count;
          dataitem.x = setposition.x;
          dataitem.y = setposition.y;
          ctx.fillRect(setposition.x, setposition.y, lineminwitdh, lineminwitdh);
          setposition.y = setposition.y + linemaxwitdh
        };
        setposition.y = 0.025 * c.width;
        setposition.x = setposition.x + linemaxwitdh
      };
      ctx.font = "600  Arial";
      ctx.fillStyle = '#aaa';
      ctx.fillText("日", 0, 1.9 * linemaxwitdh);
      ctx.fillText("二", 0, 3.9 * linemaxwitdh);
      ctx.fillText("四", 0, 5.9 * linemaxwitdh);
      ctx.fillText("六", 0, 7.9 * linemaxwitdh);
      let monthindexlist = c.width / 24;
      for (let index in gitcalendar.monthchange) {
        ctx.fillText(gitcalendar.monthchange[index], monthindexlist, 0.7 * linemaxwitdh);
        monthindexlist = monthindexlist + c.width / 12
      };
      cmessage.onmousemove = function(event) {
        document.querySelector('.angle-wrapper').style.display = 'none'
      };
      c.onmousemove = function(event) {
        document.querySelector('.angle-wrapper').style.display = 'none'
        getMousePos(c, event);
      };
  
      function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left * (canvas.width / rect.width);
        var y = event.clientY - rect.top * (canvas.height / rect.height);
        //console.log("x:"+x+",y:"+y);
        for (let item of gitcalendar.positionplusdata) {
          let lenthx = x - item.x;
          let lenthy = y - item.y;
          //console.log(lenthx,lenthy);
          if (0 < lenthx && lenthx < lineminwitdh) {
            if (0 < lenthy && lenthy < lineminwitdh) {
              //console.log(item.date,item.count)
              document.querySelector('.angle-wrapper').style.display = 'block'
              gitcalendar.span1 = item.date;
              gitcalendar.span2 = item.count;
              gitcalendar.x = event.clientX - 100;
              gitcalendar.y = event.clientY - 60
            }
          }
          //if(0< x - item.x <lineminwitdh&&0< y - item.y <lineminwitdh){
          //console.log(item.count,item.date);
          //}
        }
      }
    }
  }
  //数据统计算法
  function addlastmonth() {
    if (gitcalendar.thisdayindex === 0) {
      thisweekcore(52);
      thisweekcore(51);
      thisweekcore(50);
      thisweekcore(49);
      thisweekcore(48);
      gitcalendar.thisweekdatacore += gitcalendar.firstdate[6].count;
      gitcalendar.amonthago = gitcalendar.firstdate[6].date
    } else {
      thisweekcore(52);
      thisweekcore(51);
      thisweekcore(50);
      thisweekcore(49);
      thisweek2core();
      gitcalendar.amonthago = gitcalendar.first2date[gitcalendar.thisdayindex - 1].date
    }
  };
  
  function thisweek2core() {
    for (let i = gitcalendar.thisdayindex - 1; i < gitcalendar.first2date.length; i++) {
      gitcalendar.thisweekdatacore += gitcalendar.first2date[i].count
    }
  };
  
  function thisweekcore(index) {
    for (let item of gitcalendar.data[index]) {
      gitcalendar.thisweekdatacore += item.count
    }
  };
  
  function addlastweek() {
    for (let item of gitcalendar.lastweek) {
      gitcalendar.weekdatacore += item.count
    }
  };
  
  function addbeforeweek() {
    for (let i = gitcalendar.thisdayindex; i < gitcalendar.beforeweek.length; i++) {
      gitcalendar.weekdatacore += gitcalendar.beforeweek[i].count
    }
  };
  
  function addweek(data) {
    if (gitcalendar.thisdayindex === 6) {
      gitcalendar.aweekago = gitcalendar.lastweek[0].date;
      addlastweek()
    } else {
      lastweek = data.contributions[51];
      gitcalendar.aweekago = lastweek[gitcalendar.thisdayindex + 1].date;
      addlastweek();
      addbeforeweek()
    }
  }

  //需不定期更新此json字符串数据
  var oldbackupgitcalendardata = '{"total": 207, "contributions": [[{"date": "2022-05-22", "count": 0}, {"date": "2022-05-23", "count": 0}, {"date": "2022-05-24", "count": 0}, {"date": "2022-05-25", "count": 2}, {"date": "2022-05-26", "count": 0}, {"date": "2022-05-27", "count": 0}, {"date": "2022-05-28", "count": 0}], [{"date": "2022-05-29", "count": 0}, {"date": "2022-05-30", "count": 0}, {"date": "2022-05-31", "count": 0}, {"date": "2022-06-01", "count": 0}, {"date": "2022-06-02", "count": 0}, {"date": "2022-06-03", "count": 23}, {"date": "2022-06-04", "count": 0}], [{"date": "2022-06-05", "count": 0}, {"date": "2022-06-06", "count": 0}, {"date": "2022-06-07", "count": 0}, {"date": "2022-06-08", "count": 0}, {"date": "2022-06-09", "count": 2}, {"date": "2022-06-10", "count": 6}, {"date": "2022-06-11", "count": 0}], [{"date": "2022-06-12", "count": 0}, {"date": "2022-06-13", "count": 0}, {"date": "2022-06-14", "count": 0}, {"date": "2022-06-15", "count": 0}, {"date": "2022-06-16", "count": 0}, {"date": "2022-06-17", "count": 0}, {"date": "2022-06-18", "count": 0}], [{"date": "2022-06-19", "count": 0}, {"date": "2022-06-20", "count": 0}, {"date": "2022-06-21", "count": 0}, {"date": "2022-06-22", "count": 0}, {"date": "2022-06-23", "count": 0}, {"date": "2022-06-24", "count": 0}, {"date": "2022-06-25", "count": 0}], [{"date": "2022-06-26", "count": 0}, {"date": "2022-06-27", "count": 0}, {"date": "2022-06-28", "count": 14}, {"date": "2022-06-29", "count": 0}, {"date": "2022-06-30", "count": 0}, {"date": "2022-07-01", "count": 0}, {"date": "2022-07-02", "count": 0}], [{"date": "2022-07-03", "count": 0}, {"date": "2022-07-04", "count": 0}, {"date": "2022-07-05", "count": 0}, {"date": "2022-07-06", "count": 0}, {"date": "2022-07-07", "count": 0}, {"date": "2022-07-08", "count": 0}, {"date": "2022-07-09", "count": 0}], [{"date": "2022-07-10", "count": 0}, {"date": "2022-07-11", "count": 0}, {"date": "2022-07-12", "count": 0}, {"date": "2022-07-13", "count": 0}, {"date": "2022-07-14", "count": 0}, {"date": "2022-07-15", "count": 0}, {"date": "2022-07-16", "count": 0}], [{"date": "2022-07-17", "count": 0}, {"date": "2022-07-18", "count": 0}, {"date": "2022-07-19", "count": 0}, {"date": "2022-07-20", "count": 0}, {"date": "2022-07-21", "count": 0}, {"date": "2022-07-22", "count": 0}, {"date": "2022-07-23", "count": 0}], [{"date": "2022-07-24", "count": 0}, {"date": "2022-07-25", "count": 0}, {"date": "2022-07-26", "count": 0}, {"date": "2022-07-27", "count": 0}, {"date": "2022-07-28", "count": 0}, {"date": "2022-07-29", "count": 0}, {"date": "2022-07-30", "count": 0}], [{"date": "2022-07-31", "count": 0}, {"date": "2022-08-01", "count": 0}, {"date": "2022-08-02", "count": 0}, {"date": "2022-08-03", "count": 0}, {"date": "2022-08-04", "count": 0}, {"date": "2022-08-05", "count": 0}, {"date": "2022-08-06", "count": 0}], [{"date": "2022-08-07", "count": 0}, {"date": "2022-08-08", "count": 0}, {"date": "2022-08-09", "count": 0}, {"date": "2022-08-10", "count": 0}, {"date": "2022-08-11", "count": 0}, {"date": "2022-08-12", "count": 0}, {"date": "2022-08-13", "count": 0}], [{"date": "2022-08-14", "count": 0}, {"date": "2022-08-15", "count": 0}, {"date": "2022-08-16", "count": 0}, {"date": "2022-08-17", "count": 0}, {"date": "2022-08-18", "count": 0}, {"date": "2022-08-19", "count": 0}, {"date": "2022-08-20", "count": 0}], [{"date": "2022-08-21", "count": 0}, {"date": "2022-08-22", "count": 0}, {"date": "2022-08-23", "count": 0}, {"date": "2022-08-24", "count": 0}, {"date": "2022-08-25", "count": 0}, {"date": "2022-08-26", "count": 0}, {"date": "2022-08-27", "count": 0}], [{"date": "2022-08-28", "count": 0}, {"date": "2022-08-29", "count": 0}, {"date": "2022-08-30", "count": 0}, {"date": "2022-08-31", "count": 0}, {"date": "2022-09-01", "count": 0}, {"date": "2022-09-02", "count": 0}, {"date": "2022-09-03", "count": 0}], [{"date": "2022-09-04", "count": 0}, {"date": "2022-09-05", "count": 0}, {"date": "2022-09-06", "count": 0}, {"date": "2022-09-07", "count": 0}, {"date": "2022-09-08", "count": 0}, {"date": "2022-09-09", "count": 0}, {"date": "2022-09-10", "count": 0}], [{"date": "2022-09-11", "count": 0}, {"date": "2022-09-12", "count": 0}, {"date": "2022-09-13", "count": 0}, {"date": "2022-09-14", "count": 0}, {"date": "2022-09-15", "count": 0}, {"date": "2022-09-16", "count": 0}, {"date": "2022-09-17", "count": 0}], [{"date": "2022-09-18", "count": 0}, {"date": "2022-09-19", "count": 0}, {"date": "2022-09-20", "count": 0}, {"date": "2022-09-21", "count": 0}, {"date": "2022-09-22", "count": 0}, {"date": "2022-09-23", "count": 0}, {"date": "2022-09-24", "count": 0}], [{"date": "2022-09-25", "count": 0}, {"date": "2022-09-26", "count": 0}, {"date": "2022-09-27", "count": 0}, {"date": "2022-09-28", "count": 0}, {"date": "2022-09-29", "count": 0}, {"date": "2022-09-30", "count": 0}, {"date": "2022-10-01", "count": 0}], [{"date": "2022-10-02", "count": 0}, {"date": "2022-10-03", "count": 0}, {"date": "2022-10-04", "count": 0}, {"date": "2022-10-05", "count": 0}, {"date": "2022-10-06", "count": 0}, {"date": "2022-10-07", "count": 0}, {"date": "2022-10-08", "count": 0}], [{"date": "2022-10-09", "count": 0}, {"date": "2022-10-10", "count": 0}, {"date": "2022-10-11", "count": 0}, {"date": "2022-10-12", "count": 0}, {"date": "2022-10-13", "count": 0}, {"date": "2022-10-14", "count": 0}, {"date": "2022-10-15", "count": 0}], [{"date": "2022-10-16", "count": 0}, {"date": "2022-10-17", "count": 0}, {"date": "2022-10-18", "count": 0}, {"date": "2022-10-19", "count": 0}, {"date": "2022-10-20", "count": 0}, {"date": "2022-10-21", "count": 0}, {"date": "2022-10-22", "count": 0}], [{"date": "2022-10-23", "count": 0}, {"date": "2022-10-24", "count": 0}, {"date": "2022-10-25", "count": 0}, {"date": "2022-10-26", "count": 0}, {"date": "2022-10-27", "count": 0}, {"date": "2022-10-28", "count": 0}, {"date": "2022-10-29", "count": 0}], [{"date": "2022-10-30", "count": 0}, {"date": "2022-10-31", "count": 0}, {"date": "2022-11-01", "count": 0}, {"date": "2022-11-02", "count": 0}, {"date": "2022-11-03", "count": 0}, {"date": "2022-11-04", "count": 0}, {"date": "2022-11-05", "count": 0}], [{"date": "2022-11-06", "count": 0}, {"date": "2022-11-07", "count": 0}, {"date": "2022-11-08", "count": 0}, {"date": "2022-11-09", "count": 0}, {"date": "2022-11-10", "count": 0}, {"date": "2022-11-11", "count": 0}, {"date": "2022-11-12", "count": 0}], [{"date": "2022-11-13", "count": 0}, {"date": "2022-11-14", "count": 0}, {"date": "2022-11-15", "count": 0}, {"date": "2022-11-16", "count": 0}, {"date": "2022-11-17", "count": 0}, {"date": "2022-11-18", "count": 0}, {"date": "2022-11-19", "count": 0}], [{"date": "2022-11-20", "count": 0}, {"date": "2022-11-21", "count": 0}, {"date": "2022-11-22", "count": 0}, {"date": "2022-11-23", "count": 7}, {"date": "2022-11-24", "count": 0}, {"date": "2022-11-25", "count": 0}, {"date": "2022-11-26", "count": 7}], [{"date": "2022-11-27", "count": 0}, {"date": "2022-11-28", "count": 0}, {"date": "2022-11-29", "count": 0}, {"date": "2022-11-30", "count": 0}, {"date": "2022-12-01", "count": 1}, {"date": "2022-12-02", "count": 0}, {"date": "2022-12-03", "count": 0}], [{"date": "2022-12-04", "count": 1}, {"date": "2022-12-05", "count": 15}, {"date": "2022-12-06", "count": 0}, {"date": "2022-12-07", "count": 0}, {"date": "2022-12-08", "count": 0}, {"date": "2022-12-09", "count": 0}, {"date": "2022-12-10", "count": 0}], [{"date": "2022-12-11", "count": 0}, {"date": "2022-12-12", "count": 0}, {"date": "2022-12-13", "count": 0}, {"date": "2022-12-14", "count": 0}, {"date": "2022-12-15", "count": 0}, {"date": "2022-12-16", "count": 0}, {"date": "2022-12-17", "count": 0}], [{"date": "2022-12-18", "count": 3}, {"date": "2022-12-19", "count": 3}, {"date": "2022-12-20", "count": 0}, {"date": "2022-12-21", "count": 10}, {"date": "2022-12-22", "count": 11}, {"date": "2022-12-23", "count": 0}, {"date": "2022-12-24", "count": 0}], [{"date": "2022-12-25", "count": 0}, {"date": "2022-12-26", "count": 0}, {"date": "2022-12-27", "count": 0}, {"date": "2022-12-28", "count": 0}, {"date": "2022-12-29", "count": 0}, {"date": "2022-12-30", "count": 0}, {"date": "2022-12-31", "count": 0}], [{"date": "2023-01-01", "count": 0}, {"date": "2023-01-02", "count": 0}, {"date": "2023-01-03", "count": 0}, {"date": "2023-01-04", "count": 0}, {"date": "2023-01-05", "count": 0}, {"date": "2023-01-06", "count": 0}, {"date": "2023-01-07", "count": 0}], [{"date": "2023-01-08", "count": 0}, {"date": "2023-01-09", "count": 0}, {"date": "2023-01-10", "count": 0}, {"date": "2023-01-11", "count": 0}, {"date": "2023-01-12", "count": 0}, {"date": "2023-01-13", "count": 0}, {"date": "2023-01-14", "count": 1}], [{"date": "2023-01-15", "count": 0}, {"date": "2023-01-16", "count": 0}, {"date": "2023-01-17", "count": 0}, {"date": "2023-01-18", "count": 0}, {"date": "2023-01-19", "count": 0}, {"date": "2023-01-20", "count": 0}, {"date": "2023-01-21", "count": 1}], [{"date": "2023-01-22", "count": 0}, {"date": "2023-01-23", "count": 0}, {"date": "2023-01-24", "count": 0}, {"date": "2023-01-25", "count": 0}, {"date": "2023-01-26", "count": 0}, {"date": "2023-01-27", "count": 0}, {"date": "2023-01-28", "count": 0}], [{"date": "2023-01-29", "count": 7}, {"date": "2023-01-30", "count": 0}, {"date": "2023-01-31", "count": 0}, {"date": "2023-02-01", "count": 0}, {"date": "2023-02-02", "count": 0}, {"date": "2023-02-03", "count": 0}, {"date": "2023-02-04", "count": 4}], [{"date": "2023-02-05", "count": 0}, {"date": "2023-02-06", "count": 0}, {"date": "2023-02-07", "count": 14}, {"date": "2023-02-08", "count": 0}, {"date": "2023-02-09", "count": 0}, {"date": "2023-02-10", "count": 0}, {"date": "2023-02-11", "count": 0}], [{"date": "2023-02-12", "count": 0}, {"date": "2023-02-13", "count": 0}, {"date": "2023-02-14", "count": 0}, {"date": "2023-02-15", "count": 0}, {"date": "2023-02-16", "count": 0}, {"date": "2023-02-17", "count": 0}, {"date": "2023-02-18", "count": 0}], [{"date": "2023-02-19", "count": 0}, {"date": "2023-02-20", "count": 0}, {"date": "2023-02-21", "count": 0}, {"date": "2023-02-22", "count": 0}, {"date": "2023-02-23", "count": 0}, {"date": "2023-02-24", "count": 0}, {"date": "2023-02-25", "count": 0}], [{"date": "2023-02-26", "count": 0}, {"date": "2023-02-27", "count": 0}, {"date": "2023-02-28", "count": 0}, {"date": "2023-03-01", "count": 0}, {"date": "2023-03-02", "count": 6}, {"date": "2023-03-03", "count": 0}, {"date": "2023-03-04", "count": 0}], [{"date": "2023-03-05", "count": 0}, {"date": "2023-03-06", "count": 0}, {"date": "2023-03-07", "count": 0}, {"date": "2023-03-08", "count": 0}, {"date": "2023-03-09", "count": 0}, {"date": "2023-03-10", "count": 0}, {"date": "2023-03-11", "count": 2}], [{"date": "2023-03-12", "count": 0}, {"date": "2023-03-13", "count": 0}, {"date": "2023-03-14", "count": 0}, {"date": "2023-03-15", "count": 4}, {"date": "2023-03-16", "count": 1}, {"date": "2023-03-17", "count": 0}, {"date": "2023-03-18", "count": 0}], [{"date": "2023-03-19", "count": 0}, {"date": "2023-03-20", "count": 0}, {"date": "2023-03-21", "count": 0}, {"date": "2023-03-22", "count": 0}, {"date": "2023-03-23", "count": 0}, {"date": "2023-03-24", "count": 0}, {"date": "2023-03-25", "count": 0}], [{"date": "2023-03-26", "count": 0}, {"date": "2023-03-27", "count": 4}, {"date": "2023-03-28", "count": 0}, {"date": "2023-03-29", "count": 0}, {"date": "2023-03-30", "count": 0}, {"date": "2023-03-31", "count": 0}, {"date": "2023-04-01", "count": 0}], [{"date": "2023-04-02", "count": 0}, {"date": "2023-04-03", "count": 0}, {"date": "2023-04-04", "count": 0}, {"date": "2023-04-05", "count": 1}, {"date": "2023-04-06", "count": 0}, {"date": "2023-04-07", "count": 0}, {"date": "2023-04-08", "count": 0}], [{"date": "2023-04-09", "count": 1}, {"date": "2023-04-10", "count": 0}, {"date": "2023-04-11", "count": 1}, {"date": "2023-04-12", "count": 0}, {"date": "2023-04-13", "count": 0}, {"date": "2023-04-14", "count": 0}, {"date": "2023-04-15", "count": 0}], [{"date": "2023-04-16", "count": 1}, {"date": "2023-04-17", "count": 0}, {"date": "2023-04-18", "count": 2}, {"date": "2023-04-19", "count": 0}, {"date": "2023-04-20", "count": 0}, {"date": "2023-04-21", "count": 0}, {"date": "2023-04-22", "count": 0}], [{"date": "2023-04-23", "count": 1}, {"date": "2023-04-24", "count": 0}, {"date": "2023-04-25", "count": 0}, {"date": "2023-04-26", "count": 0}, {"date": "2023-04-27", "count": 0}, {"date": "2023-04-28", "count": 0}, {"date": "2023-04-29", "count": 0}], [{"date": "2023-04-30", "count": 0}, {"date": "2023-05-01", "count": 0}, {"date": "2023-05-02", "count": 1}, {"date": "2023-05-03", "count": 0}, {"date": "2023-05-04", "count": 8}, {"date": "2023-05-05", "count": 1}, {"date": "2023-05-06", "count": 0}], [{"date": "2023-05-07", "count": 0}, {"date": "2023-05-08", "count": 0}, {"date": "2023-05-09", "count": 0}, {"date": "2023-05-10", "count": 0}, {"date": "2023-05-11", "count": 2}, {"date": "2023-05-12", "count": 5}, {"date": "2023-05-13", "count": 1}], [{"date": "2023-05-14", "count": 14}, {"date": "2023-05-15", "count": 0}, {"date": "2023-05-16", "count": 0}, {"date": "2023-05-17", "count": 0}, {"date": "2023-05-18", "count": 0}, {"date": "2023-05-19", "count": 0}, {"date": "2023-05-20", "count": 11}], [{"date": "2023-05-21", "count": 8}, {"date": "2023-05-22", "count": 0}]]}'  
  function loadgitcalendardata(data) {
      gitcalendar.resetData();
      gitcalendar.data = data.contributions;
      gitcalendar.total = data.total;
      gitcalendar.first2date = gitcalendar.data[48];
      gitcalendar.firstdate = gitcalendar.data[47];
      gitcalendar.firstweek = data.contributions[0];
      gitcalendar.lastweek = data.contributions[52];
      gitcalendar.beforeweek = data.contributions[51];
      gitcalendar.thisdayindex = gitcalendar.lastweek.length - 1;
      gitcalendar.thisday = gitcalendar.lastweek[gitcalendar.thisdayindex].date;
      gitcalendar.oneyearbeforeday = gitcalendar.firstweek[0].date;
      gitcalendar.monthindex = gitcalendar.thisday.substring(5, 7) * 1;
      gitcalendar.montharrbefore = gitcalendar.month.splice(gitcalendar.monthindex, 12 - gitcalendar.monthindex);
      gitcalendar.monthchange = gitcalendar.montharrbefore.concat(gitcalendar.month);
      addweek(data);
      addlastmonth();
      responsiveChart();
  }
  function is_time_the_same_day(old_timestamp) {
    var current_time = new Date(Date.now());
    var old_time = new Date(Number(old_timestamp));
    if (current_time.getFullYear() === old_time.getFullYear() && current_time.getMonth() === old_time.getMonth() && current_time.getDate() === old_time.getDate()) {
        return true;
    }
    return false;
  }
  function get_gitcalendar_data_from_local() {
    if (typeof(saveToLocal.get('local_gitcalendar_save_timestamp')) === "undefined") {
        return null;
    }
    if (is_time_the_same_day(saveToLocal.get('local_gitcalendar_save_timestamp'))) {
        var localgitcaneldarsavedata = saveToLocal.get('local_gitcalendar_save_data');
        if (typeof(localgitcaneldarsavedata) === 'undefined') {
            return null;
        }
        return localgitcaneldarsavedata;
    }
    return null;
  }
  function fetch_func() {
    loadgitcalendardata(JSON.parse(oldbackupgitcalendardata));
    if (typeof(fetch_v2) === 'undefined') { //fetch_v2 defined in butterfly(blog)'s main.js
        return fetch(githubapiurl)
    } else {
        return fetch_v2(githubapiurl, {timeout:3000})
    }
  }
  var localgitcalendardata = get_gitcalendar_data_from_local();
  if (localgitcalendardata !== null) {
      loadgitcalendardata(localgitcalendardata);
  } else {
      fetch_func()
      .then(data => data.json())
      .then(data => {
          loadgitcalendardata(data);
          saveToLocal.set('local_gitcalendar_save_timestamp', Date.now(), 2);
          saveToLocal.set('local_gitcalendar_save_data', data, 2);
      })
      .catch(function(error) {
          console.log(error);
          loadgitcalendardata(JSON.parse(oldbackupgitcalendardata));
      });
  }
  
  //手机版更换为svg绘制
  if (document.getElementById("gitcalendar").offsetWidth < 500) {
    gitcalendar.simplemode = false
  }
  
  //当改变窗口大小时重新绘制canvas
  window.onresize = function() {
    if (gitcalendar.simplemode) responsiveChart()
  }
  
  //解决滚动滑轮时出现的标签显示
  window.onscroll = function() {
    if (document.querySelector('.angle-wrapper')) {
      document.querySelector('.angle-wrapper').style.display = 'none'
    }
  };
}
