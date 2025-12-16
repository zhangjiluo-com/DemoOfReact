<script setup lang="ts">
import { ICP_REGISTRATION_CODE } from "../config";
</script>

<template>
  <footer :class="$style.wrap">
    <div :class="$style.content">
      <div :class="$style.beian">
        <a
          href="https://beian.miit.gov.cn/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          {{ ICP_REGISTRATION_CODE }}
        </a>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011402000588"
          :class="$style.gongan_beian"
        >
          <img
            :class="$style.gongan_beian_image"
            src="https://cdn9.jiluo.cc/tmp/beian.png"
          />
          川公网安备 51011402000588号
        </a>
      </div>
      <div>© 版权所有 2023</div>
      <div :class="$style.cdn_row">
        本网站由
        <a
          href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
          rel="noopener nofollow noreferrer"
          target="_blank"
          referrerpolicy="no-referrer"
        >
          <img
            :class="$style.upyun_logo"
            src="../assets/upyun_logo.png"
            alt=""
          />
        </a>
        提供CDN加速/云存储服务
      </div>
    </div>
  </footer>
</template>

<style module>
.wrap {
  background: #ddd;
  position: sticky;
  top: 100vh;
  font-size: 12px;
  line-height: 1.5;
}
.content {
  max-width: 1024px;
  padding: 20px 0;
  margin: auto;
  text-align: center;
  font: 12px / 1 inherit;
}
.beian {
  color: #939393;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
}
.gongan_beian {
  display: flex;
  align-items: center;
}
.gongan_beian_image {
  width: 16px;
  height: 16px;
  margin: 0 4px 0 0;
}
.cdn_row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  line-height: 1;
  color: #939393;
  margin: 8px 0 0;
}
.upyun_logo {
  height: 22px;
}
</style>
