import {browser, by, element, ElementFinder} from 'protractor';
import { all } from 'q';

export class TourOfHeroesPage {
  navigateTo() {
    return browser.get('/');
  }

  getTop4Heroes() {
    console.log(element.all(by.css('.module.hero')).all(by.tagName('h4')).getText());
    return element.all(by.css('.module.hero')).all(by.tagName('h4')).getText();
  }

  navigateToHeroes() {
    element(by.linkText('Heroes')).click();
  }

  getAllHeroes() {
    return element(by.tagName('my-heroes')).all(by.tagName('li'));
  }

  searchHeroes(){
    browser.get('');
    let input= element(by.css('#search-box'));
    input.sendKeys('Narco');
    browser.sleep(1000);
    let result =  element.all(by.css('.search-result li')).count();
    return result;
  }

    deleteHeroes(){
    let allHeroes = element(by.tagName('my-heroes')).all(by.tagName('li'));
   allHeroes.get(0).all(by.buttonText('x')).click();
  }

  enterNewHeroInInput(newHero: string) {
    element(by.tagName('input')).sendKeys(newHero);
    element(by.buttonText('Add')).click();
  }
}
