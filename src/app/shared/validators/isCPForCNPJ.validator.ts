import { AbstractControl, ValidationErrors } from '@angular/forms';

const validationError = { notCPForCNPJ : true };
const cpfSize = 11;
const cnpjSize = 14;

export function cpfCnpjValidator(control: AbstractControl): ValidationErrors | null {
  const userInput = control.value;
  const numericInput = userInput.replace(/\D/g, '');

  const inputArrOfNums =  numericInput.split('').map((carac:string) => Number(carac));

  const inputLength = inputArrOfNums.length;

  if(inputLength !== cpfSize && inputLength !== cnpjSize) return validationError;

  if(allNumbersAreEqual(inputArrOfNums)) return validationError;

  const whichCase = inputLength === cpfSize ? 'CPF' : 'CNPJ';

  switch (whichCase) {
    case 'CPF':
      const validCPF = isCPF(inputArrOfNums);
      return validCPF ? null : validationError;
    case 'CNPJ':
      const validCNPJ = isCNPJ(inputArrOfNums);
      return validCNPJ ? null : validationError;
  };

};

function allNumbersAreEqual(arr: number[]):boolean {
  const arrSet = new Set(arr);

  if(arrSet.size === 1) return true;

  return false;
};

function isCPF(arr: number[]):boolean {

  const firts9digits = arr.slice(0, 9);
  const firstSum = firts9digits.reduce((acc:number, num:number, i) => {
    let count = 10 - i;
    acc += (num*count);

    return acc;
  },0);
  const remainderFirst = firstSum % 11;
  const firstVerifyingDigit = remainderFirst < 2 ? 0 : 11 - remainderFirst;

  const firts9digitsAndFirstVerDigit = [...firts9digits, firstVerifyingDigit];
  const secondSum = firts9digitsAndFirstVerDigit.reduce((acc:number, num:number, i) => {
    let count = 11 - i;
    acc += (num*count);

    return acc;
  },0);
  const remainderSecond = secondSum % 11;
  const secondVerifyingDigit = remainderSecond < 2 ? 0 : 11 - remainderSecond;

  const isFirstDigitValid = arr[9] === firstVerifyingDigit;
  const isSecondDigitValid = arr[10] === secondVerifyingDigit;

  if(isFirstDigitValid && isSecondDigitValid) return true;

  return false;
};

function isCNPJ(arr: number[]):boolean {
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firts12digits = arr.slice(0, 12);
  const firstSum = firts12digits.reduce((acc:number, num:number, i) => {
    let weight = firstWeights[i];
    acc += (num*weight);

    return acc;
  },0);
  const remainderFirst = firstSum % 11;
  const firstVerifyingDigit = remainderFirst < 2 ? 0 : 11 - remainderFirst;

  const firts12digitsAndFirstVerDigit = [...firts12digits, firstVerifyingDigit];
  const secondSum = firts12digitsAndFirstVerDigit.reduce((acc:number, num:number, i) => {
    let weight = secondWeights[i];
    acc += (num*weight);

    return acc;
  },0);
  const remainderSecond = secondSum % 11;
  const secondVerifyingDigit = remainderSecond < 2 ? 0 : 11 - remainderSecond;

  const isFirstDigitValid = arr[12] === firstVerifyingDigit;
  const isSecondDigitValid = arr[13] === secondVerifyingDigit;

  if(isFirstDigitValid && isSecondDigitValid) return true;

  return false;
};
