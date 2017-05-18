var log = console.log.bind(console)
var e = function (element, name) {
    var a = element.querySelector(name)
    return a
}
var player = e(document, '#id-audio-player')
var songs = [
    "I Can't Make You Love Me.mp3",
    "Mademoiselle.mp3",
    "Say Something.mp3",
    "Micmacs a La Gare.mp3",
    "And It Stoned Me.mp3",
]
var SoundsName = e(document, '.sounds_name')
// 点击图片控制开始暂停
var StartPause = function (callback) {
    var ClickPic = e(document, '.audio-pic')
    ClickPic.addEventListener('click', function(){
        if (ClickPic.childNodes[1].src.includes('start')) {
            ClickPic.childNodes[1].src = callback('pause')
            player.pause()
        }
        else {
            ClickPic.childNodes[1].src = callback('start')
            player.play()
        }
    })
}
// 音量调节
var setVolume = function () {
    var volume = e(document, '#volume')
   player.volume = volume.value;
}
// 点击前进后退控制歌曲切换
var FirstSong = function () {
    var SoundsName = e(document, '.sounds_name')
    var First = `src/music/${songs[0]}`
    SoundsName.innerHTML = "I Can't Make You Love Me"
    player.src = First
}
// log('src的值', CurrentSong)
// var CurrentSongIndex = function () {
//     var CurrentSong = player.src.replace(/%20/g, ' ')
//     for (var i = 0; i < songs.length; i++) {
//         log(CurrentSong.includes(songs[i]))
//         if (CurrentSong.includes(songs[i])) {
//             var index = i
//         }
//     }
//     return index
// }
// 前进后退一首歌,显示歌曲名字
var SongInsert = function (index) {
    SoundsName.innerHTML = ""
    var d = songs[index].slice(0, songs[index].length - 4)
    SoundsName.insertAdjacentHTML('beforeend', d)
}
var StPause = function (control) {
    var t = `./src/pic/${control}.png`
    return t
}
var SongControl = function () {
    var controls = e(document, '.controls-2')
    controls.addEventListener('click', function () {
        var ClickPic = e(document, '.audio-pic')
        var CurrentSong = player.src.replace(/%20/g, ' ')
        for (var i = 0; i < songs.length; i++) {
            if (CurrentSong.includes(songs[i])) {
                var index = i
                var target = event.target
                // 前进
                if (target.classList.contains('forward')) {
                    index = (index + 1) % songs.length
                    player.src = `src/music/${songs[index]}`
                    ClickPic.childNodes[1].src = StPause('start')
                    SongInsert(index)
                }
                // 后退
                else if (target.classList.contains('back')) {
                    index = (index + songs.length - 1) % songs.length
                    player.src = `src/music/${songs[index]}`
                    ClickPic.childNodes[1].src = StPause('start')
                    SongInsert(index)
                }
            }
        }
    })
}

// 循环播放
// var SongCircle = e(document, '.circle')
// log('kk', SongCircle)
// SongCircle.addEventListener('ended', function () {
//     var CurrentSong = player.src.replace(/%20/g, ' ')
//     for (var i = 0; i < songs.length; i++) {
//         if (CurrentSong.includes(songs[i])) {
//             var index = i
//             index = (index + 1) % songs.length
//             player.src = `src/music/${songs[index]}`
//             ClickPic.childNodes[1].src = StartPause('start')
//             SongInsert(index)
//         }
//     }
// })

// 进度条
    //绑定timeupdate事件
var MyPlayer = function () {
    player.addEventListener('timeupdate',function(){
        if (!isNaN(player.duration)) {
            var progressValue = player.currentTime/player.duration //用时间比来获取进度条的值
            if(progressValue == 1){
                progressValue=0//当播放完成，进度条跳到开始
            }
            drawCircle(canvas,progressValue);
        };
    },false)
}
drawCircle = function (canvas, percentage) {
    var clientWidth = document.documentElement.clientWidth
    var canvasWidth = Math.floor(clientWidth * 300/ 210)
    var innerR = canvasWidth * 0.58 * 0.5//半径
    var ctx
    canvas.setAttribute('width', canvasWidth + 'px')
    canvas.setAttribute('height', canvasWidth + 'px')
    if (canvas.getContext) {
        ctx = canvas.getContext('2d')
    }
    ctx.translate(canvasWidth / 2, canvasWidth / 2)
    ctx.beginPath()
    ctx.arc(0, 0, innerR, 0, Math.PI * 2, false)
    ctx.lineWidth = 10
    ctx.strokeStyle = "white"
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(0, 0, innerR, Math.PI * 3 / 2, (Math.PI * 3 / 2 + Math.PI * 2 / 180 + percentage * Math.PI * 2), false)
    ctx.lineWidth = 10
    ctx.strokeStyle = "#dfa24e"
    ctx.stroke()
}
var MyEnjoySong = function () {
    var EnjoySong = e(document, '.enjoy')
    EnjoySong.addEventListener('click', function () {
        if (EnjoySong.src.includes('love.png')) {
            EnjoySong.src = "src/pic/loved.png"
        }
        else if (EnjoySong.src.includes('loved.png')) {
            EnjoySong.src = "src/pic/love.png"
        }
    })
}

var _contains = function () {
    StartPause(function (name) {
        var t = `./src/pic/${name}.png`
        return t
    })
    FirstSong()
    SongControl()
    MyEnjoySong()
    drawCircle(e(document, '#canvas'),0)
    MyPlayer()
}
_contains()
