<template>
  <div class="archived app-container">
    <timeLine time-line-name="归档" api-name="list" />
  </div>
</template>

<script>
import timeLine from "@/components/timeLine/timeLine";

export default {
  name: "Archive",
  components: {
    timeLine
  }
};
</script>
