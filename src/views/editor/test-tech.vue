<template>
  <div class="components-container">
    <div><p>{{name_test_tech}}</p></div>
    <div>
      <tinymce :height="300" v-model="content_test_tech"></tinymce>
    </div>

    <div><p>{{name_impact_anaysis}}</p></div>
    <div>
      <tinymce :height="300" v-model="content_impact_anaysis"></tinymce>
    </div>
  </div>
  </div>

</template>

<script>
 import Tinymce from '@/components/Tinymce'
import Editor from '@tinymce/tinymce-vue';

export default {
  name: '测试技术和方法',
  components: { 'tinymce':Tinymce },
  data() {
    return {
      name_test_tech:"测试技术和方法",
      content_test_tech:'测试技术和方法',
      name_impact_anaysis:"影响域分析（只有在回归测试时起作用）",
      content_impact_anaysis:'影响域分析'
        }

  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


