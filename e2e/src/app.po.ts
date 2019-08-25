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
  
  heroesEdit(nameEdit: string){
    let allHeroes = element(by.tagName('my-heroes')).all(by.tagName('li'));
    allHeroes.get(0).click();
    element(by.tagName('input')).clear();
    element(by.tagName('input')).sendKeys( nameEdit);
    element(by.buttonText('save')).click();
    browser.sleep(1000);
  }

  navigateHeroesDash(){
    browser.get('');
    let allHeroes = element(by.css('app-root app-dashboard')).all(by.tagName('a'));
   allHeroes.get(0).click();
   browser.sleep(1000);
  }
  

  enterNewHeroInInput(newHero: string) {
    element(by.tagName('input')).sendKeys(newHero);
    element(by.buttonText('Add')).click();
  }
}
