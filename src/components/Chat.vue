<template>
<div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Earth To [...]</h3>
          <p>An chat system that mimics the real delay you would experience if chatting between worlds</p>
      </div>

      <div class="col-md-6 col-md-offset-3">
        Chatting as {{name || '\'no name\''}} from {{planet}}<br>

        <input type="text" v-model="name" placeholder="Your Name">
        <select v-model="planet" @change="loadPlanet(planet)">
          <!-- <option v-for="option in planetSelect" v-bind:value="option.value"> -->
            <!-- {{ option.text }} -->
          <!-- </option> -->
        </select>
      </div>

      <div class="col-md-6 col-md-offset-3" v-show="name && planet">
        <div>
          <!-- <p v-for="message in messages">{{message}}</p> -->
        </div>
        <input type="text" v-model="msg" v-on:keyup.13="transmit">
        <button v-on:click="transmit">Send</button>
      </div>
    </div>
</template>
<script></script>
<style>
      /* body {
        background-image: url('/images/stars.png');
        background-size: cover;
        text-align: center;
      }
      .row {
        padding-top: 3em;
      }
      p {
        padding: 1em 0;
      } */
    </style>