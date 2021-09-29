<template>
  <div class="mb-3">
    <b-card border-variant="dark" class="tip shadow mt-4">
      <b-card-header class="garden-plant-info-container  d-flex justify-content-center align-items-center border-dark">
        <div class="garden-plant-info  bg-grey  d-flex flex-fill">
          <div class="plant-name-container  border-right flex-fill">
            <p>{{ tip.plant.plant_name.charAt(0).toUpperCase() + tip.plant.plant_name.slice(1) }}</p>
          </div>
          <div class="view-garden-container bg-dark text-white flex-fill"
            ><p>View Garden</p></div
          >
        </div>
      </b-card-header>
      <b-card-header class="text-danger" header-bg-variant="white">
          <h3>{{ tip.title }}</h3>
      </b-card-header>
      <b-card-body>
        <b-card-text align-h="start" class="tip-content">
          <p>{{ tip.content }}</p>
        </b-card-text>

               <p class="mt-4"> - {{ tip.author.name }}</p>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'tip',
  props: ['tip']
}
</script>

<style scoped>

h3 {
  font-size: 1.2rem
}

.garden-plant-info-container{
  padding: 0;
}

.tip > .card-body{
  padding: 0;
}

.card.tip {
  text-align: center;
  margin: 15px;
  border-width: 2px;
}

.tip-title {
  padding: 0.5rem;
}

.garden-plant-info > div {
  width: 50%
}

.garden-plant-info p {
  margin: 0;
  padding: 0.5rem 0;
}

</style>
