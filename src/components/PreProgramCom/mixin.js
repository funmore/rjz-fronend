export default {
    methods: {

      handleClose(){
        var args={
          type:this.$options.name,
          value:false
        }
        this.$emit('close',args)
      },
      cancel(){
        var args={
          type:this.$options.name,
          value:false
        }
        this.$emit('close',args)
      }
    }
}