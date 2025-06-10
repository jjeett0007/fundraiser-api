function blockUserAgents(req, res, next) {
  try {
    const blockedAgents = ["Postman"]; // add more user-agents as needed
    const userAgent = req.headers["user-agent"] || "";
    console.log("browser user agent", userAgent);

    for (const agent of blockedAgents) {
      if (userAgent.includes(agent)) {
        return res.status(403).send("Access denied: User-Agent blocked");
      }
    }
    next();
  } catch (error) {
    console.error("Error in blockUserAgents middleware:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = blockUserAgents;
