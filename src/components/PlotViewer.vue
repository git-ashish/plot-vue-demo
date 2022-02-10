<template>
  <div ref="plotDom" class="plot" v-html="plotHTML" />
</template>

<style lang="scss">
.plot svg {
  display: block;
  margin: 0 auto;
}
</style>

<script>
import * as Plot from "@observablehq/plot";
import { watch, computed, ref, toRefs } from "vue";
import { useStore } from "vuex";

function getPlotOptions(sPlotType, data) {
  const oPlotTypeOptions = {
    dots: {
      marks: [Plot.dot(data, { x: "weight", y: "height", stroke: "sex" })],
    },
    bins: {
      marks: [
        Plot.rect(
          data,
          Plot.bin(
            { fillOpacity: "count" },
            { x: "weight", y: "height", fill: "sex" }
          )
        ),
      ],
    },
    histogram: {
      marks: [
        Plot.rectY(
          data,
          Plot.binX({ y: "count" }, { x: "weight", fill: "sex" })
        ),
      ],
    },
    smallmultiple: {
      grid: true,
      facet: {
        data: data,
        y: "sex",
      },
      marks: [
        Plot.rectY(
          data,
          Plot.binX({ y: "count" }, { x: "weight", fill: "sex" })
        ),
        Plot.ruleY([0]),
      ],
    },
  };
  return oPlotTypeOptions[sPlotType] || oPlotTypeOptions.dots;
}

export default {
  components: {},
  props: {
    plotType: {
      type: String,
      default: "dots",
    },
  },
  data: () => ({
    isMounted: false,
  }),
  setup(props) {
    const store = useStore();
    const { plotType } = toRefs(props);
    // get data from store
    const athletsData = computed(() => store.getters.athletes);

    // default
    const oDefaultConfig = getPlotOptions(plotType, athletsData.value);
    // default plot
    const plotHTML = ref(Plot.plot(oDefaultConfig).outerHTML);

    // get plot options for the current plot type
    watch(plotType, (newPlotType) => {
      const oConfig = getPlotOptions(newPlotType, athletsData.value);
      plotHTML.value = Plot.plot(oConfig).outerHTML;
    });

    return {
      plotHTML,
    };
  },
};
</script>