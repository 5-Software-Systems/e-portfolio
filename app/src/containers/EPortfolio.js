import React, { Fragment, useEffect, useState } from "react";
//-----------dependencies------------------------
import { Responsive, WidthProvider } from "react-grid-layout";
import ArrowBack from "@material-ui/icons/ArrowBack";
import "../styles/ePortfolio-popup.css";
//------------------------------------------------
import { useHistory } from "react-router-dom";
import "../styles/ePortfolio-widgets.css";
import "../styles/resizable-styles.css";
import "../fonts/roboto/Roboto-Black.ttf";
import { isAuthorized } from "../util/cookies";
import { copyToClipboard, get_link } from "../components/EPortfolioPreview";

import MotherWidget from "../components/Widgets/MotherWidget.js";
import EditBox from "../components/EditBox.js";

const ReactGridLayout = WidthProvider(Responsive);

export default function EPortfolio(props) {
  const Auth = isAuthorized();
  const history = useHistory();

  const [user, setUser] = useState();
  const [profile, setProfile] = useState([]);
  const [widgets, setWidget] = useState([]);
  const [movable, setMovable] = useState(true);
  const [editMode, setEditMode] = useState(!props.preview);

  const URL = window.location.href.split("/");
  const PID = URL[URL.length - 1];

  const fetchWidgets = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
    };
    const p_response = await fetch(
      "/api/user/" + user + "/portfolio/" + PID,
      requestOptions
    );
    const p_data = await p_response.json();
    if (p_data.error) {
      history.push("/profile");
      return;
    }
    setProfile(p_data.portfolio);
    setWidget(p_data.portfolio.widget);
  };

  //store db
  useEffect(() => {
    async function initFetch() {
      const requestOptions_user = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth,
        },
      };
      const user_data = await fetch("/api/auth/user", requestOptions_user);
      const user_info = await user_data.json();
      setUser(user_info.public_id);

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth,
        },
      };
      const p_response = await fetch(
        "/api/user/" + user_info.public_id + "/portfolio/" + PID,
        requestOptions
      );
      const p_data = await p_response.json();
      if (p_data.error) {
        history.push("/profile");
        return;
      }
      setProfile(p_data.portfolio);
      setWidget(p_data.portfolio.widget);
    }

    setMovable(true);
    initFetch();
  }, [PID, history, Auth, user]);

  const width = 242;
  const height = 242;
  const columns = 5;

  async function addWidget() {
    const locationA = [1, 1, 0, 0];
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth,
      },
      body: JSON.stringify({
        type: "about",
        location: locationA,
        data: {
          about:
            '{"blocks":[{"key":"vg3v","text":"NewWidget","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      }),
    };
    await fetch(
      "/api/user/" + user + "/portfolio/" + PID + "/widget",
      requestOptions
    );
  }

  async function onLayoutChange(layout, layouts) {
    var i;
    for (i = 0; i < layout.length; i++) {
      const id = layout[i].i;
      const location = [layout[i].w, layout[i].h, layout[i].x, layout[i].y];
      if (!sameArr(widgets[i].location, location)) {
        const requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + Auth,
          },
          body: JSON.stringify({
            location: location,
          }),
        };
        await fetch("/api/user/" + user + "/widget/" + id, requestOptions);
      }
    }
    updateWidgetLocations(layout);
  }

  function sameArr(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  function updateWidgetLocations(layout) {
    var i;
    for (i = 0; i < layout.length; i++) {
      const location = [layout[i].w, layout[i].h, layout[i].x, layout[i].y];
      var wids = widgets;
      wids[i].location = location;
    }
  }

  function switchFalse() {
    setMovable(false);
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function editModeToggleText() {
    if (editMode) {
      return "Switch to Preview";
    }
    return "Switch to Edit";
  }

  function onSettingsUpdate() {
    fetchWidgets();
    setMovable(true);
  }

  return (
    <Fragment>
      <title>{profile.title}</title>
      {/**bg image*/}
      <div
        style={{
          zIndex: "0",
          position: "fixed",
          width: "100%",
          height: "100%",

          backgroundImage: `url(${profile.background_url})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "0px 0px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div className="eportfolioBody">
        <header className="header">
          {!props.preview ? (
            <button
              className="addWidgetButton"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <ArrowBack />
            </button>
          ) : null}

          <h1 className="impact">{profile.title}</h1>

          {editMode ? (
            <button
              className="addWidgetButton"
              onClick={() => {
                addWidget();
                fetchWidgets();
              }}
            >
              Add Widget
            </button>
          ) : (
            <button
              className="addWidgetButton"
              onClick={() => {
                get_link(user, PID, Auth).then((value) =>
                  copyToClipboard(value.link)
                );
              }}
            >
              Share
            </button>
          )}
          {!props.preview ? (
            <button
              className="addWidgetButton"
              onClick={() => {
                toggleEdit();
              }}
            >
              {editModeToggleText()}
            </button>
          ) : null}
        </header>

        <div className="container">
          <ReactGridLayout
            className="layout"
            rowHeight={height}
            width={columns * width}
            margin={[10, 10]}
            compactType={null}
            onLayoutChange={onLayoutChange}
            isDraggable={movable && editMode}
            isResizable={movable && editMode}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
          >
            {widgets.map((widget) => (
              <div
                key={widget.public_id}
                data-grid={{
                  i: widget.public_id,
                  w: widget.location[0],
                  h: widget.location[1],
                  x: widget.location[2],
                  y: widget.location[3],
                }}
              >
                {editMode ? <div className="blocker"></div> : <div></div>}
                <MotherWidget widget={widget} />
                <div className="overlay">
                  {editMode ? (
                    <EditBox
                      PID={widget.public_id}
                      onChange={(e) => onSettingsUpdate()}
                      onOpenSettings={(e) => switchFalse()}
                      widgetLocation={widget.location}
                      widgetType={widget.type}
                      widgetData={widget.data}
                      portfolioID={PID}
                      userID={user}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))}
          </ReactGridLayout>
        </div>
      </div>
    </Fragment>
  );
}
