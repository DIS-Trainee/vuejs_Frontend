<template>
  <div class="page-not-found">
    <div class="alert">
      <i class="las la-exclamation-circle"></i>
      <h1>Page Not Found</h1>
      <h5>This page is underconstruction <br />or moved to another place.</h5>

      <v-ons-toolbar-button id="btn" v-on:click="$router.go(-1)">
        <i class="las la-arrow-left"></i>
        <span>Back to previous page</span>
      </v-ons-toolbar-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  created() {
    this.$store.commit("CLEAR_CURRENT_INAPP");
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.page-not-found {
  width: 100%;
  height: 100%;
  position: relative;
  .alert {
    width: 300px;
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    i {
      font-size: 7em;
      color: $web-theme-color-secondary;
    }
    h1 {
      color: $web-theme-color-secondary;
      font-size: 2.5em;
    }
    h5 {
      color: $web-font-color-grey;
      font-weight: 400;
      font-size: 1.75em;
      margin: 0px 0 20px 0;
    }
  }
  #btn {
    width: fit-content;
    margin: 0 auto;
    padding: 0;
    padding-right: 10px;
    height: 34px;
    justify-content: flex-start;
    border-radius: 7px;
    margin-bottom: 10px;
    border: 0px;
    background: #ececec;
    i {
      font-size: 18px;
      margin-left: 15px;
    }
    span {
      color: $web-theme-color-secondary;
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>