import { hash, compare } from "bcryptjs";
import generateToken from "../lib/jwt.js";
import prisma from "../lib/prisma.js";
import { getRedisClient } from "../lib/redis.js";
import { getVerifyOtpEmailHtml } from "../lib/html.js";
import { sendMail } from "../lib/sendMail.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existingUser = await prisma.user.findFirst({ where: { email: email } });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await hash(password, 10);
  const emailKey = `email-otp:${email}`;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const dataToStore = JSON.stringify({
    name,
    email,
    password: hashedPassword,
    otp,
  });
  const redis = getRedisClient();
  await redis.set(emailKey, dataToStore, { EX: 300 });
  // const user = await prisma.user.create({
  //   data: {
  //     name,
  //     email,
  //     password: hashedPassword,
  //   },
  // });

  const html = getVerifyOtpEmailHtml({ name, otp });
  await sendMail({
    to: email,
    subject: "Confirm Your Email with This OTP",
    html,
  });
  // console.log(user);
  // const token = generateToken(user.id);
  res.status(200).json({ message: "OTP SENT TO YOUR EMAIL" });
}

export const verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "otp is required" });
  }

  const redis = getRedisClient();
  const key = `email-otp:${email}`;

  const cachedUser = await redis.get(key);
  if (!cachedUser) {
    return res.status(400).json({ message: "OTP expired" });
  }

  // 🔹 Parse Redis data
  const userData = JSON.parse(cachedUser);
  if (userData.otp !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  // 🔹 Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { email: userData.email },
  });

  if (existingUser) {
    // Token should not be usable again
    await redis.del(key);

    return res.status(409).json({
      message: "User already verified",
    });
  }

  // 🔹 Create user
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
  });

  // 🔹 Delete token AFTER successful DB save
  await redis.del(key);

  // 🔹 Remove sensitive fields
  const { password, ...safeUser } = user;
  const token = generateToken(user.id);

  res.status(201).json({
    message: "Verification successful",
    user: safeUser,
    token
  });
};

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
