<template>
  <program-detail :is-edit='true'></program-detail>
</template>

<script>
import ProgramDetail from './components/ProgramDetail'

export default {
  name: 'editProgram',
  components: { ProgramDetail}
}
</script>