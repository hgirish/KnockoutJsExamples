// eslint-disable-next-line no-unused-vars
const Wizard = function (steps, message) {
  let numberOfSteps;
  let doneCallBack;

  const currentStep = ko.observable();

  const doneMessage = ko.observable();

  const showDoneMessage = ko.observable(false);

  const init = function () {
    numberOfSteps = steps;
    currentStep(1);
  };

  const back = function () {
    currentStep(currentStep() - 1);
  };
  const next = function () {
    currentStep(currentStep() + 1);
    showDoneMessage(false);
  };

  const done = function () {
    console.log('User clicked done...');
    currentStep(1);
    showDoneMessage(true);
    doneCallBack();
  };

  const isLastStep = ko.pureComputed(function () {
    return currentStep() == numberOfSteps;
  });

  const isFirstStep = ko.pureComputed(function () {
    return currentStep() == 1;
  });

  const setCallBack = function(callBack){
    doneCallBack = callBack;
  };

  init();

  return {
    currentStep: currentStep,
    back: back,
    next: next,
    done: done,
    isFirstStep: isFirstStep,
    isLastStep: isLastStep,
    setCallBack: setCallBack,
    doneMessage: doneMessage,
  };
};