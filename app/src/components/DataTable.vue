<template>
  <div class="overflow-x-auto text-gray-500">
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th class="py-2 px-4 border-white border-4 bg-gray-100 text-left">Показатель</th>
          <th
            v-for="column in columns"
            :key="column.key"
            class="py-2 px-4 border-white border-4 text-center"
            :class="column.headerClass || 'bg-gray-100'"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in rows" :key="row.id">
          <tr 
            @click="emit('row-click', row)"
            class="cursor-pointer hover:bg-gray-50"
            :class="row.rowClass"
          >
            <td class="py-2 px-4 border-white border-4">{{ row.label }}</td>
            
            <td
              v-for="column in columns"
              :key="column.key"
              class="py-2 px-4 border-white border-4 text-center relative"
              :class="row[column.key].bgColor"
            >
              <div class="flex justify-between items-center">
                <span class="font-medium">
                  {{ formatValue(row[column.key].value) }}
                </span>
                <span 
                  class="text-xs mt-1"
                  v-if="row[column.key].percent || row[column.key].percent === 0"
                  :class="getPercentColor(row[column.key].percent)"
                >
                  {{ formatPercent(row[column.key].percent) }}
                </span>
              </div>
            </td>
          </tr>

          <tr v-if="selectedRowId === row.id">
              <td colspan="100%" class="p-4">
                <LineChart :chartData="{
                  labels: ['Текущий день', 'Вчера', 'Этот день недели'],
                  datasets: [{
                    label: row.label,
                    data: [row.today.value, row.yesterday.value, row.thisWeekDay.value],
                    borderColor: '#10B981',
                    backgroundColor: '#10B98133',
                    tension: 0.4
                  }]}" />
  </td>
</tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue';
import LineChart from './LineChart.vue';
import type { Column, Row } from '../type/tableType';

defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  rows: {
    type: Array as PropType<Row[]>,
    required: true,
  },
  selectedRowId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['row-click']);

const formatValue = (value: number) => value.toLocaleString('ru-RU');

const formatPercent = (percent: number | undefined) => {
  const formattedPercent = percent ? percent.toFixed(1) : '0';
  return `${percent && percent > 0 ? '+' : ''}${formattedPercent}%`;
};

const getPercentColor = computed(() => (percent: number | undefined) => {
  if (percent === undefined) {
    return 'text-gray-500';
  }
  return percent > 0 ? 'text-green-600' : percent < 0 ? 'text-red-600' : 'text-gray-500';
});
</script>
