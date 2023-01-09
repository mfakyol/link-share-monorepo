import { apiUrl } from "@packages/lib/config";
import LinkList from "./LinkList";
import http from "@packages/lib/http";
import classes from "./style.module.scss";
import { setPageLinks } from "store/panelSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useState, useEffect } from "react";

function Links() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.panel.page);

  const [links, setLinks] = useState();

  useEffect(() => {
    setLinks([...page.links]);
  }, [page]);

  const handleAddNewLink = useCallback(async () => {
    try {
      const response = await http.postWithAuth(`${apiUrl}/link/create`).then((res) => res.json());

      if (response.status) dispatch(setPageLinks(response.data.links));
      //will error alert
      else console.log(response);
    } catch (error) {}
  }, [dispatch]);

  return (
    page && (
      <div className={classes.linksWrapper}>
        <button className={classes.addLinkButton} onClick={handleAddNewLink}>
          Add New Link
        </button>
        <LinkList links={links} setLinks={setLinks} />
      </div>
    )
  );
}

export default Links;
