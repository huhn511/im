<template>
  <div class="chat" v-on:click="focusInput">
    <MessageList :messages="messages"/>
    <div class="new_message">
      <p>unknown@im: $</p>
      <form v-on:submit.prevent="send" v-bind:class="{ sending: isSending }">
        <textarea
          v-model="new_message"
          ref="new_message"
          type="text"
          autofocus="autofocus"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="send"
        />
      </form>
    </div>
  </div>
</template>

<script>
import MessageList from "./MessageList";
import { composeAPI } from "@iota/core";
const Converter = require("@iota/converter");
import generateSeed from "../utils/generateSeed.js";

const iota = composeAPI({
  provider: "https://nodes.devnet.thetangle.org:443"
});

// Create a variable for the address we will send too
const address =
  "IMREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLQD";

iota
  .getNodeInfo()
  .then(info => console.log(info))
  .catch(error => {
    console.log(`Request error: ${error.message}`);
  });

export default {
  name: "Chat",
  components: { MessageList },
  data() {
    return {
      new_message: "",
      messages: [],
      isSending: false,
      seed: ""
    };
  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if (event.key == "Enter") {
        console.log("the id of the input was:" + event.currentTarget.id);
        console.log("enter key was pressed!");
      }
    },
    focusInput() {
      this.$refs.new_message.focus();
    },
    send() {
      this.isSending = true;
      const message = Converter.asciiToTrytes(this.new_message);

      const transfers = [
        {
          value: 0,
          address: address, // Where the data is being sent
          message: message // The message converted into trytes
        }
      ];
      console.log("seed", this.seed);
      iota
        .prepareTransfers(localStorage.getItem("seed"), transfers)
        .then(trytes => iota.sendTrytes(trytes, 3, 9))
        .then(bundle => {
          console.log("Transfer successfully sent");
          bundle.map(tx => console.log(tx));
          this.fetchData();
          this.new_message = "";
          this.isSending = false;
          this.$refs.new_message.focus();
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchData() {
      iota
        .findTransactionObjects({ addresses: [address] })
        .then(response => {
          this.messages = [];
          const msg = response
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(tx => {
              let msg = tx.signatureMessageFragment;
              let message = {
                text: Converter.trytesToAscii(msg + "9"),
                timestamp: tx.timestamp
              };
              this.messages.push(message);
              this.$refs.new_message.focus();
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    this.seed = localStorage.getItem("seed");
    if (!this.seed) {
      console.log("generate new seed");
      this.seed = generateSeed();
      this.seed = localStorage.setItem("seed", this.seed);
    }
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.new_message {
  display: flex;
  flex-direction: row;
  p {
    min-width: 125px;
  }
  textarea {
    width: 70vw;
    height: 150px;
    background: transparent;
    border: none;
    color: var(--primary);
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    margin-left: 10px;
    &:focus {
      outline: none;
    }
  }
}

.sending {
  display: none;
}
</style>
