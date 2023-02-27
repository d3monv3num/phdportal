import { sign, verify } from "jsonwebtoken";

const JWT_SECRET_KEY = "B4j4OqS5vmZok6YmwBnaZCSEkX0HrpEawSIJkUwl1fcnzpDskQoG47FPEU14nsy";

const createRefreshToken = (id) =>
  sign({ id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
const createAccessToken = (id) =>
  sign({ id }, JWT_SECRET_KEY, {
    expiresIn: "2h",
  });

const verifyAccessToken = (token) => verify(token, JWT_SECRET_KEY);

const sendRefreshTokenCookie = (res, token) => {
  res.cookie("_crid", token, {
    httpOnly: true, // TODO: path and domain options
  });
};

const sendAccessTokenCookie = (res, token) => {
  res.cookie("_access", token, {
    httpOnly: true, // TODO: path and domain options
  });
};
export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  sendRefreshTokenCookie,
  sendAccessTokenCookie,
};
