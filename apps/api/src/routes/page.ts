import express from "express";
import checkAuth from "../middlewares/checkAuth";
import PageModel from "../models/page.model";

export default function PageRouter() {
  const route = () => {
    const router = express.Router();


    router.get("/", async (req, res) => {
      try {
        const { endPoint } = req.query;

        if (!endPoint) {
          res.statusMessage = "endPoint query required.";
          return res.status(400).end();
        }

        const page = await PageModel.findOne({ endPoint });

        if (page) {
          page.links = page.links.filter((l: any) => !l.removed);
          return res.status(200).json({ status: true, data: { page } });
        }
        res.statusMessage = "Page not found.";
        return res.status(404).end();
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.get("/withAuth", checkAuth, async (req, res) => {
      try {
        const page = await PageModel.findById(req.authContext?.pageId);
        if (page) {
          page.links = page.links.filter((l: any) => !l.removed);
          return res.status(200).json({ status: true, data: { page } });
        }
        res.statusMessage = "Page not found.";
        return res.status(404).end();
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.get("/isEndPointExist", async (req, res) => {
      const { endPoint } = req.query;
      if (!endPoint) {
        res.statusMessage = "endPoint query required.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findOne({ endPoint });

        return res.status(200).json({ status: true, data: { isExist: !!page } });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/page`,
  };
}
