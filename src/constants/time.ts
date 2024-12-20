export enum DurationsEnum {
  FiveSeconds = "fiveSeconds",
  TenSeconds = "tenSeconds",
  ThirtySeconds = "thirySeconds",
  OneMinute = "oneMinute",
  FiveMinutes = "fiveMinutes",
  FifteenMinutes = "fifteenMinutes",
  TenMinutes = "tenMinutes",
  ThirtyMinutes = "thirtyMinutes",
  OneHour = "oneHour",
  ThreeHours = "threeHours",
  SixHours = "sixHours",
  TwelveHours = "twelveHours",
  OneDay = "oneDay",
  OneWeek = "oneWeek",
  OneMonth = "oneMonth",
}

/** Set of different durations in milliseconds */
export const COMMON_DURATIONS = {
  [DurationsEnum.FiveSeconds]: 5 * 1000,
  [DurationsEnum.TenSeconds]: 10 * 1000,
  [DurationsEnum.ThirtySeconds]: 30 * 1000,
  [DurationsEnum.OneMinute]: 60 * 1000, // 1 minute in milliseconds
  [DurationsEnum.FiveMinutes]: 5 * 60 * 1000, // 5 minutes in milliseconds
  [DurationsEnum.TenMinutes]: 10 * 60 * 1000, // 15 minutes in milliseconds
  [DurationsEnum.FifteenMinutes]: 15 * 60 * 1000, // 15 minutes in milliseconds
  [DurationsEnum.ThirtyMinutes]: 30 * 60 * 1000, // 30 minutes in milliseconds
  [DurationsEnum.OneHour]: 60 * 60 * 1000, // 1 hour in milliseconds
  [DurationsEnum.ThreeHours]: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
  [DurationsEnum.SixHours]: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
  [DurationsEnum.TwelveHours]: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
  [DurationsEnum.OneDay]: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  [DurationsEnum.OneWeek]: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
  [DurationsEnum.OneMonth]: 30 * 24 * 60 * 60 * 1000, // 1 month (~30 days) in milliseconds
};
