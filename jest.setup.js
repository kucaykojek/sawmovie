window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    }
  }

global.console = { log: jest.fn(), error: jest.fn() }

jest.mock('next/font/google', () => ({
  Rubik: () => ({
    style: {
      fontFamily: 'mocked'
    }
  }),
  Source_Code_Pro: () => ({
    style: {
      fontFamily: 'mocked'
    }
  })
}))
