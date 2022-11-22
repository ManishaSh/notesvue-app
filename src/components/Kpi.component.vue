<template>
  <div class="kpi-container">
    <div>
      <span>Total</span>
      <h2>{{ total }}</h2>
    </div>
    <div>
      <span>Completed</span>
      <h2>{{ completed }}</h2>
    </div>
    <div>
      <span>Not Completed</span>
      <h2>{{ notCompleted }}</h2>
    </div>
  </div>

</template>
<script>
export default {
  name: "kpi-indicators",
  props: {
    total: Number,
    completed: Number,
    notCompleted: Number
  }
}
</script>

<style scoped>
.kpi-container {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  background-color: var(--color-white);
  color: #000000;
  padding: 32px;
  box-shadow: 2px 2px 2px lightgrey;
}

.kpi-container>div {
  text-align: center;
}
</style>