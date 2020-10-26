//ligma
import React, { useEffect, useState } from "react";
import { isAuthorized } from "../../util/cookies";
import { FilePopUp } from "../FileUpload";

import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";

export default function GetFields(props) {
  const Auth = isAuthorized();

  const [fields, setFields] = useState([]);
  const [aboutNum, setAboutNum] = useState(0);
  const [text, setText] = useState({});

  useEffect(() => {
    setText(props.defaultData);
  }, [props.defaultData]);

  function setTextList(field, txt) {
    var textOBJ = text;
    textOBJ[field] = txt;
    setText(textOBJ);
    if (props.onChange) {
      props.onChange(textOBJ);
    }
    console.log(text);
  }

  function getDefaultData() {
    if (props.changed != 0) {
      return {};
    }
    return props.defaultData;
  }

  //    function undefinedText(text) {
  //        var output;
  //        if (text === undefined) {
  //            output = '';
  //        } else {
  //            output = text;
  //        }
  //        return output;
  //    }

  useEffect(() => {
    function getFieldRequirementsForEachWidget(data) {
      var i = 0;
      for (i = 0; i < data.length; i++) {
        if (props.type === data[i].type) {
          setFields(data[i].data);
        }
      }
    }

    async function fetchWidgetTypes() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth,
        },
      };
      const response = await fetch("/api/widget/types", requestOptions);
      const data = await response.json();
      getFieldRequirementsForEachWidget(data);
    }

    fetchWidgetTypes();
  }, [props, Auth]);

  useEffect(() => {
    if (props.changed > 0) {
      setText({});
      props.onChange({});
    }

    if (props.type == "about") {
      setAboutNum(props.changed);
    }
  }, [props.type, props.changed]);

  const controls = [
    "undo",
    "redo",
    "title",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "highlight",
    "numberList",
    "bulletList",
    "quote",
    "code",
    "clear",
    "link",
    "media",
  ];

  const inlineControls = ["bold", "italic", "underline", "strikethrough"];

  return (
    <div>
      {Object.keys(fields).map((field) => (
        <div>
          {field}:
          <br />
          {field === "about" ? (
            <MUIRichTextEditor
              controls={controls}
              inlineToolbar={true}
              inlineToolbarControls={inlineControls}
              label="Start typing..."
              defaultValue={getDefaultData()[field]}
              onChange={(e) => {
                if (aboutNum == props.changed)
                  setTextList(
                    field,
                    JSON.stringify(convertToRaw(e.getCurrentContent()))
                  );
              }}
            />
          ) : (
            <textarea
              className="basePageTextBox"
              type="text"
              onChange={(e) => setTextList(field, e.target.value)}
              value={text[field]}
            />
          )}
          <br />
          <br />
        </div>
      ))}
      {imageUpload(props.user)}
      {Hint()}
    </div>
  );

  function Hint() {
    if (props.type === "embed") {
      return (
        <div>
          <h1>DEV ONLY</h1>
        </div>
      );
    }
    if (props.type === "youtube_embed") {
      return (
        <div>
          <p>Put in a YouTube link</p>
          <p>
            i.e. "https://www.youtube.com/watch?v=8EQ17_B7kug" or
            "https://youtu.be/8EQ17_B7kug"{" "}
          </p>
        </div>
      );
    }

    if (props.type === "spotify_embed") {
      return (
        <div>
          <p>Put in a Spotify link</p>
          <p>Go to Spotify, and select "🔗 Copy Song Link"</p>
          <p>
            i.e.
            "https://open.spotify.com/track/6ORqU0bHbVCRjXm9AjyHyZ?si=k-6Pl2SZSLWoeKW4AhUaaA"
            or
            "https://open.spotify.com/artist/1kM5rgJvkiDMOoKX56H6pX?si=FgkDpoNUQNSPi3r1-1NvLQ"{" "}
          </p>
        </div>
      );
    }

    if (props.type === "instagram_embed") {
      return (
        <div>
          <p>Put in a Instagram link</p>
          <p>
            Go to an Instagram post, and copy the URL (make sure to include the
            end '/')
          </p>
          <p>i.e. "https://www.instagram.com/p/CGhNDoKlFAz/" </p>
        </div>
      );
    }

    if (props.type === "twitter_embed") {
      return (
        <div>
          <p>Put in a Twitter link</p>
          <p>Go to an Twitter post, and copy the URL</p>
          <p>
            i.e. "https://twitter.com/jack/status/20" or
            "https://twitter.com/realDonaldTrump/status/1311892190680014849"{" "}
          </p>
        </div>
      );
    }

    if (props.type === "applemusic_embed") {
      return (
        <div>
          <p>Put in an AppleMusic link</p>
          <p>Go to AppleMusic, and select "Copy Link 🔗"</p>
          <p>
            i.e.
            "https://music.apple.com/us/album/crank-that-soulja-boy/1443190317?i=1443190324"
            or "https://music.apple.com/au/album/future-nostalgia/1495799403"{" "}
          </p>
          <p>artist don't work :( </p>
        </div>
      );
    }

    if (props.type === "linkedin_embed") {
      return (
        <div>
          <h1> it dont work </h1>
        </div>
      );
    }
  }

  function imageUpload(user) {
    if (props.type === "image") {
      return (
        <div>
          <FilePopUp
            userID={user}
            setImage={(e) => {
              setTextList("image_url", e);
            }}
          />
        </div>
      );
    }
  }
}
