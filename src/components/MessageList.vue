<template>
  <ul id="example-1">
    <li v-for="(message, index) in messages" v-bind:key="index">
      <p>{{ message.text }}</p>
      <span class="time-right">{{message.timestamp | formatTimestampToDate}}</span>
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
li {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  list-style: none;
}

/* Clear floats */
li::after {
  content: "";
  clear: both;
  display: table;
}

li:last-child {
  margin-bottom: 140px;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}
</style>
