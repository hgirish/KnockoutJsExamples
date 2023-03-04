const Wizard = function (steps) {
  let numberOfSteps;

  const currentStep = ko.observable();

  const init = function () {
    numberOfSteps = steps;
    currentStep(1);
  };

  const back = function () {
    currentStep(currentStep() - 1);
  };
  const next = function () {
    currentStep(currentStep() + 1);
  };

  const done = function () {
    console.log('User clicked done...');
    currentStep(1);
  };

  const isLastStep = ko.pureComputed(function () {
    return currentStep() == numberOfSteps;
  });

  const isFirstStep = ko.pureComputed(function () {
    return currentStep() == 1;
  });

  init();

  return {
    currentStep: currentStep,
    back: back,
    next: next,
    done: done,
    isFirstStep: isFirstStep,
    isLastStep: isLastStep,
  };
};