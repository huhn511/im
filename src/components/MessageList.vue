<template>
  <ul id="message_list">
    <li v-for="(message, index) in messages" v-bind:key="index">
      <p>
      <span class="time-right">[{{message.timestamp | formatTimestampToDate}}]:</span>
      {{ message.text }}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Messages",
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    itemCount() {
      return this.messages.length;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  text-align: left;
  list-style: none;
  p {
    margin: 0;
    line-height: 1
  }
}
</style>
