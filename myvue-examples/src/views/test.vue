<template>
<div class="content-main">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs">
        1 of 2
      </div>
      <div class="col-xs">
        1 of 2
      </div>
    </div>
    <div class="row">
      <div class="col-xs">
        1 of 3
      </div>
      <div class="col-xs">
        1 of 3
      </div>
      <div class="col-xs">
        1 of 3
      </div>
    </div>

  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs">
        1 of 3
      </div>
      <div class="col-xs-6">
        2 of 3 (wider)
      </div>
      <div class="col-xs">
        3 of 3
      </div>
    </div>
    <div class="row">
      <div class="col-xs">
        1 of 3
      </div>
      <div class="col-xs-5">
        2 of 3 (wider)
      </div>
      <div class="col-xs">
        3 of 3
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-xs">
        1 of 3
      </div>
      <div class="col-xs-6">
        2 of 3 (wider)
      </div>
      <div class="col-xs">
        3 of 3
      </div>
    </div>
    <div class="row">
      <div class="col-xs">
        1 of 3
      </div>
      <div class="col-xs-5">
        2 of 3 (wider)
      </div>
      <div class="col-xs">
        3 of 3
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row flex-items-xs-top">
      <div class="col-xs">
        One of three columns
      </div>
      <div class="col-xs">
        One of three columns
      </div>
      <div class="col-xs">
        One of three columns
      </div>
    </div>
    <div class="row flex-items-xs-middle">
      <div class="col-xs">
        One of three columns
      </div>
      <div class="col-xs">
        One of three columns
      </div>
      <div class="col-xs">
        One of three columns
      </div>
    </div>
    <div class="row flex-items-xs-bottom">
      <div class="col-xs">
        One of three columns
      </div>
      <div class="col-xs">
        One of three columns
      </div>
      <div class="col-xs">
        One of three columns
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row flex-items-xs-left">
      <div class="col-xs-4">
        One of two columns
      </div>
      <div class="col-xs-4">
        One of two columns
      </div>
    </div>
    <div class="row flex-items-xs-center">
      <div class="col-xs-4">
        One of two columns
      </div>
      <div class="col-xs-4">
        One of two columns
      </div>
    </div>
    <div class="row flex-items-xs-right">
      <div class="col-xs-4">
        One of two columns
      </div>
      <div class="col-xs-4">
        One of two columns
      </div>
    </div>
    <div class="row flex-items-xs-around">
      <div class="col-xs-4">
        One of two columns
      </div>
      <div class="col-xs-4">
        One of two columns
      </div>
    </div>
    <div class="row flex-items-xs-between">
      <div class="col-xs-4">
        One of two columns
      </div>
      <div class="col-xs-4">
        One of two columns
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-xs flex-xs-unordered">
        First, but unordered
      </div>
      <div class="col-xs flex-xs-last">
        Second, but last
      </div>
      <div class="col-xs flex-xs-first">
        Third, but first
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'app-test'
  }
</script>

<style>
  .row {
    margin-top: 1rem;
  }
  .row > [class^="col-"] {
    padding-top: .75rem;
    padding-bottom: .75rem;
    background-color: rgba(86, 61, 124, 0.15);
    border: 1px solid rgba(86, 61, 124, 0.2);
  }
  .flex-items-xs-top, .flex-items-xs-middle,.flex-items-xs-bottom {
    min-height: 6rem;
    background-color: rgba(255, 0, 0, 0.1);
  }
</style>
