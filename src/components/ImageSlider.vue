<template>
    <div>
        <div class="slider-container" @touchstart="swipeStart" @touchmove="swipeMove" @touchend="swipeEnd">
            <div class="slider-wrap" :style="transformObj">
                <div class="slider-item" v-for="img in images">
                    <img class="slide-img" :src="img">
                </div>
            </div>

            <div class="slider-points">
                <div class="slide-point" v-for="i in itemCount"
                     :class="{'highlight': (i - 1) == slideIndex}"
                     @click="slideTo(i - 1)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
    function docTouchStart(e) {
        e.preventDefault();
    }

    export default {
        name: 'image-slider',
        props: ['images', 'params'],
        data() {
            return {
                slideIndex: 0,
                slideIndexTemp: 0,
                startX: 0,
                moveStartTime: 0,
                manualOffset: 0,
                playTimer: null,
                playPause: false,
                winWidth: window.innerWidth,

                slideParams: {
                    minMoveDistance: 50,     // 最小滑动距离 单位: 像素
                    minMoveSpeed: 200,        // 最小滑动速度 单位: 像素/秒
                    autoPlay: true,             // 是否自动播放
                    autoPlayInterval: 2000      // 自动播放时间间隔
                }
            }
        },
        mounted: function() {
            for (var paramKey in this.params) {
                if (this.params.hasOwnProperty(paramKey)) {
                    this.slideParams[paramKey] = this.params[paramKey];
                }
            }
            if (this.slideParams.autoPlay) {
                this.playTimer = setInterval(() => {
                    if (this.playPause) return;
                    this.slideIndex = (this.slideIndex + 1) % this.itemCount;
                }, this.slideParams.autoPlayInterval);
            }

            window.addEventListener('resize', () => {
                this.winWidth = window.innerWidth;
            });
        },
        computed: {
            itemCount: function() {
                return this.images.length;
            },
            transformObj: function() {
                var translateProp = 'translate3d(' + (-1 * this.winWidth * this.slideIndex + this.manualOffset) + 'px, 0, 0)';
                var obj = {
                    '-webkit-transform': translateProp,
                    'transform': translateProp,
                };
                if (this.manualOffset != 0) {
                    obj.transition = 'none';
                }
                return obj;
            }
        },
        methods: {
            slideNext: function() {
                if (this.slideIndex == this.itemCount - 1) return;
                this.slideIndex ++;
            },
            slidePrev: function() {
                if (this.slideIndex == 0) return;
                this.slideIndex --;
            },
            slideTo: function(index) {
                if (index < 0 || index > this.itemCount - 1) return;
                this.slideIndex = index;
            },
            swipeStart: function(e) {
                document.addEventListener('touchmove', docTouchStart);
                this.startX = e.touches[0].clientX;
                this.playPause = true;
            },
            swipeMove: function(e) {
                var moveX = e.touches[0].clientX;
                this.manualOffset = moveX - this.startX;
                if (!this.moveStartTime) {
                    this.moveStartTime = new Date().getTime();
                }
            },
            swipeEnd: function(e) {
                document.removeEventListener('touchmove', docTouchStart);
                var touch = e.changedTouches[0];
                var endX = touch.clientX;
                var moveEndTime = new Date().getTime();
                var moveDistance = endX - this.startX;
                var moveDistanceAbs = Math.abs(moveDistance);
                var moveDuration = Math.abs(moveEndTime - this.moveStartTime);
                var moveSpeed = moveDistanceAbs / (moveDuration / 1000);

                this.manualOffset = 0;
                this.startX = 0;
                this.moveStartTime = 0;
                this.playPause = false;

                if (moveDistanceAbs > this.slideParams.minMoveDistance && moveSpeed > this.slideParams.minMoveSpeed) {
                    moveDistance < 0 ? this.slideNext() : this.slidePrev();
                }
            }
        }
    }
</script>

<style>
    .slider-container {
        width: 100%;
        height: 180px;
        overflow: hidden;
        position: relative;
    }
    .slider-wrap {
        display: flex;
        height: 100%;
        flex-direction: row;
        flex-wrap: nowrap;
        transition: transform 0.3s ease-out;
    }
    .slider-item {
        flex-shrink: 0;
        width: 100%;
    }
    .slide-img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .slider-points {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .slide-point {
        width: 8px;
        height: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        margin: 0 5px;
    }
    .slide-point.highlight {
        background-color: #eeeeee;
    }
</style>
