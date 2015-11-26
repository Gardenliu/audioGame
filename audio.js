var joinGames=document.getElementById('joinGame'),
    page1=document.getElementById('page1' ),
    page2=document.getElementById('page2' ),
    page3=document.getElementById('page3'),
    gameInfo=document.getElementById('gameinfo'),
    countSec=page2.querySelector('.countSec' ),
    disc=page2.querySelector('.disc' ),
    oClock=document.getElementById('tsec'),
    gameMain=page2.querySelector('.game_main' ),
    gamelist=gameMain.children,
    oTip=page2.querySelector('.tips'),
    tube=page2.querySelector('.tube_list'),
    bg_music = document.getElementById ( 'bg_music_wrap' ),
    bgAudio = bg_music.querySelector ('#bg-music'),
    AudioArr=['http://mat1.gtimg.com/henan/0113/bg1.mp3','http://mat1.gtimg.com/henan/0113/bg2.mp3',
        'http://mat1.gtimg.com/henan/0113/bg3.mp3','http://mat1.gtimg.com/henan/0113/bg4.mp3'],
    tipArr=['imgs/tip0.gif',
        'imgs/tip1.png',
        'imgs/tip2.png',
        'imgs/tip3.png',
        'imgs/tip4.png'],
    customs=['imgs/1.png','imgs/2.png','imgs/3.png','imgs/4.png','imgs/game-over.png'],
    isIPhone=true,
    gamePass= 4,//关卡
    audios=new Audio,
    currentPot=0,
    currentPass= 0,//关卡音符个数
    shareTitle = '记忆好声音等你来挑战，快来报名参与中国好声音河南招募吧！',
    currentRandArr=null,
    otime=null,
    valves=[3,4,5,6,7],//阀值组
    scoreArr=[94,84,64,20,0],
    isEnd=false,
    shareVal= 0,
    endTime=1000*50,//倒计时
    _countTime=endTime;
var picArr=[
    'imgs/tip0.gif',
    'imgs/tip1.png',
    'imgs/tip2.png',
    'imgs/tip3.png',
    'imgs/tip4.png',
    'imgs/tube.png',
    'imgs/tube_suc.png',
    'imgs/note.png',
    'imgs/note_r.png',
    'imgs/note_w.png',
    'imgs/disc.png',
    'imgs/cover.png',
    'imgs/count1.png',
    'imgs/count2.png',
    'imgs/count3.png'
];
var errorAudio=(new Audio),
    gameOver=(new Audio),
    successEnd=(new Audio),
    passAudio=(new Audio),
    potAudio=(new Audio);
errorAudio.src='imgs/wrong.mp3';
potAudio.src='imgs/pot.mp3';
passAudio.src='imgs/yes.mp3';
gameOver.src='imgs/end.mp3';
successEnd.src='imgs/suc.mp3';
imgArrLoad(picArr);
audioLoad(AudioArr);
isPhone();
function joinActions(ev){
    page2.className='page2';
    page2.style.cssText='transform: translateY(100%);-webkit-transform: translateY(100%)';
    ev.currentTarget.removeEventListener('touchstart',joinActions);
    countSecs(3);
}
ready = function () {
    var setTime= setTimeout ( function () {
        clearTimeout(setTime);
        var loading = document.getElementById ( 'loading' );
        loading.style.display = 'none';
        page1.className = 'page1';
    }, 800 )
}
window.addEventListener('load',init);

function init(){
    //兼容
    ready ();
    document.addEventListener('touchstart',function(ev){})
    joinGames.addEventListener('touchstart',joinActions);
    indexCell(gamelist);
}

