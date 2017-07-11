<template>
    <div>
        <image-slider :images="images" :params="{minMoveDistance: 50, autoPlay: true}"></image-slider>

        <div style="margin-top: 20px;">
            <button @click="changeImages3">更换图片(3张)</button>
            <button @click="changeImages2">更换图片(2张)</button>
        </div>
    </div>
</template>

<script>
import ImageSlider from './components/ImageSlider.vue';
export default {
  name: 'app',
  components: {
    [ImageSlider.name]: ImageSlider
  },
  data () {
    return {
        images: [
            "http://img.ishequ360.com/images/test/banner1@1x.jpeg",
            "http://img.ishequ360.com/images/test/banner6@1x.jpeg",
            "http://img.ishequ360.com/images/test/banner3@1x.jpeg",
            "http://img.ishequ360.com/images/test/banner4@1x.jpeg",
            "http://img.ishequ360.com/images/test/banner5@1x.jpeg",
        ]
    }
  },
    methods: {
        changeImages3: function() {
            this.images = [
                "http://img.ishequ360.com/images/test/banner1@1x.jpeg",
                "http://img.ishequ360.com/images/test/banner6@1x.jpeg",
                "http://img.ishequ360.com/images/test/banner3@1x.jpeg",
            ];
        },
        changeImages2: function() {
            this.images = [
                "http://img.ishequ360.com/images/test/banner4@1x.jpeg",
                "http://img.ishequ360.com/images/test/banner5@1x.jpeg",
            ];
        }
    }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

    button {
        background-color: green;
        color: #ffffff;
        border-radius: 3px;
        padding: 5px 10px;
        border: none;
    }
</style>
