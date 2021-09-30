<template>
  <div>
    <b-card border-variant="dark">
      <b-card-header class="d-flex justify-content-center align-items-center border-dark">
        <div class="bg-grey d-flex flex-fill">
          <div class="bg-dark text-white flex-fill"><p>{{ ad.ad_date_posted }}</p></div>
        </div>
      </b-card-header>
      <b-card-body>
        <b-card-text align-h="start" class="ad-content">
          <h3>{{ ad.ad_type }}</h3>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ad',
  props: ['ad']
}
</script>
