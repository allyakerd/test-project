<template>
  <div class="container mx-auto p-4">
    <h1 class="text-lg font-bold mb-4">Финансовая аналитика</h1>
    <DataTable
      :columns="columns"
      :rows="rows"
      @row-click="handleRowClick"
      :selected-row-id="selectedRowId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from './components/DataTable.vue';
import type { Column } from './type/tableType';

const columns: Column[] = [
  { key: 'today', title: 'Текущий день', headerClass: 'bg-green-100' },
  { key: 'yesterday', title: 'Вчера', headerClass: 'bg-gray-100' },
  { key: 'thisWeekDay', title: 'Этот день недели', headerClass: 'bg-gray-100' },
];

interface RawRow {
    id: number;
    label: string;
    thisWeekDay: {
        bgColor: string;
        value: number;
    };
    rowClass?: string;
}

const rawRows: RawRow[] = [
  {
    id: 1,
    label: 'Выручка, руб',
    thisWeekDay: { 
      bgColor: 'bg-red-100', 
      value: 4805121, 
    },
    rowClass: 'bg-gray-100'
  },
  {
    id: 2,
    label: 'Наличные',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 300000, 
    },
    rowClass: 'bg-gray-100'

  },
   {
    id: 3,
    label: 'Безналичный расчет',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 100000, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 4,
    label: 'Кредитные карты',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 100521, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 5,
    label: 'Средний чек, руб',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 900, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 6,
    label: 'Средний гость, руб',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 800, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 7,
    label: 'Удаления из чека (после оплаты), руб',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 900, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 8,
    label: 'Удаления из чека (до оплаты), руб',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 900, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 9,
    label: 'Количество чеков',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 34, 
    },
    rowClass: 'bg-gray-100'
  },
   {
    id: 10,
    label: 'Количество гостей',
    thisWeekDay: { 
      bgColor: 'bg-gray-100', 
      value: 32, 
    },
    rowClass: 'bg-gray-100'
  },
];

const todayValues = [500521, 300000, 100000, 100521, 1300, 1200, 1000, 1300, 34, 34];
const yesterdayValues = [480521, 300000, 100000, 100521, 900, 800, 1100, 1300, 36, 36];

const rows = computed(() => {
  return rawRows.map((row, index) => {
    const todayValue = todayValues[index];
    const yesterdayValue = yesterdayValues[index];
    const percent = ((todayValue - yesterdayValue) / yesterdayValue) * 100;

    return {
      ...row,
      today: {
        bgColor: 'bg-green-100',
        value: todayValue,
      },
      yesterday: {
        bgColor: getColor(todayValue, yesterdayValue),
        value: yesterdayValue,
        percent: parseFloat(percent.toFixed(0)),
      }
    }
  })
});

const selectedRowId = ref<number>();

const handleRowClick = (row: { id: number }) => {
  selectedRowId.value = selectedRowId.value === row.id ? undefined : row.id;
};

const getColor = (todayValue: number, yesterdayValue: number): string => {
  if (yesterdayValue > todayValue) {
    return 'bg-red-100';
  } else if (yesterdayValue < todayValue) {
    return 'bg-green-100';
  } else {
    return 'bg-gray-100';
  }
};

</script>
