<template>
  <div>
    <b-card border-variant="dark">
      <b-card-header class="d-flex justify-content-center align-items-center border-dark">
        <div class="bg-grey  d-flex flex-fill">
          <div class="border-right flex-fill">
            <p>{{ ad.ad_type }}</p>
          </div>
          <div class="bg-dark text-white flex-fill"><p>{{ ad.ad_date_posted }}</p></div>
        </div>
      </b-card-header>
      <b-card-header class="text-danger" header-bg-variant="white">
          <h3>Ad title</h3>
      </b-card-header>
      <b-card-body>
        <b-card-text align-h="start" class="tip-content">
          <p>{{ ad.ad_description }}</p>
        </b-card-text>
               <p class="mt-4">Random author</p>
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
