/* 来自：https://stackoverflow.com/questions/19348978/play-images-in-javascript
 */
function SlideShowPlayer(id_name) {
    var rotator=document.getElementById(id_name);
    var images=rotator.getElementsByTagName('img');
    var progress=rotator.parentNode.getElementsByClassName("imgplayer_progress")[0];
    var intervalID;
    var counter=1;
    var baseprogress="/"+(images.length).toString();

    for (var i=1; i<images.length; i++) { //初始时刻隐藏除第一张外的所有图片（静止状态），也可以设置为预播放状态
        images[i].style.display='none';
    }
    progress.innerText="1"+baseprogress;
    function animate() {
        var i;

        for (i=0; i<images.length; i++) {
            if (i==counter){
                images[i].style.display='block';
                progress.innerText=(counter+1).toString()+baseprogress;
            } else{
                images[i].style.display='none';
            }
        }

        counter++;
        if (counter==images.length) {
            counter=0;
        }
    }

    this.pause=function () {
        if (undefined!==intervalID) {
            window.clearInterval(intervalID);
            intervalID=undefined;
        }
    };

    this.stop=function () {
        this.pause();
        
        for (var i=0; i<images.length; i++) {
            images[i].style.display='none';
        }
        rotator.style.display='none';
        progress.style.display="none";
    };

    this.play=function () {
        rotator.style.display='block';
        progress.style.display="inline";
        if (undefined===intervalID) {
            intervalID=window.setInterval(animate, 500);
        }
    };
}

var slideshowplayersdict = {};

function playimage(id_name) {
    slideshowplayersdict[id_name].play();
}

function pauseimage(id_name) {
    slideshowplayersdict[id_name].pause();
}

function stopimage(id_name) {
    slideshowplayersdict[id_name].stop();
}

function CreateSlideShowPlayer(id_name){
    slideshowplayersdict[id_name] = new SlideShowPlayer(id_name);
}

var slideshowdivs=document.getElementsByClassName('dyslideshow');
for (var i=0; i<slideshowdivs.length; i++){
    CreateSlideShowPlayer(slideshowdivs[i].firstElementChild.id);
}