<template>
  <div class="chat">
    <MessageList :messages="messages"/>
    <div class="new_message" v-bind:class="{ sending: isSending }">
      <input v-model="new_message" type="text">
      <button v-on:click="send">Send</button>
    </div>
  </div>
</template>

<script>
import MessageList from "./MessageList";
import { composeAPI } from "@iota/core";
const Converter = require("@iota/converter");
import generateSeed from '../utils/generateSeed.js'

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
      seed: ''
    };
  },
  methods: {
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
        .prepareTransfers(localStorage.getItem('seed'), transfers)
        .then(trytes => iota.sendTrytes(trytes, 3, 9))
        .then(bundle => {
          console.log("Transfer successfully sent");
          bundle.map(tx => console.log(tx));
          this.fetchData();
          this.new_message = ""
          this.isSending = false;
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
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(tx => {
              let msg = tx.signatureMessageFragment;
              let message = {
                text: Converter.trytesToAscii(msg + "9"),
                timestamp: tx.timestamp
              }
              this.messages.push(message);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    this.seed = localStorage.getItem('seed')
    if(!this.seed) {
      console.log("generate new seed")
      this.seed = generateSeed();
      this.seed = localStorage.setItem('seed', this.seed)
    }
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chat {
  width: 80%;
  margin: 0 auto;
}
.new_message {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
  input {

    padding: 20px 20px; 
    line-height: 28px;
    width: 70%;
  }
  button {

    padding: 20px 10px; 
    line-height: 28px;
    width: 20%
  }
}

.sending {
  display: none;
}
</style>
