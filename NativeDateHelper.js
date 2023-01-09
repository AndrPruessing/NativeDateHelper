export class NativeDate {
  /**
   * NativeDate create an generatedDate which is a native Javascript Date-Object
   *
   * @param {string|object=} dateStringOrObject - isoDateString or year of the Date as an integer or Date-Object
   */
  constructor(dateStringOrObject) {
    //Check if dateString is of type number, then create a date with year(dateString), month, day
    this.isHealed = false;
    if (this.isDate(dateStringOrObject)) {
      this.generatedDate = dateStringOrObject;
      this.dateString = this.isoString;
    } else if (this.isIso(dateStringOrObject)) {
      const isoDateString = this.addLeadingZeros(dateStringOrObject);
      this.dateString = isoDateString;
      this.generatedDate = new Date(isoDateString);
    } else {
      //Date Healing for invalid Input
      this.dateString = "";
      this.generatedDate = new Date();
      this.isHealed = true;
    }
    if (
      this.generatedDate &&
      this.generatedDate.toString() === "Invalid Date"
    ) {
      console.warn("DATE is not valid Date");
    }
  }

  /*************************GETTER & SETTER**********************************/

  /**
   * return generatedDate as a date-Object
   *
   * @returns {object}
   */
  get date() {
    return this.generatedDate;
  }

  /**
   * returns the year of the generatedDate as an integer
   *
   * @returns {number}
   */
  get year() {
    return this.generatedDate.getFullYear();
  }

  /**
   * returns the month of the generatedDate as an integer
   *
   * @returns {number}
   */
  get month() {
    return this.generatedDate.getMonth() + 1;
  }

  /**
   * returns the day of the generatedDate as an integer
   *
   * @returns {number}
   */
  get day() {
    return this.generatedDate.getDate();
  }

  /**
   * returns the time of the generatedDate as an integer
   *
   * @returns {number}
   */
  get time() {
    return this.generatedDate.getTime();
  }

  /**
   * returns string of format year-month-day
   *
   * @returns {string}
   */
  get isoString() {
    const year = this.year;
    const month = this.month;
    const day = this.day;
    return this.toIso(year, month, day);
  }

  /**
   * returns the timeZoneOffset
   *
   * @returns {number}
   */
  get timezoneOffset() {
    return this.generatedDate.getTimezoneOffset();
  }

  /*********************************VALIDATION*******************************/

  /**
   * Compare created Date with a string
   *
   * @returns {boolean}
   */
  isValidDateString = () => {
    const year = this.year;
    let month = this.month;
    let day = this.day;

    const isoDate = this.toIso(year, month, day);

    return isoDate === this.dateString;
  };

  /**
   * Check if a date is valid
   *
   * @returns {boolean}
   */
  isValidDate = () => {
    //generated Date is a Date Object generated by the Constructor
    // if generated Date doesn't exists its invalid
    // if it is an invalid date it's invalid too
    if (
      !this.generatedDate ||
      (this.generatedDate &&
        typeof this.generatedDate !== "object" &&
        this.generatedDate.toString() === "Invalid Date")
    ) {
      return false;
    }

    const year = this.year;
    const month = this.month;
    const day = this.day;
    // if the month is 1=<>=12 and the day > 0 and < the max days in month its valid
    return (
      month >= 1 &&
      month <= 12 &&
      day > 0 &&
      day <= this.daysInMonth(month, year)
    );
  };

  /**************************HELPER******************************************/

  /**
   * Convert the given values to a iso date  string
   * @param year
   * @param month
   * @param day
   * @returns {string}
   */
  toIso = (year, month, day) => {
    // always add leading zeros, otherwise the format breaks for day / month < 10
    return this.addLeadingZeros(`${year}-${month}-${day}`);
  };

  /**
   * Check if Year is a leapyear
   * @param {number} year
   * @returns {boolean}
   */
  isLeapYear = year => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  /**
   * Get the number of days in any particular month of a specific Month in a specific Year
   *
   * @param {number} m - Month of the Year
   * @param {number} y - Year of the Month
   * @returns {number}
   */
  daysInMonth = (m, y) => {
    switch (m) {
      case 2:
        return this.isLeapYear(y) ? 29 : 28;
      case 9:
      case 4:
      case 6:
      case 11:
        return 30;
      default:
        return 31;
    }
  };

  /**
   * This function adds a leading 0 to day and month if required to ensure a valid date-string
   *
   * @param {string} dateString - Format YYYY-MM-DD
   * @returns {string}
   */
  addLeadingZeros = dateString => {
    if (dateString.length === 10) {
      return dateString;
    }

    return dateString
      .split("-")
      .map(item => (item.length === 1 ? `0${item}` : item))
      .join("-");
  };

  /**
   * check if dateString is date-Object
   *
   * @param {* | date } dateString
   * @returns {boolean}
   */
  isDate = potentialDate => {
    if (typeof potentialDate !== "object") return false;

    return typeof potentialDate.getFullYear() === "number";
  };

  /**
   * check if dateString is an iso-date-string
   *
   * @param dateString
   * @returns {boolean}
   *
   * @example
   * isIso("2018-12-10") === true
   * isIso("10.12.2018") === false
   * isIso("yolo") === false
   */
  isIso = dateString => {
    if (typeof dateString !== "string" || dateString === "") return false;

    const regex = "^([12]\\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\\d|3[01]))$";

    return new RegExp(regex).test(dateString);
  };

  /*********************************COMPARE DATES*******************************/

  /**
   * Check if a dates is equal to generatedDate
   *
   * @param {NativeDate} secondDate - Date-Object
   * @returns {boolean}
   */
  isEqual = secondDate => {
    const year = this.year;
    const month = this.month;
    const day = this.day;

    const secondYear = secondDate.year;
    const secondMonth = secondDate.month;
    const secondDay = secondDate.day;

    return year === secondYear && month === secondMonth && day === secondDay;
  };

  /**
   * Check if a generatedDate is before secondDate by ignoring time
   *
   * @param {NativeDate} secondDate - Date-Object
   * @returns {boolean}
   */
  isBefore = secondDate => {
    const year = this.year;
    const month = this.month;
    const day = this.day;
    const secondYear = secondDate.year;
    const secondMonth = secondDate.month;
    const secondDay = secondDate.day;

    if (year > secondYear) return true;
    if (year === secondYear && month > secondMonth) return true;

    return year === secondYear && month === secondMonth && day > secondDay;
  };

  /**
   * Check if a generatedDate is after secondDate by ignoring time
   *
   * @param {NativeDate} secondDate - Date-Object
   * @returns {boolean}
   */
  isAfter = secondDate => {
    const year = this.year;
    const month = this.month;
    const day = this.day;
    const secondYear = secondDate.year;
    const secondMonth = secondDate.month;
    const secondDay = secondDate.day;

    if (year < secondYear) return true;
    if (year === secondYear && month < secondMonth) return true;

    return year === secondYear && month === secondMonth && day < secondDay;
  };

  /*********************************MANIPULATE**********************************/

  /**
   * Helper to Update the FactoryProduct
   *
   * @return {Date} generatedDate
   */
  updateGeneratedDate = () => {
    const newDateString = `${this.year}-${this.month}-${this.day}`;
    const isoDateString = this.addLeadingZeros(newDateString);

    this.dateString = isoDateString;

    this.generatedDate = new Date(isoDateString);

    return this.generatedDate;
  };

  /**
   * add number of Years to current FactoryProduct
   *
   * @param {number} number
   * @returns {Date}
   */
  addYear = number => {
    this.generatedDate.setFullYear(this.year + number);
    return this.updateGeneratedDate();
  };

  /**
   * add number of Months to current FactoryProduct
   *
   * @param {number} number
   * @returns {Date}
   */
  addMonth = number => {
    this.generatedDate.setMonth(this.month + number);
    return this.updateGeneratedDate();
  };

  /**
   * add number of Days to current FactoryProduct
   *
   * @param {number} number
   * @returns {Date}
   */
  addDay = number => {
    this.generatedDate.setDate(this.day + number);
    return this.updateGeneratedDate();
  };

  /**
   * subtract number of Years from current FactoryProduct
   *
   * @param {number} number
   * @returns {Date}
   */
  subtractYear = number => {
    this.generatedDate.setFullYear(this.year - number);
    return this.updateGeneratedDate();
  };

  /**
   * subtract number of Months from current FactoryProduct
   *
   * @param {number} number
   * @returns {Date}
   */
  subtractMonth = number => {
    this.generatedDate.setMonth(this.month - number);
    return this.updateGeneratedDate();
  };

  /**
   * subtract number of Days from current FactoryProduct
   *
   * @param {number} number
   * @returns {Date}
   */
  subtractDay = number => {
    this.generatedDate.setDate(this.day - number);
    return this.updateGeneratedDate();
  };
}

/**
 * Method do create a NativeDateObject wich is an improvement of native Date
 *
 * @param {string|Date=} dateString - isoDateString or year of the Date as an integer or Date-Object
 * @returns {NativeDate}
 */
export const nativeDateHelper = dateString => {
  return new NativeDate(dateString);
};