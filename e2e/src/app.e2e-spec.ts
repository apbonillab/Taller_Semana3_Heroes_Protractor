// import { AppPage } from './app.po';
// import { browser, logging } from 'protractor';

// describe('workspace-project App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getTitleText()).toEqual('heros app is running!');
//   });

//   afterEach(async () => {
//     // Assert that there are no errors emitted from the browser
//     const logs = await browser.manage().logs().get(logging.Type.BROWSER);
//     expect(logs).not.toContain(jasmine.objectContaining({
//       level: logging.Level.SEVERE,
//     } as logging.Entry));
//   });
// });

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

import { TourOfHeroesPage } from './app.po';

describe('Tour of heroes Dashboard', () => {
  let page: TourOfHeroesPage;

  beforeEach(() => {
    page = new TourOfHeroesPage();
  });

  it('should display top 4 heroes', () => {
    page.navigateTo();
    expect(page.getTop4Heroes()).toEqual(['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas']);
  });

  it('should navigate to heroes', () => {
    page.navigateToHeroes();
    expect(page.getAllHeroes().count()).toBe(11);
  });
});

function getPageElts() {
  let navElts = element.all(by.css('app-root nav a'));

  return {
    navElts: navElts,

    appDashboardHref: navElts.get(0),
    appDashboard: element(by.css('app-root app-dashboard')),
    topHeroes: element.all(by.css('app-root app-dashboard > div h4')),

    appHeroesHref: navElts.get(1),
    appHeroes: element(by.css('app-root app-heroes')),
    allHeroes: element.all(by.css('app-root app-heroes li')),
    selectedHeroSubview: element(by.css('app-root app-heroes > div:last-child')),

    heroDetail: element(by.css('app-root app-hero-detail > div')),

    searchBox: element(by.css('#search-box')),
    searchResults: element.all(by.css('.search-result li'))
  };
}

describe('Tour of heroes, heroes page', () => {
  let page: TourOfHeroesPage;

  
  
  beforeEach(() => {
    page = new TourOfHeroesPage();
    page.navigateToHeroes();
  });

  it('should add a new hero', () => {
    const currentHeroes = page.getAllHeroes().count();
    page.enterNewHeroInInput('My new Hero');
    expect(page.getAllHeroes().count()).toBe(currentHeroes.then(n => n + 1));
  });


});

describe('Tour of heroes, Taller individual', () => {
  let page: TourOfHeroesPage;

  
  
  beforeEach(() => {
    page = new TourOfHeroesPage();
    page.navigateToHeroes();
  });

  it('1. deberia buscar un heroe', () => {
    const findHeroes = page.searchHeroes();
    expect(findHeroes).toBe(1);
  });

  it('2. deberia eliminar un heroe',() => {
     const currentHeroes   = page.getAllHeroes().count();
     page.deleteHeroes();
     expect(currentHeroes.then(n => n-1)).toBe(page.getAllHeroes().count());
  })

  
  it('3. deberia editar un heroe', () => {    
    page.heroesEdit('edit Heroes');
    const currentHeroes = page.getAllHeroes();
    let name = currentHeroes.get(0).element(by.tagName('a'));
    expect(name.getText()).toContain('edit Heroes');
  });

  it('4. deberia navegar un heroe', () => {    
    page.navigateHeroesDash();
    expect(element(by.tagName('app-hero-detail')).isPresent())
  });

  it('5. deberia navegar un heroe desde la lista', () => {    
    page.navigateHeroesDashList();
    expect(element(by.tagName('app-hero-detail')).isPresent())
  });

  it('6. deberia navegar un heroe desde la busqueda', () => {  
    page.navigateHeroeBySearch();
    expect(element(by.tagName('app-hero-detail')).isPresent());
  });

});
