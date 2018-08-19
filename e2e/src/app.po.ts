import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToPage(page: string) {
    return browser.get(page);
  }

  clearStorage() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  }

  getElementById(id: string) {
    return element(by.id(id));
  }

  getAllTags(tag: string) {
    return element.all(by.tagName(tag));
  }

  getAmountOfCompetitionsWithName(competitionName: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.getAllTags('td')
          .filter(function(elem) {
            return elem.getText().then(function(val) {
              if (val === competitionName) {
                return true;
              }
            });
          })
          .then(filteredCompetitions => {
            resolve(filteredCompetitions.length);
          });
      }, 10000);
    });
  }

  clickDetailsButtonOfCompetition(competitionName: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        let counter = 0;
        let isFound = false;
        this.getAllTags('td')
          .filter(function(elem) {
            return elem.getText().then(function(val) {
              if (val === competitionName) {
                isFound = true;
              } else if (isFound) {
                counter++;
                if (counter === 2) {
                  elem.click();
                  resolve(elem);
                  isFound = false;
                  counter = 0;
                  return true;
                }
              }
            });
          })
          .then(res => {
            resolve();
          });
      }, 10000);
    });
  }
}
