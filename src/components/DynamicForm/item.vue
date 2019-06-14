<style>
.block {
  display: block !important;
  display: flex !important;
}
</style>

<template>
    <el-form-item
    :label="item.label"
    :prop="item.key"
    :class="{'block':item.block}"
  >

    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs"
      :type="item.subtype"
      v-on="$listeners"
    ></el-input>

    <input-number
      v-else-if="item.type==='number'"
      v-bind="$attrs"
      v-on="$listeners"
    ></input-number>

    <el-checkbox
      v-else-if="item.type==='switch' && item.appearance==='checkbox'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-checkbox>
    <el-switch
      v-else-if="item.type==='switch'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-switch>

    <el-rate
      v-else-if="item.type==='rate'"
      v-bind="$attrs"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      text-color="#ff9900"
      v-on="$listeners"
    ></el-rate>

    <el-color-picker
      v-else-if="item.type==='color'"
      v-bind="$attrs"
      :color-format="item.format"
      v-on="$listeners"
    ></el-color-picker>

    <el-slider
      v-else-if="item.type==='slider'"
      v-bind="$attrs"
      :range="item.isRange"
      v-on="$listeners"
    ></el-slider>

    <el-radio-group
      v-else-if="item.type==='radio'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        v-for="o in item.options"
        :is="item.button?'el-radio-button':'el-radio'"
        :key="o.value"
        :label="o.value"
        :disabled="o.disabled"
        :border="item.border"
      >{{ o.label }}</component>
    </el-radio-group>

    <el-checkbox-group
      v-else-if="item.type==='checkbox'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        v-for="o in item.options"
        :is="item.button?'el-checkbox-button':'el-checkbox'"
        :key="o.value"
        :disabled="o.disabled"
        :label="o.value"
        :border="item.border"
      >{{ o.label }}</component>
    </el-checkbox-group>

    <el-select
      v-else-if="item.type==='select'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-option
        v-for="o in item.options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled"
      >
      </el-option>
    </el-select>


    <el-time-picker
      v-else-if="item.type==='time'"
      :format="item.valueFormat"
      v-bind="$attrs"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      v-on="$listeners"
    ></el-time-picker>

    <el-date-picker
      v-else-if="item.type==='date'"
      :type="item.subtype"
      :format="item.viewFormat||item.valueFormat"
      v-bind="$attrs"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      v-on="$listeners"
    ></el-date-picker>


    <span v-else>未知控件类型</span>

  </el-form-item>
</template>

<script>
export default {
  components: {
    Richtext,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  }

};
</script>