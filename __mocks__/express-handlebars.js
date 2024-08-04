const hbs = jest.createMockFromModule('express-handlebars');

hbs.create = jest.fn(() => ({
  engine: jest.fn((path, options, callback) => {
    callback(null, '<div>Mocked Template</div>');
  })
}));

module.exports = hbs;

