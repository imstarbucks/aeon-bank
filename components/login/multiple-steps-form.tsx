"use client";

import { useMultipleStep } from "@/hooks/useMultipleStep";
import { Button } from "../ui/button";
import UsernameForm from "./username-form";
import PasswordForm from "./password-form";
import { useState } from "react";

const MultipleStepsForm = () => {
  const { currentStep, next, prev } = useMultipleStep();
  const [secureWord, setSecureWord] = useState<string | null>(null);
  // const secureWord = useUserStore((state) => state.user.secureWord);
  // const setSecureWord = useUserStore((state) => state.setSecureWord);

  switch (currentStep) {
    case 0:
      return <UsernameForm setSecureWord={setSecureWord} />;
    case 1:
      return (
        <>
          <div className="flex flex-col gap-4">
            <h3>Your secure word is:</h3>
            <p className="w-fit rounded-md border border-gray-400 bg-gray-50 p-4 text-lg font-bold italic">
              {secureWord}
            </p>
            <div className="mt-6 flex items-center gap-x-4">
              <Button onClick={prev}>Back</Button>
              <Button onClick={next}>Next</Button>
            </div>
          </div>
        </>
      );
    case 2:
      return <PasswordForm />;
    default:
      return <></>;
  }
};

export { MultipleStepsForm };
