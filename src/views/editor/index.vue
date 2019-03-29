<template>
  <div class="components-container">
    <div>
      <tinymce :height="300" v-model="content" :init="{selector: 'textarea',plugins: 'ExportToDo',toolbar: 'ExportToDoc',etd_file_name: 'tinymce-content'}"></tinymce>
    </div>




  </div>
</template>

<script>
 import Tinymce from '@/components/Tinymce'





export default {
  name: 'tinymce-demo',
  components: { 'tinymce':Tinymce },
  data() {
    return {

      content:'请输入内容',
   
    }
  },
   methods: {
    

  }

}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


