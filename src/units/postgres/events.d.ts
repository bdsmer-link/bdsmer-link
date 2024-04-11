export type Event = {
  id: string;
  summary: string;
  startAt: Date;
  endAt: Date;
  show: boolean | null;
  cShow: boolean;
  userId: number | null;
  form: string | null;
  cForm: string | null;
  description: string | null;
  cDescription: string | null;
  host: string;
  provider?: string;
  location?: string;
};
