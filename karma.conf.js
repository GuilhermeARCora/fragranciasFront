module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: { clearContext: false },         // keep Jasmine output visible
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],            // or 'Chrome'
    singleRun: false,
    restartOnFileChange: true,
  });
};
