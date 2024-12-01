"use server";

import connectToDb from "@/database";
import User from "@/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function registerUserAction(formData) {
  await connectToDb();

  try {
    const { userName, email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "Email already exist. Try another email",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const createuser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await createuser.save();
    if (savedUser) {
      return {
        success: true,
        message: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Singup failed",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function signInUserAction(formData) {
  await connectToDb();
  try {
    const { email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "User doesn't exist please do sign up",
      };
    }

    const checkPwd = await bcryptjs.compare(password, checkUser.password);
    if (!checkPwd) {
      return {
        success: false,
        message: "Password doesn't match",
      };
    }

    // creating jwt token
    const createTokenData = {
      id: checkUser?._id,
      userName: checkUser?.userName,
      email: checkUser?.email,
    };

    const token = jwt.sign(createTokenData, "DEFAULT_KEY", { expiresIn: "1d" });

    const getCookies = await cookies();
    getCookies.set("token", token);

    return {
      success: true,
      message: "Sign In Success",
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function fetchUserAction() {
  await connectToDb();
  try {
    const getCookies = await cookies();
    const token = getCookies.get("token")?.value || "";
    if (!token) {
      return {
        success: false,
        message: "token invalid",
      };
    }
    const decodeToken = jwt.verify(token, "DEFAULT_KEY");

    const getUserInfo = await User.findOne({ _id: decodeToken.id });
    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        message: "Some issue occured",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function logoutAction() {
  const getCookies = await cookies();
  getCookies.set("token", "");
}
