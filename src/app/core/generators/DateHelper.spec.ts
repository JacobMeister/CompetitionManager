import { DateHelper } from './DateHelper';

describe('DateHelper', () => {
  let dateHelper: DateHelper;
  beforeEach(() => {
    dateHelper = new DateHelper();
  });

  it('create an instance', () => {
    expect(dateHelper).toBeTruthy();
  });

  it('should validate date is in the future with success', () => {
    const date = new Date();
    const days = 10;
    date.setDate(date.getDate() + days);
    expect(dateHelper.validateDateIsInTheFuture(date)).toEqual(true);
  });

  it('should format date', () => {
    const date = new Date(2018, 6, 16, 0, 0, 0, 0);
    expect(dateHelper.formatDate(date)).toEqual('2018-07-16');
  });

  it('should validate date is in the future with failure', () => {
    const date = new Date(2018, 3, 16, 0, 0, 0, 0);
    expect(dateHelper.validateDateIsInTheFuture(date)).toEqual(false);
  });
});
