<template>


</template>

<script>


export default{
  name: "AppTopBar",
  components: {},
  data(){
    return{
      user:{},
      conUser: false,
    }
  },
  created(){
    console.log(this.$store)
    if (this.$store.state.status.server == true){
      console.log("fetchUser")
    }
  },
  mounted() {

  },
  updated() {

  },
  methods: {
  },
  computed: {

  }
}


</script>

<style lang="scss" scoped>



</style>