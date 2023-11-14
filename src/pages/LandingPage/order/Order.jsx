import { useState, lazy, startTransition } from "react";
import Layout from "@/components/Layout";
import Cart from "@/components/order/Cart";
const UserProfile = lazy(() => import("@/components/order/UserProfile"));
const CompanyProfile = lazy(() => import("@/components/order/CompanyProfile"));
const DataCenterURL = lazy(() => import("@/components/order/DataCenterURL"));
const Checkout = lazy(() => import("@/components/order/Checkout"));

function Order() {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = () =>
    startTransition(() => {
      setCurrentStep(currentStep + 1);
    });

  const handlePrevStep = () => setCurrentStep(currentStep - 1);

  // const handlePrevStep = () => setCurrentStep(currentStep - 1);

  return (
    <Layout>
      {currentStep === 0 && <Cart onNext={handleNextStep} />}
      {currentStep === 1 && (
        <CompanyProfile onNext={handleNextStep} onPrev={handlePrevStep} />
      )}
      {currentStep === 2 && (
        <UserProfile onNext={handleNextStep} onPrev={handlePrevStep} />
      )}
      {currentStep === 3 && (
        <DataCenterURL onNext={handleNextStep} onPrev={handlePrevStep} />
      )}
      {currentStep === 4 && <Checkout onPrev={handlePrevStep} />}
    </Layout>
  );
}

export default Order;
