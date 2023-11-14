import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {
  StepZeroData,
  StepOneData,
  StepTwoData,
  StepThreeData,
} from "../lib/type";

// const stepVariant = {
//   1: "stepOne",
//   2: "stepTwo",
//   3: "stepThree",
// };

type setDataType =
  | { step: 0; data: StepZeroData }
  | { step: 1; data: StepOneData }
  | { step: 2; data: StepTwoData }
  | { step: 3; data: StepThreeData };

type FormStore = {
  stepZero: StepZeroData | null;
  stepOne: StepOneData | null;
  stepTwo: StepTwoData | null;
  stepThree: StepThreeData | null;
  setData: ({ step, data }: setDataType) => void;
};

const useFormStore = create<FormStore>(
  (set: (arg0: (state: any) => any) => void) => ({
    stepZero: null,
    stepOne: null,
    stepTwo: null,
    stepThree: null,
    setData: ({ step, data }) => {
      set(
        (state: {
          stepZero: any;
          stepOne: any;
          stepTwo: any;
          stepThree: any;
        }) => {
          if (step === 0) {
            return {
              stepZero: { ...state.stepZero, ...data },
              stepOne: state.stepZero,
              stepTwo: state.stepTwo,
              stepThree: state.stepThree,
            };
          } else if (step === 1) {
            return {
              stepZero: state.stepZero,
              stepOne: { ...state.stepOne, ...data },
              stepTwo: state.stepTwo,
              stepThree: state.stepThree,
            };
          } else if (step === 2) {
            return {
              stepZero: state.stepZero,
              stepOne: state.stepOne,
              stepTwo: { ...state.stepTwo, ...data },
              stepThree: state.stepThree,
            };
          } else if (step === 3) {
            return {
              stepZero: state.stepZero,
              stepOne: state.stepOne,
              stepTwo: state.stepTwo,
              stepThree: { ...state.stepThree, ...data },
            };
          }
          return state;
        }
      );
    },
  })
);

export default useFormStore;
