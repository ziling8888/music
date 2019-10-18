$(function () {
    var audio = $('#audio')[0];
    var progressWidth = $('.progress').width();
    var maskWidth = $('.mask').width();
    var duration = 0;
    var songId = [];
    var single = [];
    var wordsBoxTop = parseFloat($('.songword').css('top'));

    console.log($('.name-img>img').attr('src')=='');

    //设置获取本地存储的最近播放的歌曲
    if (localStorage.getItem('nearsong') == undefined) {
        localStorage.setItem('nearsong', JSON.stringify([]));
    }
    var nearsong = JSON.parse(localStorage.getItem('nearsong'))

    //设置获取本地存储的我的收藏的歌曲
    if (localStorage.getItem('collectsong') == undefined) {
        localStorage.setItem('collectsong', JSON.stringify([]));
    }
    var collectsong = JSON.parse(localStorage.getItem('collectsong'));
    $('.nearsong-shu').text(nearsong.length);
    $('.collectsong-shu').text(collectsong.length);
    console.log(nearsong)
    var url = 'https://music.163.com/song/media/outer/url?id=';

    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        minutes = minutes >= 10 ? minutes : '0' + minutes;

        var seconds = Math.floor(time % 60);
        seconds = seconds >= 10 ? seconds : '0' + seconds;

        return minutes + ':' + seconds;
    }

    function mau(e) {
        var progressLeft = $(this).offset().left;
        console.log(progressLeft)
        var x = e.targetTouches[0].pageX;
        console.log(x)
        var minLeft = 0;
        var maxLeft = progressWidth - maskWidth;
        var maskleft = x - progressLeft - maskWidth / 2 > maxLeft ? maxLeft : x - progressLeft - maskWidth / 2 > 0 ? x - progressLeft - maskWidth / 2 : 0;

        $('.mask').css('left', maskleft);
        var w = x - progressLeft;
        w = w >= progressWidth ? progressWidth : w <= 0 ? 0 : w;
        $('.progress-active').css('width', w);
        audio.currentTime = maskleft / maxLeft * audio.duration;
    }




    $('.layer').on('touchstart', function (e) {
        mau.call(this, e);

    })
    $('.layer').on('touchmove', function (e) {
        mau.call(this, e);
    })

    //获取歌单数据
    if (localStorage.songs) {
        var localsongs = JSON.parse(localStorage.songs);
        single = localsongs.playlist.tracks.concat();
        for (var i = 0; i < localsongs.privileges.length; i++) {
            songId.push(localsongs.privileges[i].id);
        }
        $('.localge-shu').text(localsongs.privileges.length);

        songlist(20, single);
        
    } else {


        $.ajax({
            type: 'GET',
            url: 'http://www.arthurdon.top:3000/top/list?idx=1',

            success: function (data) {
                console.log(data)
                console.log(data.privileges.length)
                localStorage.setItem('songs', JSON.stringify(data));
                $('.localge-shu').text(data.privileges.length);
                for (var i = 0; i < data.privileges.length; i++) {
                    songId.push(data.privileges[i].id);
                }
                single = data.playlist.tracks.concat();
                songlist(20, single);
               





            }
        })
    }
    //本地歌曲
    function songlist(length, data) {
        for (var i = 0; i < length; i++) {
            var songname = [];
            var $li = $(`<li data-id="${data[i].id}" name="0" data-img="${data[i].al.picUrl}" data-dt="${data[i].dt / 1000}" data-names="${data[i].name}" >
            <div class="songer clearfix">
              <div class="songers-img fl">
                <img class="auto-img" src="${data[i].al.picUrl}" alt="">
              </div>
              <div class="songer-name fl">
                <div class="one-text"><span >${data[i].name}</span></div>
               
              </div>
              <div class="songer-time fr">
                <span>${formatTime((data[i].dt) / 1000)}</span>
              </div>
            </div> 
         </li>`);


            for (var j = 0; j < data[i].ar.length; j++) {
                songname.push(data[i].ar[j].name);
            }
            var $singers = $(`<div class="one-text supersonger"><span >${songname.join(' / ')}</span></div>`);

            $li.find('.songer-name').append($singers);

            $('.localsong-list').append($li);
        }
    }

    //最近播放 //3 , data , data[index]    
    function nearSongList(length, data, index) {
        
        for (var j = 0; j < length; j++) {
            var songname = [];
            var i = index[j];
            var $li = $(`<li data-id="${data[i].id}" name="0" data-img="${data[i].al.picUrl}" data-dt="${data[i].dt / 1000}" data-names="${data[i].name}" >
            <div class="songer clearfix">
              <div class="songers-img fl">
                <img class="auto-img" src="${data[i].al.picUrl}" alt="">
              </div>
              <div class="songer-name fl">
                <div class="one-text"><span >${data[i].name}</span></div>
               
              </div>
              <div class="songer-time fr">
                <span>${formatTime((data[i].dt) / 1000)}</span>
              </div>
            </div> 
         </li>`);


            for (var k = 0; k < data[i].ar.length; k++) {
                songname.push(data[i].ar[k].name);
            }
            var $singers = $(`<div class="one-text supersonger"><span >${songname.join(' / ')}</span></div>`);

            $li.find('.songer-name').append($singers);

            $('.nearsong-list').append($li);
            
        }
        
        
    }

    //我的收藏

    function collectSongList(length, data, index) {
        
        for (var j = 0; j < length; j++) {
            var songname = [];
            var i = index[j];
            var $li = $(`<li data-id="${data[i].id}" name="0" data-img="${data[i].al.picUrl}" data-dt="${data[i].dt / 1000}" data-names="${data[i].name}" >
            <div class="songer clearfix">
              <div class="songers-img fl">
                <img class="auto-img" src="${data[i].al.picUrl}" alt="">
              </div>
              <div class="songer-name fl">
                <div class="one-text"><span >${data[i].name}</span></div>
               
              </div>
              <div class="songer-time fr">
                <span>${formatTime((data[i].dt) / 1000)}</span>
              </div>
            </div> 
         </li>`);


            for (var k = 0; k < data[i].ar.length; k++) {
                songname.push(data[i].ar[k].name);
            }
            var $singers = $(`<div class="one-text supersonger"><span >${songname.join(' / ')}</span></div>`);

            $li.find('.songer-name').append($singers);

            $('.collectsong-list').append($li);
            
        }
        
        
    }





    //能够播放时触发
    audio.oncanplaythrough = function () {
        console.log('aaa')
        var $liActive = $('li.active');
        var id = $liActive.data('id');
        var img = $liActive.data('img');
        var names = $liActive.data('names')
        var songer = $liActive.find('.supersonger').text();
        console.log(songer)
        $('.name-img>img').attr('src', img);
        $('.name-sing>p').eq(0).text(songer);
        $('.name-sing>p').eq(1).text(names);
        $('.name-sing>p').eq(2).text(songer);
        $('.name-sing>p').eq(3).text(names);
        console.log($('.name-sing>p'));
        


        $.ajax({
            type: 'GET',

            url: 'http://www.arthurdon.top:3000/lyric?id=' + id,
            success: function (data) {
                console.log(data);
                $('.songword').css({top: wordsBoxTop + 'px'}).html('');
                var ly = data.lrc.lyric.split(/[\n\r]+/);
                

                for (var i = 0; i < ly.length; i++) {
                    var lrc = ly[i].split(']');
                    
                    var text = lrc[1];
                    
                    if (text) {
                        
                        var time = lrc[0].slice(1).split(':');

                        var second = Number(time[0]) * 60 + Number(time[1]);                       
                        var $p = $(`<p data-time="${second}">${text}</p>`);

                        $('.songword').append($p);
                    }


                }
            }
        })

        $('.wen').text(formatTime(audio.duration));
        duration = audio.duration;

        //点击播放和暂停
        $('.play').on('click', function () {
            console.log('0000')
            if ($(this).data('play') == 0) {
                //播放
                audio.play();
                $(this).find('img').attr('src', './images/暂停.png');
                $(this).data('play', 1);
            } else {
                //暂停
                audio.pause();
                $(this).find('img').attr('src', './images/播放.png');
                $(this).data('play', 0);
            }

        })

        
        

    }

    //收藏
    $('.like').on('click', function () {
        var tu=$(this).parent().parent().find('img').attr('src');
        var $activeLi = $('li.active');
        if ($(this).data('love') == 0) {
            //收藏            
            
            if(tu!=''){
                $(this).find('img').attr('src', './images/喜欢.png');
                $(this).data('love', 1);
                var likeId=$('.name-img>img').data('like'); 
                if(collectsong.indexOf(likeId)==-1){
                    collectsong.push(likeId);
                    localStorage.setItem('collectsong',JSON.stringify(collectsong));
                    collectsong = JSON.parse(localStorage.getItem('collectsong'));                   
                    $('.collectsong-shu').text(collectsong.length);
                    $activeLi.data('love',1)                    
                }   
            }else{
                return;
            }

        } else {
            //取消收藏
            if(tu!=0){
                $(this).find('img').attr('src', './images/喜欢 (1).png');
                $(this).data('love', 0);
                
                if($activeLi.data('love')==1){
                    collectsong = JSON.parse(localStorage.getItem('collectsong')); 
                     var dontid=$activeLi.data('id');
                    var  index=collectsong.indexOf(dontid);
                    collectsong.splice(index,1);
                   localStorage.setItem('collectsong',JSON.stringify(collectsong));
                   collectsong = JSON.parse(localStorage.getItem('collectsong'));
                   $activeLi.data('love')=0;
                }
            }
           

        }
        
        

    })
    var $progressactive = $('.progress-active');
    
    //监控音乐播放
    audio.ontimeupdate = function () {


        $('.wen-play').text(formatTime(this.currentTime));
        wid = (this.currentTime / duration) * (progressWidth - maskWidth / 2) + maskWidth / 2;
        wids = (this.currentTime / duration) * (progressWidth - maskWidth);

        $progressactive.css('width', wid);
        $('.mask').css('left', wids);

        var $ps = $('.songword>p');

        var height = $ps.height();
        for (var i = 0; i < $ps.length; i++) {
            //获取当前的p和下一个p元素
            var currentTime = $ps.eq(i).data('time');
            var nextTime = $ps.eq(i + 1).data('time');

            

            if (i + 1 == $ps.length) {
                nextTime = Number.MAX_VALUE;
            }

            if (this.currentTime >= currentTime && this.currentTime < nextTime) {

                $('.songword').animate({
                    top: wordsBoxTop - height * i + 'px'
                }, 150)

                if (i - 1 >= 0) {
                    $ps.eq(i - 1).removeClass('act');
                }

                $ps.eq(i).addClass('act');

                break;
            }

        }
    }
    //点击搜索展开
    $('.search').on('click', function () {
        $('.nav-box').css({
            backgroundColor: 'rgba(255, 255, 255, .3)'
        })
        console.log($('.nav-box>input'))
        $('.nav-box>input').css({
            width: 'calc(100% - 0.55rem)'
        })
        $('.search').css({
            left: 'calc(100% - 0.4rem)'
        })
    })
    //点击从本地歌曲回到首页
    $('.navs-before').on('click', function () {
        $('.box1').css('display', 'block');
        $('.localsong').css('display', 'none');

    })

    //点击本地歌曲展开
    $('.arrow1').on('click', function () {
        $('.box1').css('display', 'none');
        $('.localsong').css('display', 'block');
    })

    //点击最近播放音乐展开
    $('.arrow2').on('click', function () {
        $('.nearsong-list').html('');
        var nearindex = [];
        
        for (var i = 0; i < nearsong.length; i++) {
            var index = songId.indexOf(nearsong[i])
            nearindex.push(index);

        }
        nearSongList(nearsong.length, single, nearindex)//3 , data , data.id

        $('.box1').hide();
        $('.nearsong').show();
    })

    //点击我的收藏音乐展开
    $('.arrow3').on('click', function () {
        $('.collectsong-list').html('');
       
        var collectindex = [];
        console.log(collectsong.length)
        for (var i = 0; i < collectsong.length; i++) {
            var index = songId.indexOf(collectsong[i])
            collectindex.push(index);

        }
        console.log(collectindex)
        collectSongList(collectsong.length, single, collectindex);

        $('.box1').hide();
        $('.collectsong').show();
    })

    //点击从最近播放音乐回到首页
    $('.navs-after').on('click', function () {
        $('.box1').show();
        $('.nearsong').hide();
    })

    //点击从我的收藏音乐回到首页
    $('.navs-collect').on('click', function () {
        $('.box1').show();
        $('.collectsong').hide();
    })

    //点击列表音乐播放和暂停
    $('.localsong-list,.nearsong-list,.collectsong-list').on('click', 'li', function () {
        var ids = $(this).data('id');
        console.log(ids)

        if (nearsong.indexOf(ids) == -1) {

            nearsong.push(ids);
            localStorage.setItem('nearsong', JSON.stringify(nearsong));
            nearsong = JSON.parse(localStorage.getItem('nearsong'));
            $('.nearsong-shu').text(nearsong.length);

        }

        if ($(this).hasClass('active')) {


            if ($('.play').data('play') == 0) {

                //播放
                audio.play();
                $('.play').find('img').attr('src', './images/暂停.png');
                $('.play').data('play', 1);
                return;
            }
            if ($('.play').data('play') == 1) {
                //停止
                audio.pause();
                $('.play').find('img').attr('src', './images/播放.png');
                $('.play').data('play', 0);
            }


        } else {
            var id = $(this).data('id');
            audio.src = url + id;
            $(this).addClass('active').siblings().removeClass('active');
            audio.play();
            $('.play').find('img').attr('src', './images/暂停.png');
            $('.play').data('play', 1);
            $('.name-img>img').data('like',id);
            


        }
        if($activeLi.data('love')==1){
            $('.like').find('img').attr('src', './images/喜欢.png');
            $('.like').data('love', 1);
        }
    })

    //点击打开歌词
    $('.name-img').on('click',function(){
        $('.box').hide();
        $('.otherbox').show();
    })
     
    //点击从歌词回到首页
    $('.navs-del').on('click',function(){
        $('.box').show();
        $('.otherbox').hide();
    })

    //点击切换播放模式
    $('.player').on('click', function () {
        var min = $(this).data('min');
        var max = $(this).data('max');
        var value = $(this).data('value');

        if (value == 3) {
            value = min;
            $(this).data('value', min);
        } else {
            $(this).data('value', ++value);
        }

        $(this).find('img').attr('src', './images/' + value + '.png')

    })
    
    //上一曲
    $('.before').on('click', function () {
        var $activeLi = $('li.active');

        var $lis = $('.localsong-list>li');
        var index = $activeLi.index();
        var $thisLi = $lis.eq(index);
       
        if (index == 0) {
            index =$lis.length - 1;
        } else {
            index--;
        }
        $thisLi.removeClass();
        var $cLi = $lis.eq(index);
        var id = $cLi.data('id');
        audio.src = url + id;
         $animate = $cLi.find('.animate');
         $cLi.addClass('active');
         $(audio).attr('name', id);

    })

    //下一曲
    $('.after').on('click', function () {
        var $activeLi = $('li.active');

        var $lis = $('.localsong-list>li');
        var index = $activeLi.index();
        var $thisLi = $lis.eq(index);
       
        if (index == $lis.length - 1) {
            index = 0;
        } else {
            index++;
        }
        $thisLi.removeClass();
        var $cLi = $lis.eq(index);
        var id = $cLi.data('id');
        audio.src = url + id;
         $animate = $cLi.find('.animate');
         $cLi.addClass('active');
         $(audio).attr('name', id);

    })

})