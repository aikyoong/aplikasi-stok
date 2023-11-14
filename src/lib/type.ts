export type StepZeroData = {
  default_code: string;
  total_price: number;
};

export type StepOneData = {
  company_name: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  postal_code: string;
};

export type StepTwoData = {
  name: string;
  address: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type StepThreeData = {
  data_center: string;
  domain: string;
};

// export type FormData = StepOneData & StepTwoData & StepThreeData;

export type FormStore = {
  stepOne: {
    data: StepOneData;
    setData: (data: StepOneData) => void;
  };
  stepTwo: {
    data: StepTwoData;
    setData: (data: StepTwoData) => void;
  };
  stepThree: {
    data: StepThreeData;
    setData: (data: StepThreeData) => void;
  };
};
