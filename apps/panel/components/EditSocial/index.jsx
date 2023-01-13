import Card from "@components/Card";
import classes from "./style.module.scss";
import Label from "@packages/react-lib/components/Label";
import RadioButton from "@packages/react-lib/components/RadioButton";
import http from "@packages/lib/http";
import { apiUrl } from "@packages/lib/config";
import { useDispatch } from "react-redux";
import { setPageSocialPosition, setPageSocialStyle, setSocialIconColor } from "store/panelSlice";
import ColorInput from "@packages/react-lib/components/ColorInput";
import Input from "@packages/react-lib/components/Input";
import { useCallback, useState } from "react";
import isColor from "@packages/lib/isColor";

function EditSocial({ page }) {
  const dispatch = useDispatch();
  const [iconColor, SetIconColor] = useState(page.styles.social.color);

  const handleOnChangePosition = async (e) => {
    try {
      const response = await http.postWithAuth(`${apiUrl}/social/position`, { body: { position: e.target.value } });

      if (response.status) dispatch(setPageSocialPosition({ position: e.target.value }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeStyle = async (e) => {
    try {
      const response = await http.postWithAuth(`${apiUrl}/social/style`, { body: { style: e.target.value } });

      if (response.status) dispatch(setPageSocialStyle({ style: e.target.value }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconColorOnChange = useCallback((e) => {
    SetIconColor(e.target.value);
  }, []);

  const handleIconColorOnBlur = useCallback(
    (e) => {
      if (!isColor(e.target.value)) return;
      http
        .postWithAuth(`${apiUrl}/social/color`, { body: { color: e.target.value } })
        .then((res) => {
          if (res.status) {
            dispatch(setSocialIconColor(e.target.value));
          }
        })
        .catch((e) => console.log(e));
    },
    [dispatch]
  );

  return (
    <Card title="Social">
      <Label> Social Icons Position</Label>
      <RadioButton
        label="Top"
        value="top"
        onChange={handleOnChangePosition}
        checked={page.styles.social.position == "top"}
      />
      <RadioButton
        label="Bottom"
        value="bottom"
        onChange={handleOnChangePosition}
        checked={page.styles.social.position == "bottom"}
      />

      <Label> Social Icons Style</Label>
      <RadioButton
        label="Color"
        value="color"
        onChange={handleOnChangeStyle}
        checked={page.styles.social.style == "color"}
      />
      <RadioButton
        label="Outline"
        value="outline"
        onChange={handleOnChangeStyle}
        checked={page.styles.social.style == "outline"}
      />
      <RadioButton
        label="Fill"
        value="fill"
        onChange={handleOnChangeStyle}
        checked={page.styles.social.style == "fill"}
      />

      <Label>Social Icons Color</Label>
      <div className={classes.colorCell}>
        <ColorInput
          value={iconColor}
          onChange={handleIconColorOnChange}
          className={classes.iconColor}
          id="icon-color"
          name="icon-color"
          onBlur={handleIconColorOnBlur}
        />
        <Input
          value={iconColor}
          className={classes.colorTextInput}
          onChange={handleIconColorOnChange}
          onBlur={handleIconColorOnBlur}
        />
      </div>
    </Card>
  );
}

export default EditSocial;
