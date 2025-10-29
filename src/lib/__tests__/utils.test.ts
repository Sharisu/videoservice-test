import { formatDate, formatDuration, formatRelativeDate, formatViews } from '../utils';

describe('formatDuration', () => {
  it('should format seconds less than a minute correctly', () => {
    expect(formatDuration(45)).toBe('0:45');
  });

  it('should format exactly 125 seconds as 2:05', () => {
    expect(formatDuration(125)).toBe('2:05');
  });

  it('should format hours, minutes, and seconds correctly', () => {
    expect(formatDuration(7384)).toBe('2:03:04');
  });

  it('should handle large durations', () => {
    expect(formatDuration(86399)).toBe('23:59:59');
    expect(formatDuration(36000)).toBe('10:00:00');
  });
});

describe('formatViews', () => {
  it('should format views less than 1000 as is', () => {
    expect(formatViews(0)).toBe('0');
    expect(formatViews(42)).toBe('42');
  });

  it('should format thousands with K', () => {
    expect(formatViews(1500)).toBe('1.5K');
  });

  it('should format millions with M', () => {
    expect(formatViews(2500000)).toBe('2.5M');
  });
});

describe('formatDate', () => {
  it('should format date string in US locale', () => {
    const result = formatDate('2024-01-15T12:00:00Z');
    expect(result).toMatch(/January 15, 2024/);
  });
});

describe('formatRelativeDate', () => {
  it('should return "Today" for current date', () => {
    const today = new Date().toISOString();
    expect(formatRelativeDate(today)).toBe('Today');
  });

  it('should return "Yesterday" for previous day', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(yesterday)).toBe('Yesterday');
  });

  it('should return days ago for recent dates', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(threeDaysAgo)).toBe('3 days ago');
  });

  it('should return months ago for dates within a year', () => {
    const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(twoMonthsAgo)).toMatch(/month/);
  });
});
