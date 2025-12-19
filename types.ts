export interface RoadmapStep {
  title: string;
  description: string;
  actionItem: string;
}

export interface RoadmapResponse {
  summary: string;
  steps: RoadmapStep[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}