export class DateHelper {
    getCurrentDate() {
      return this.formatDate(new Date());
    }
  
    formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
    }
  
    combineDateAndTime(startDate, startTimeDay): Date {
      const combinedDateTime = new Date(startDate + ' ' + startTimeDay);
      return combinedDateTime;
    }
  
    validateDateIsInTheFuture(startDate: Date) {
      // Validate start date
      const currentDate = new Date(this.getCurrentDate());
  
      if (startDate.getTime() < currentDate.getTime()) {
        // Start date in the past
        return false;
      }
  
      return true;
    }
  }
  