function stepOne(curpass){
    currentPass=curpass;//
    currentRandArr=classArr(currentPass);

    oTip.src=customs[currentPass-3];
    bgAudio.play();
    setTimeout(function(){
        oTip.src=tipArr[1];
        setTimeout(function(){
            vodieShow(0);
        },1000)
    },1000);
}
function stepTwo(){
    oTip.src=tipArr[2];
    clearlist();
    gameMain.addEventListener('touchstart',gameDot);
}
function loadImg(src){
    var oImg=new Image();
    oImg.src=src;
}
function imgArrLoad(picArr){
    var len=picArr.length;
    while(len--){
        loadImg(picArr[len]);
    }
}
function audioLoad(arr){
    var len=arr.length;
    while(len--){
        (new Audio).src=arr[len];
    }
}
function stepThree(){
    gameMain.removeEventListener('touchstart',gameDot);

    oTip.src=tipArr[3];

    var setime=  setTimeout(function(){
        clearTimeout(setime);

        clearlist();
        oTip.src=tipArr[0];
        currentPot=0;
        currentPass++;
        if(currentPass<(gamePass+3)){
            stepOne(currentPass);
            tubeAdd(currentPass-3);

        }else{
            isEnd=true;
            oTip.src=tipArr[3];
            clearInterval(otime);
            successEnd.play();
            bgAudio.pause();

            setTimeout(function(){
                SucessAction();
            },1000);
        }
    },2000);
    passAudio.play();
}

function SucessAction(){
    gameMain.removeEventListener('touchstart',gameDot);
    page3.className='page3';
    page3.style.cssText='transform: translateY(100%);-webkit-transform: translateY(100%)';

    switch (true){
        case currentPass==valves[4]:
            shareVal=scoreArr[0]+Math.floor(Math.random()*10-5);
            shareTitle='中国好声音河南招募，我打败了'+shareVal+'%的人，你敢挑战我嘛？';
            gameInfo.innerHTML='打败了<span class="percent">'+shareVal+'</span>%<br> <div class="p3_info_main"> 亲，你好厉害，打败了<span class="percent">'+shareVal+'</span>%的人,<br> 好声音火热报名中,<br> 赶快报名参加吧~ </div>';
            break;
        case currentPass==valves[3]:
            shareVal=scoreArr[1]+Math.floor(Math.random()*10-5);
            shareTitle='中国好声音河南招募，我打败了'+shareVal+'%的人，你敢挑战我嘛？';
            gameInfo.innerHTML='打败了<span class="percent">'+shareVal+'</span>%<br> <div class="p3_info_main"> 亲，不错噢，打败了<span class="percent">'+shareVal+'</span>%的人,<br> 好声音火热报名中,<br> 赶快报名参加吧~ </div>';
            break;
        case currentPass==valves[2]:

            shareVal=scoreArr[2]+Math.floor(Math.random()*10-5);
            shareTitle='中国好声音河南招募，我打败了'+shareVal+'%的人，你敢挑战我嘛？';
            gameInfo.innerHTML='打败了<span class="percent">'+shareVal+'</span>%<br> <div class="p3_info_main"> 亲，要加油了，打败了<span class="percent">'+shareVal+'</span>%的人,<br> 好声音火热报名中,<br> 赶快报名参加吧~ </div>';
            break;
        case currentPass==valves[1]:

            shareVal=scoreArr[3]+Math.floor(Math.random()*10-5);
            shareTitle='中国好声音河南招募，我打败了'+shareVal+'%的人，你敢挑战我嘛？';
            gameInfo.innerHTML='打败了<span class="percent">'+shareVal+'</span>%<br> <div class="p3_info_main"> 亲，要加油了，打败了<span class="percent">'+shareVal+'</span>%的人,<br> 好声音火热报名中,<br> 赶快报名参加吧~ </div>';
            break;
        default :shareVal=0;
            shareTitle='记忆好声音难度吊炸天，我被打败了，快些助战我吧！';
            gameInfo.innerHTML='打败了<span class="percent">'+shareVal+'</span>%<br> <div class="p3_info_main"> 亲，挑战失败，打败了<span class="percent">'+shareVal+'</span>%的人,<br> 好声音火热报名中,<br> 赶快报名参加吧~ </div>';
            break;
    }
}
function gameDot(ev){
    if(!isEnd && ev.target.className=='game_main') return false;
    if(ev.target.index==currentRandArr[currentPot]){
        ev.target.className='note_r';
        if(isIPhone){
            potAudio.pause();
            potAudio.currentTime = 0;
            potAudio.play();
        }
        if(currentPot==(currentPass-1)) stepThree();
        currentPot++;

    }else{
        gameMain.removeEventListener('touchstart',gameDot);
        ev.target.className='note_w';
        errorAudio.pause();
        errorAudio.currentTime = 0;
        errorAudio.play();

        clearInterval(otime);
        endTime=0;
        isEnd=true;
        oTip.src=customs[4];

        bgAudio.pause();
        setTimeout(function(){
            SucessAction();
        },1000);
        return false;

    }
}

