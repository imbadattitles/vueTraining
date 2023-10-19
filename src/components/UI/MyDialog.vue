<template lang="">
  <div
    @click.stop="hide"
    class="flex fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
    v-if="show === true"
  >
    <div @click.stop class="m-auto bg-white rounded-xl p-4">
      <slot />
    </div>
  </div>
</template>
<script>
import toggleMixin from '../../mixins/toggleMixin'

export default {
  mixins: [toggleMixin]
}
</script>
<style lang=""></style>
