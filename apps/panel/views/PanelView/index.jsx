import Links from "./Links";
import Social from "./Social";
import Settings from "./Settings";
import Appearance from "./Appearance";
import { apiUrl, pageUrl } from "@packages/lib/config";
import uniqueId from "@packages/lib/uniqueId";
import http from "@packages/lib/http";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import classes from "./style.module.scss";
import { setPage } from "store/panelSlice";
import Router, { useRouter } from "next/router";
import PanelNavbar from "@components/PanelNavbar";
import { useEffect, useState, useRef } from "react";
import CloseIcon from "@packages/react-lib/icons/CloseIcon";

function PanelView() {
  const iframeRef = useRef();
  const [iFrameKey, setIFrameKey] = useState(uniqueId());
  const page = useSelector((state) => state.panel.page);
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    http
      .getWithAuth(`${apiUrl}/page/withAuth`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          dispatch(setPage(res.data.page));
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (router.isReady && !router.query.tab) Router.push("/panel/links");
  }, [router.query.tab, router.isReady]);

  useEffect(() => {
    if (showPreview) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showPreview]);

  useEffect(() => {
    if (iframeRef.current) {
      setIFrameKey(uniqueId());
    }
  }, [page]);

  return (
    <div className={classes.panel}>
      <PanelNavbar />

      {page && (
        <main className={classes.panelContent}>
          <div className={classes.settings}>
            {router.query.tab == "links" && <Links />}
            {router.query.tab == "appearance" && <Appearance />}
            {router.query.tab == "settings" && <Settings />}
            {router.query.tab == "social" && <Social />}
          </div>
          <div className={`${classes.demo} ${showPreview ? classes.show : ""}`}>
            <div className={classes.demoContentWrapper}>
              <div className={`${classes.demoContent} hideScrollbar`}>
                <iframe
                  key={iFrameKey}
                  ref={iframeRef}
                  className={`${classes.iframe} hideScrollbar`}
                  src={`${pageUrl}/${page.endPoint}`}
                />
              </div>
            </div>
          </div>
          <div className={`${classes.previewButtonWrapper} ${showPreview ? classes.close : ""}`}>
            <button className={classes.previewButton} onClick={() => setShowPreview((prev) => !prev)}>
              {showPreview ? <CloseIcon className={classes.closeIcon} /> : "Preview"}
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default PanelView;