function tubeAdd(num){
    var tubes=tube.children;
    if(num>tubes.length) return false;
    tubes[num].className='tube_suc';
}
//清屏
function clearlist(){
    var listLen=gamelist.length;
    while(listLen--){
        gamelist[listLen].className='';
    }
}

//重置状态
function reset(){
    var setime=  setTimeout(function(){
        clearTimeout(setime)
        var tubes=tube.children;
        for(var i= 1,len=tubes.length;i<len;i++){
            tubes[i].className='';
        }
        clearlist();
        stepOne(3);
        currentPot=0;
    },2000);
}
//判断机型
function isPhone(){
    var userAgent=navigator.userAgent;
    if(userAgent.indexOf('iPhone')>0){
        isIPhone=true;
    }else{
        isIPhone=false;
    }
}

function countSecs(imgnum){
    if(imgnum==0){
        countSec.style.display='none';
        //gameStart动画，音乐播放
        disc.classList.add('discRote');
        if(!isIPhone){
            disc.children[0].style.cssText='-webkit-transform: rotate(15deg)';
            disc.children[1].style.cssText='-webkit-transform: rotate(360deg)';
        }
        setTimeout(function(){
            voicePlay(AudioArr);
            clockAction();
            stepOne(3);
        },1000);
        return false;
    }
    countSec.children[0].src='imgs/count'+imgnum+'.png';
    imgnum--;
    setTimeout("countSecs('"+ imgnum +"')",1000);
    oTip.src=tipArr[0];
}

function clockAction(){
    otime= setInterval(function(){
        if(endTime>0){
            endTime=endTime-100;
            oClock.innerText=endTime/1000;
        }else{
            clearInterval(otime);

            isEnd=true;
            oTip.src=customs[4];
            gameOver.play();
            bgAudio.pause();
            setTimeout(function(){
                SucessAction();
            },1000);
        }
    },100);
}



function voicePlay(AudioArrs){
    var rand=Math.floor(Math.random()*4),
        src=AudioArrs[rand];
    bgAudio.src=src;
    bgAudio.play();
}


function playbksound () {
    document.addEventListener ( 'touchstart', playAudio );
}
function playAudio () {
    bgAudio.play ();
    document.removeEventListener ( 'touchstart', playAudio );
}
bg_music.addEventListener ( 'touchstart', function () {
    if (bg_music.classList.contains ( 'z-play' )) {
        bg_music.classList.remove ( 'z-play' );
        bgAudio.pause ();
    } else {
        bg_music.classList.add ( 'z-play' );
        bgAudio.play ();
    }
} )

function vodieShow(vodieLen){
    setTimeout(function(){
        if(vodieLen==currentPass){
            stepTwo();
            return false;
        }
        gamelist[currentRandArr[vodieLen]].className='note';
        vodieLen++;
        setTimeout("vodieShow('"+ vodieLen +"')",500);
    },500);
}

//随机分配的顺序索引
function classArr(len){
    var num=[0,1,2,3,4,5,6,7,8,9,10,11],
        randArr=getArrayItems(num,len);
    return randArr;
}

function indexCell(objArr){
    var len=objArr.length;
    if(!len) return false;
    while(len--){
        objArr[len].index=len;
    };
};
function getArrayItems(temp_array,num){
    var return_array= new Array();
    for(var i = 0;i < num;i++){
        if(temp_array.length > 0){
            var arr_index = Math.floor(Math.random()*temp_array.length);
            if(temp_array[arr_index].length == 0){
                break;
            }else{
                return_array[i] = temp_array[arr_index];
                temp_array.splice(arr_index, 1);
            }
        }else{
            break;
        }
    }
    return return_array;
}