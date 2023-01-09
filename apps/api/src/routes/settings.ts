import express from "express";
import bodyParser from "body-parser";
import PageModel from "../models/page.model";
import checkAuth from "../middlewares/checkAuth";

export default function SeoRouter() {
  const jsonParser = bodyParser.json();

  const route = () => {
    const router = express.Router();

    router.post("/seo/metaTitle", checkAuth, jsonParser, async (req, res) => {
      const { metaTitle = "" } = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.metaTitle = metaTitle;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/seo/metaDescription", checkAuth, jsonParser, async (req, res) => {
      const { metaDescription = "" } = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.metaDescription = metaDescription;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });
    router.post("/sensitiveContentAgeLimit", checkAuth, jsonParser, async (req, res) => {
      const { sensitiveContentAgeLimit = "" } = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.sensitiveContentAgeLimit = sensitiveContentAgeLimit;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/settings`,
  };
}
