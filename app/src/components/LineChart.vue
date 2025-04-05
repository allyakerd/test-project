<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js';
import type { ChartData as AppChartData } from '../type/tableType';

Chart.register(...registerables);

const props = defineProps<{
  chartData: AppChartData;
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart<'line', number[], string> | null = null;

const prepareChartData = (): ChartData<'line', number[], string> => {
  return {
    labels: props.chartData.labels,
    datasets: props.chartData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(value => value),
    })),
  };
};

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

onMounted(() => {
  renderChart();
});

watch(
  () => props.chartData,
  () => {
    renderChart();
  },
  { deep: true }
);

const renderChart = () => {
  if (!chartRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartRef.value.getContext('2d');
  if (!ctx) return;

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: prepareChartData(),
    options: chartOptions,
  });
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>