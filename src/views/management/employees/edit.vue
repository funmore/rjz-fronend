<template>
  <contract-detail :is-edit='true'></contract-detail>
</template>

<script>
import ContractDetail from './components/ContractDetail'

export default {
  name: 'editProgram',
  components: { ContractDetail }
}
</script>