import express from "express";
import bodyParser from "body-parser";
import PageModel from "../models/page.model";
import checkAuth from "../middlewares/checkAuth";
import TrackerLogModel from "../models/trackerLog";

export default function TrackerRouter() {
  const jsonParser = bodyParser.json();

  const route = () => {
    const router = express.Router();

    router.post("/event", jsonParser, async (req, res) => {
      const { createdAt, browserId, type, device, endPointId, language, ...rest } = req.body;

      if (!browserId || !type || !endPointId)
        return res.send({ status: false, message: "browserId, type, endPointId required." });

      try {
        const page = await PageModel.findById(endPointId);

        if (!page) return res.send({ status: false, message: "Page not found." });

        const trackerLog = new TrackerLogModel({ browserId, endPointId, type, device, language, createdAt, ...rest });

        await trackerLog.save();
      } catch (error) {
        return res.send({ status: false, message: "unknow error." });
      }

      return res.send({ status: true });
    });

    router.post("/count", checkAuth, jsonParser, async (req, res) => {
      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.send({ status: false, message: "page not found." });

        console.log(page);
        return res.send({ status: true, message: "1" });
      } catch (error) {
        return res.send({ status: false, message: "unknow error." });
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/tracker`,
  };
}
