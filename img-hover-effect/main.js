var options = {
    imgSrc: 'top.png',
    containerName: 'tileContainer',
    grid: false,
    tileWidth: 80,
    tileHeight: 80,
    mouseTrail: true
}

// ----------------------------------------------------------
var tileWidth, tileHeight, numTiles, tileHolder, tileContainer;
var directionX, directionY;
var imgOriginalWidth, imgOriginalHeight;
var imgCoverWidth, imgCoverHeight;
var imageLoaded = false;

numTiles = 0;
tileWidth = options.tileWidth;
tileHeight = options.tileHeight;
tileContainer = document.getElementsByClassName(options.containerName)[0];

const init = () => {
    if (options.grid == false) tileContainer.className += ' noGrid';

    var image = new Image();
    image.src = options.imgSrc;
    image.onload = e => {
        imageLoaded = true;
        imgOriginalWidth = e.currentTarget.width;
        imgOriginalHeight = e.currentTarget.height;
        createTileHolder();
        checkTileNumber();
        positionImage();
        addListeners();
    };  
}

const resizeHandler = () => {
    if (imageLoaded == false) return;
    checkTileNumber();
    positionImage();
}

const createTileHolder = () => {
    tileHolder = document.createElement('div');
    tileHolder.className = 'tileHolder';
    tileHolder.style.position = 'absolute';
    tileHolder.style.top = '50%';
    tileHolder.style.left = '50%';
    tileHolder.style.transform = 'translate(-50%, -50%)';
    tileContainer.appendChild(tileHolder);
}

const checkTileNumber = () => {
    tileHolder.style.width = Math.ceil(tileContainer.offsetWidth / tileWidth) * tileWidth + 'px';
    tileHolder.style.height = Math.ceil(tileContainer.offsetHeight / tileHeight) * tileHeight + 'px';

    var tilesFitInWindow = Math.ceil(tileContainer.offsetWidth / tileWidth) * Math.ceil(tileContainer.offsetHeight / tileHeight);
    if (numTiles < tilesFitInWindow) {
        for (var i=0, l=tilesFitInWindow-numTiles; i < l; i++) {
            addTiles();
        }
    } else if (numTiles > tilesFitInWindow) {
        for (var i=0, l=numTiles-tilesFitInWindow; i < l; i++) {
            removeTiles();
        }
    }  
}

const addTiles = () => {
    var tile = document.createElement('div');
    tile.className = 'tile';  

    imgCoverWidth = tileContainer.offsetWidth;
    imgCoverHeight = tileContainer.offsetHeight;

    if (imgOriginalWidth > imgOriginalHeight) {
        imgCoverHeight = imgOriginalHeight / imgOriginalWidth * imgCoverWidth;
    } else {
        imgCoverWidth = imgOriginalWidth / imgOriginalHeight * imgCoverHeight;     
    } 

    tile.style.background = 'url("'+options.imgSrc+'") no-repeat';
    tile.style.backgroundSize  = imgCoverWidth + 'px ' +  imgCoverHeight + 'px';
    tile.style.width = tileWidth + 'px';
    tile.style.height = tileHeight + 'px';
    document.querySelectorAll('.tileHolder')[0].appendChild(tile);

    tile.addEventListener('mouseover', moveImage);  

    numTiles++;
}

const removeTiles = () => {
    var tileToRemove = document.querySelectorAll('.tile')[0];
    tileToRemove.removeEventListener('mouseover', moveImage); 

    TweenMax.killTweensOf(tileToRemove);
    tileToRemove.parentNode.removeChild(tileToRemove);

    numTiles--;
}

const addListeners = () => {
    if (options.mouseTrail) {
        document.addEventListener('mousemove', event => {
            directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            directionY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        });
    }
}

const positionImage = () => {
    for(var t=0, l=numTiles; t < l; t++) {
        var nowTile = document.querySelectorAll('.tile')[t];
        
        var left = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth/2)));
        var top = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight/2)));
        
        nowTile.style.backgroundPosition = left + 'px ' + top + 'px';
    }
}

const resetImage = nowTile => {    
    var left = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth/2)));
    var top = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight/2)));

    TweenMax.to(nowTile, 1, {backgroundPosition:left + 'px ' + top + 'px', ease:Power1.easeInOut});
}

const moveImage = e => {
    var nowTile = e.currentTarget
    var minWidth = -tileContainer.offsetWidth+nowTile.offsetWidth;
    var minHeight = -tileContainer.offsetHeight+nowTile.offsetHeight;
    var nowLeftPos = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth/2)));
    var nowTopPos = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight/2)))
    var offset = 60;
    var left = nowLeftPos;
    var top = nowTopPos;
    
    if (options.mouseTrail) {
        if (directionX > 0) {
            left = nowLeftPos + offset;
        } else if (directionX < 0) {
            left = nowLeftPos - offset;
        }
        
        if (directionY > 0) {
            top = nowTopPos + offset;
        } else if (directionY < 0) {
            top = nowTopPos - offset;
        }
    } else {
        left = getRandomInt(nowLeftPos - offset , nowLeftPos + offset);
        top = getRandomInt(nowTopPos - offset, nowTopPos + offset);
    }
        
    if (left < minWidth)left=minWidth;
    if (left > 0)left=0;
    if (top < minHeight)top=minHeight;
    if (top > 0)top=0;

    TweenMax.to(nowTile, 1.5, {backgroundPosition:left + 'px ' + top + 'px', ease:Power1.easeOut, onComplete:resetImage, onCompleteParams:[nowTile]});
}
init();

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function() {
    var throttle = (type, name, obj) => {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(() => {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle('resize', 'optimizedResize');
})();