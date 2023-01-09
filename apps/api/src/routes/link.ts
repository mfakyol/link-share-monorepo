import express from "express";
import bodyParser from "body-parser";
import LinkModel from "../models/link.model";
import PageModel from "../models/page.model";
import checkAuth from "../middlewares/checkAuth";

export default function LinkRouter() {
  const jsonParser = bodyParser.json();

  const route = () => {
    const router = express.Router();

    router.post("/reorder", checkAuth, jsonParser, async (req, res) => {
      const { reorderedLinkIds } = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.links = reorderedLinkIds.reduce((acc: any, linkId: any) => {
          const link = page.links.find((l: any) => l._id.toString() == linkId)
          if (link) acc.push(link)
          return acc
        }, [])

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/create", checkAuth, async (req, res) => {
      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });
        const newLink = new LinkModel({ isValid: false });
        page.links = [newLink, ...page.links];

        const savedPage = await page.save();

        const links = savedPage.links.filter((l: any) => !l.removed);

        return res.status(200).json({ status: true, data: { links } });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/update", checkAuth, jsonParser, async (req, res) => {
      const link = req.body;

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        const tempLink = page.links.find((l: any) => l._id.toString() == link._id);
        if (!tempLink) return res.status(200).json({ status: false, message: "Link not found." });
        tempLink.title = link.title;
        tempLink.href = link.href;
        tempLink.show = link.show;
        tempLink.isValid = link.isValid;

        page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/toggleHide", jsonParser, async (req, res) => {
      const { linkId } = req.body;
      return res.status(200).json({ status: true, data: { linkId } });
    });

    router.post("/remove", checkAuth, jsonParser, async (req, res) => {
      const { linkId } = req.body;
      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        const tempLink = page.links.find((l: any) => l._id.toString() == linkId);
        tempLink.removed = true;

        page.save();

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
    routerPrefix: `/link`,
  };
}
