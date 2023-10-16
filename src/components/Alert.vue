<template>
    <div class="custom-alert">
      <div class="custom-alert-box">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button @click="closeAlert">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomAlert',
    props: {
      title: String,
      message: String,
    },
    methods: {
      closeAlert() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .custom-alert-box {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  button {
    background: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  