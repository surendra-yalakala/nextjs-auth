"use client";

import React, { useState } from "react";
import { initialSigInpFormData, signinFormControls } from "../utils";
import CommonFormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { signInUserAction } from "@/actions";

function SignIn() {
  const [signinFormData, setSignInFormData] = useState(initialSigInpFormData);
  const router = useRouter();

  function handleSignUpButtonDisabled() {
    return Object.keys(signinFormData).every(
      (key) => signinFormData[key].trim() !== ""
    );
  }

  async function handleSignIn() {
    const result = await signInUserAction(signinFormData);
    console.log("SignIn result :: ", result);
    if (result.success) {
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Sing In</h1>
      <form action={handleSignIn}>
        {signinFormControls.map((item) => (
          <div key={item.name}>
            <Label>{item.label}</Label>
            <CommonFormElement
              currentItem={item}
              value={signinFormData[item?.name]}
              onChange={(e) =>
                setSignInFormData({
                  ...signinFormData,
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
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
