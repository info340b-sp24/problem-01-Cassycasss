
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { fireEvent, getByText, waitFor } = require('@testing-library/dom');
const { getAllByText } = require('@testing-library/dom'); // Change import to getAllByText

const html = fs.readFileSync(path.resolve(__dirname, 'public/index.html'), 'utf8');
const { window } = new JSDOM(html);
const { document } = window;

describe('Website Tests', () => {
  let container; // Declare a variable to hold the container element

  beforeEach(() => {
    // Create a container element and append it to the document body
    container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = html; // Set innerHTML to the loaded HTML
  });

  afterEach(() => {
    // Clean up the container after each test
    document.body.removeChild(container);
    container = null;
  });

  test('Page title is correct', () => {
    expect(document.title).toBe('Joker - Character Page');
  });

  test('Character description is present', () => {
    const characterDescription = document.querySelector('#character p');
    expect(characterDescription.textContent).toContain('Joker, also known as Arthur Fleck');
  });

});



const indexHtml = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf8');
const jokerDetailsHtml = fs.readFileSync(path.resolve(__dirname, './public/joker_details.html'), 'utf8');

describe('index.html', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(indexHtml, { runScripts: 'dangerously' });
  });

  it('should display Joker character information', () => {
    const document = dom.window.document;
    expect(document.querySelector('title').textContent).toBe('Joker - Character Page');
    expect(getAllByText(document, 'Joker - Character Page')).toHaveLength(2); // Change to getAllByText
    // Rest of your assertions...
  });
});

describe('joker_details.html', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(jokerDetailsHtml, { runScripts: 'dangerously' });
  });

  it('should display detailed Joker character information', () => {
    const document = dom.window.document;
    expect(document.querySelector('title').textContent).toBe('Joker - Character Page');
    // Rest of your assertions...
  });
});

