<template>
    <image-slider :images="images" :params="{minMoveDistance: 50, autoPlay: true}"></image-slider>
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
            "http://img.ishequ360.com/banner/4daee25ccc0449477605401de47ac159.jpeg",
            "http://img.ishequ360.com/banner/c0bf89b74d46b1497f8c9707354a3017.jpeg",
            "http://img.ishequ360.com/banner/840016472ad9b260bf3e3ada43760c7a.jpeg",
            "http://img.ishequ360.com/banner/08ed471e7648ca62b0636a638e2bb757.jpeg",
            "http://img.ishequ360.com/banner/b5eb09330d341b42127f18a4263dfe62.jpeg"
        ]
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
</style>
