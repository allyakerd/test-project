export type ColumnKey = 'today' | 'yesterday' | 'thisWeekDay';

export interface CellData {
  bgColor: string;
  value: number;
  percent?: number;
}

export interface Column {
  key: ColumnKey;
  title: string;
  headerClass?: string;
}

export interface Row {
  id: number;
  label: string;
  today: CellData;
  yesterday: CellData;
  thisWeekDay: CellData;
  rowClass?: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}