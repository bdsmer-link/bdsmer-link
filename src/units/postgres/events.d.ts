export type Event = {
  id: string;
  summary: string;
  startAt: Date;
  endAt: Date;
  host: string;
  form: string | null;
  description: string;
  provider?: string;
  location?: string;
};
