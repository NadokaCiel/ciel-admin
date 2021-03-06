const getOption = key => JSON.parse(JSON.stringify(optionMap[key] || {}));

const optionMap = {
  swiper: {
    type: "swiper",
    status: "on",
    tag: "swiper1",
    style: {
      height: "211px",
      width: "375px",
    },
    data: [{
      image: "https://nadokaciel.cn/public/uploads/15851273912515b72.png",
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
  },
  textView: {
    type: "text-view",
    status: "on",
    tag: "textview1",
    style: {
      height: "400px",
      width: "300px",
      image: "https://nadokaciel.cn/public/uploads/1585127407841g9w0.png",
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
  },
  coverView: {
    type: "cover-view",
    status: "on",
    tag: "coverview1",
    style: {
      height: "400px",
      width: "300px",
    },
    data: {
      image: "https://nadokaciel.cn/public/uploads/15851273912515b72.png",
      link_type: "internal",
      link_value: "page/index/index",
      ext_foo: "bar",
    },
  },
  imageView: {
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
      image: "https://nadokaciel.cn/public/uploads/15851273912515b72.png",
      link_type: "internal",
      link_value: "page/theme/theme?id=1",
    }, {
      title: "某主题2",
      title_color: "#555555",
      image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583233164771&di=2b07988a36c9c291848c5c23c9d76efa&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg",
      link_type: "internal",
      link_value: "page/theme/theme?id=2",
      ext_foo: "bar",
    }],
  },
  buttonView: {
    type: "button-view",
    status: "on",
    tag: "button1",
    style: {
      height: "50px",
      width: "100px",
      image: "https://nadokaciel.cn/public/uploads/15851273912515b72.png",
    },
    data: {
      title: "购买历史",
      title_color: "#555555",
      image: "https://nadokaciel.cn/public/uploads/15851273912515b72.png",
      link_type: "internal",
      link_value: "page/theme/theme?id=2",
      ext_foo: "bar",
    },
  },
};

export default {
  getOption,
};
