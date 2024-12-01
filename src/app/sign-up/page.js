"use client";

import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { initialSignUpFormData, signUpFormControls } from "../utils";
import CommonFormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/actions";
import { useRouter } from "next/navigation";

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const router = useRouter();

  function handleSignUpButtonDisabled() {
    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  }

  async function handleSignUp() {
    const result = await registerUserAction(signUpFormData);
    console.log("Signup result :: ", result);
    if (result.success) {
      router.push("/sign-in");
    }
  }

  return (
    <div>
      <h1>Singup</h1>
      <form action={handleSignUp}>
        {signUpFormControls.map((item) => (
          <div key={item.name}>
            <Label>{item.label}</Label>
            <CommonFormElement
              currentItem={item}
              value={signUpFormData[item?.name]}
              onChange={(e) =>
                setSignUpFormData({
                  ...signUpFormData,
                  [item.name]: e.target.value,
                })
              }
            />
          </div>
        ))}
        <Button
          className="disabled:opacity-70"
          disabled={!handleSignUpButtonDisabled}
          type="submit"
        >
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
