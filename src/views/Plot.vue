<template>
  <div class="plot">
    <PlotViewer :plotType="plotType" />
  </div>
</template>

<script>
// @ is an alias to /src
import PlotViewer from "@/components/PlotViewer.vue";

const aPlotTypes = ["dots", "bins", "histogram", "smallmultiple"];

export default {
  name: "Plot",
  components: {
    PlotViewer,
  },
  computed: {
    plotType() {
      return this.activePlotType;
    },
  },
  data: () => ({
    activePlotType: "dots",
  }),
  mounted() {
    // change plotType
    let i = 0;
    setInterval(() => {
      if (++i >= aPlotTypes.length) {
        i = 0;
      }
      this.activePlotType = aPlotTypes[i];
    }, 2000);
  },
};
</script>
