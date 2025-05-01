/** @format */
require("../../lib/google-service");

const router = require("express").Router();
const passport = require("passport");
const config = require("../../config/index");

const {
  failed,
  success
} = require("../../controller/googleServiceController/googleController");
const { isLoggedIn } = require("../../middleware/googleMiddleware");

router.route("/failed").get(failed);
router.route("/success").get(success, isLoggedIn);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/v1/googleOauth/failed"
  }),
  async (req, res) => {
    const { id, email, name, displayName, picture } = req.user;

    const { code, data, type, message } = await success({
      id,
      email,
      name,
      displayName,
      picture
    });

    if (!code) {
      return res.redirect(
        `http://${
          config.protocol.frontend_origin
        }/signin?message=${encodeURIComponent("Invalid request")}`
      );
    }

    if (code === 404) {
      return res.redirect(
        `http://${
          config.protocol.frontend_origin
        }/signin?message=${encodeURIComponent(message)}`
      );
    }

    if (code === 200) {
      const { id, token, email } = data;

      return res.redirect(
        `http://${
          config.protocol.frontend_origin
        }/redirect?type=${type}&token=${encodeURIComponent(
          token.access
        )}&expiresIn=${encodeURIComponent(
          token.expiresIn
        )}&email=${encodeURIComponent(email)}&id=${id}`
      );
    }
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

module.exports = router;
