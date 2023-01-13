import express from "express";
import bodyParser from "body-parser";
import PageModel from "../models/page.model";
import checkAuth from "../middlewares/checkAuth";
import SocialModel from "../models/social.model";

export default function SocialRouter() {
  const jsonParser = bodyParser.json();

  const route = () => {
    const router = express.Router();

    router.post("/", checkAuth, jsonParser, async (req, res) => {
      const { type, href } = req.body;


      if (!type || !href) return res.status(200).json({ status: false, message: "type and href requred in body." });

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        const isExist = page.socials.some((social: any) => social.type == type);

        if (isExist) return res.status(200).json({ status: false, message: "This social already exit in this page." });

        const social = new SocialModel({ type, href });
        page.socials.push(social);

        const savedPage = await page.save();

        if (!savedPage) return res.status(200).json({ status: false, message: "Unknown error occured." });

        return res.status(200).json({ status: true, socials: savedPage.socials });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });


    router.post("/reorder", checkAuth, jsonParser, async (req, res) => {
      const { reorderedSocials } = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.socials = reorderedSocials;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/show", checkAuth, jsonParser, async (req, res) => {
      const { id, show } = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        const index = page.socials.findIndex((social: any) => social._id == id);
        if (index == -1) return res.status(200).json({ status: false, message: "Social not exist." });

        page.socials[index].show = show;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/position", checkAuth, jsonParser, async (req, res) => {
      const { position } = req.body;
      if (!["top", "bottom"].some(p => p == position)) return res.status(200).json({ status: false, message: "Invalid position." });
      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.social.position = position;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });
    router.post("/style", checkAuth, jsonParser, async (req, res) => {
      const { style } = req.body;

      if (!["outline", "color", "fill"].some(s => s == style)) return res.status(200).json({ status: false, message: "Invalid style." });
      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.social.style = style;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/color", checkAuth, jsonParser, async (req, res) => {
      const { color } = req.body;
      if (!color) return res.status(200).json({ status: false, message: "Color required." });
      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.social.color = color;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    })

    return router;
  };

  return {
    route,
    routerPrefix: `/social`,
  };
}
