<template>
  <div class="miniapp">
    <minicom :json="jsonData"></minicom>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import minicom from '@/components/minicom/minicom';

const jsonData = [{
  type: "swiper",
  status: "on",
  tag: "swiper1",
  style: {
    height: "211px",
    width: "305px",
  },
  data: [{
    image: "https://verystar.admin.verystar.net/img/logo.jpg",
    link_type: "internal",
    link_value: "page/index/index",
    ext_foo: "bar",
    ext_bar: "another bar",
  }, {
    image: "https://www.php.net/images/logos/php-logo.svg",
    link_type: "h5",
    link_value: "https://www.php.net",
  }, {
    image: "https://www.starbucks.com.cn/assets/images/logo.svg",
    link_type: "miniprogram",
    link_value: "page/index/index",
    app_id: "4e72xxxxxxxxxxxxx",
  }],
}, {
  type: "text-view",
  status: "on",
  tag: "textview1",
  style: {
    height: "400px",
    width: "300px",
    image: "https://static-cdn.verystar.net/some_text_view_image.png",
  },
  data: {
    title: "活动规则",
    title_color: "#555555",
    content: "本活动开始于某年某⽉某⽇，结束于某年某与某⽇，xxxxxxxxx......",
    content_color: "#666666",
    button: "知道了",
    button_color: "#ffffff",
    button_bg_color: "#ff0000",
    ext_foo: "bar",
  },
}, {
  type: "cover-view",
  status: "on",
  tag: "coverview1",
  style: {
    height: "400px",
    width: "300px",
  },
  data: {
    image: "https://verystar.admin.verystar.net/img/logo.jpg",
    link_type: "internal",
    link_value: "page/index/index",
    ext_foo: "bar",
  },
}, {
  type: "image-view",
  status: "on",
  tag: "imageview1",
  style: {
    width: "305px",
    cols: 2,
  },
  data: [{
    title: "某主题1",
    title_color: "#555555",
    image: "https://verystar.admin.verystar.net/img/logo.jpg",
    link_type: "internal",
    link_value: "page/theme/theme?id=1",
  }, {
    title: "某主题2",
    title_color: "#555555",
    image: "https://verystar.admin.verystar.net/img/logo.jpg",
    link_type: "internal",
    link_value: "page/theme/theme?id=2",
    ext_foo: "bar",
  }],
}, {
  type: "button-view",
  status: "on",
  tag: "button1",
  style: {
    height: "50px",
    width: "100px",
    image: "https://verystar.admin.verystar.net/img/logo.jpg",
  },
  data: {
    title: "购买历史",
    title_color: "#555555",
    image: "https://verystar.admin.verystar.net/img/logo.jpg",
    link_type: "internal",
    link_value: "page/theme/theme?id=2",
    ext_foo: "bar",
  },
}];

export default {
  name: 'miniapp',
  created() {
  },
  data() {
    return {
      jsonData,
    };
  },
  methods: {
  },
  computed: mapState({}),
  watch: {},
  components: {
    minicom,
  },
};
</script>


<style lang="scss" scoped>
</style>