export enum CalendarAutoSync {
  day = "day",
  week = "week",
  month = "month",
}

export type Calendar = {
  id: string | null;
  userId: number;
  autosync: CalendarAutoSync | null;
  checksum: string | null;
  lastUpdatedAt: Date | null;
  lastCheckedAt: Date | null;
  lastCheckedError: string | null;
  URLParser: string[] | null;
  allowWords: string[] | null;
  blockWords: string[] | null;
};
