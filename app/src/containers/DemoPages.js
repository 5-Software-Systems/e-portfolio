import React from "react";
import { useHistory } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import ArrowBack from "@material-ui/icons/ArrowBack";
import "../styles/ePortfolio-widgets.css";
import "../styles/resizable-styles.css";
import "../fonts/roboto/Roboto-Black.ttf";

import MotherWidget from "../components/Widgets/MotherWidget.js";

const ReactGridLayout = WidthProvider(Responsive);

const width = 242;
const height = 242;
const columns = 5;

export default function EPortfolioDemo() {
  const URL = window.location.href.split("/");
  const PID = URL[URL.length - 1];
  const history = useHistory();

  function switchPage(PID) {
    switch (PID) {
      case "echidna":
        return <Echidna />;
      case "demo":
        return <Demo />;
      case "calvin":
        return <Calvin />;
      case "team":
        return <Team />;
      case "tutorial":
        return <Tutorial />;
      default:
        history.push("/404");
        return;
    }
  }

  return (
      <div className="eportfolioBody">
        <header className="header">
          <button
            className="addWidgetButton"
            onClick={() => {
              window.location.href = "/help";
            }}
          >
            <ArrowBack />
          </button>
          <h1 className="impact">{PID}</h1>
          <p></p>
        </header>
        <div className="container">
        {switchPage(PID)}
        </div>
      </div>
  );
}

//example pages are below --------------------------------------------------------------------------------------------------------------------------------

function Echidna() {

  const widgets = [
    {
      public_id: "5ee15077-b8ab-4f54-b6e0-8029b120729f",
      type: "embed",
      location: [5, 3, 0, 2],
      data: {
        external_url: "https://www.youtube.com/embed/yHjdIXN9v2g",
      },
    },
    {
      public_id: "21f0c5a2-5d0d-4b55-970b-acd6bcb8cabd",
      type: "about",
      location: [1, 1, 0, 0],
      data: {
        about:
          '{"blocks":[{"key":"9ouf5","text":"This is an Echidna","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1d33n","text":"They are found in Australia ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e4s31","text":"They are mammals, but lay eggs.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c3n7e","text":"Source","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":6,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://en.wikipedia.org/wiki/Echidna","className":"MUIRichTextEditor-anchorLink-34"}}}}',
      },
    },
    {
      public_id: "78d20930-82be-40e6-bdea-90898cd5ceef",
      type: "about",
      location: [1, 1, 0, 1],
      data: {
        about:
          '{"blocks":[{"key":"b9h59","text":"The Echidna is on the Australian five cent coin. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"81qlk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1iv2l","text":"Our team is called FiveCent Software Systems.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f0ir2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"65m6r","text":"Thus, we named this service Echidna.  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":28,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "da500317-cd3d-47f3-bd19-704221460ee6",
      type: "image",
      location: [4, 2, 1, 0],
      data: {
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Short-beaked_echidna_in_ANBG.jpg/1920px-Short-beaked_echidna_in_ANBG.jpg",
      },
    },
  ];

  return (
      <ReactGridLayout
        className="layout"
        rowHeight={height}
        width={columns * width}
        margin={[10, 10]}
        compactType={null}
        isDraggable={false}
        isResizable={false}
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
            <MotherWidget widget={widget} />
          </div>
        ))}
      </ReactGridLayout>
  );
}

function Demo() {

  return (
      <ReactGridLayout
        className="layout"
        rowHeight={height}
        width={columns * width}
        margin={[10, 10]}
        compactType="horizontal"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
      >
        <div key="a" data-grid={{ i: "a", x: 3, y: 1, w: 1, h: 2 }}>
          <img
            src={process.env.PUBLIC_URL + "/images/galaxy.gif"}
            alt="galaxy"
            draggable="false"
            height="100%"
          />
        </div>
        <div key="b" data-grid={{ i: "b", x: 4, y: 1, w: 1, h: 3 }}>
          <iframe
            width="100%"
            height="100%"
            title="embed1"
            src="https://www.youtube.com/embed/aoKwNx3yr-w?autoplay=0&loop=1&color=white"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div key="c" data-grid={{ i: "c", x: 0, y: 4, w: 2, h: 1 }}>
          <img
            src={
              "https://media1.tenor.com/images/8daeb547b121eef5f34e7d4e0b88ea35/tenor.gif?itemid=5156041"
            }
            alt={"bruhmoment"}
            height="100%"
            draggable="false"
          />
        </div>
        <div key="d" data-grid={{ i: "d", x: 1, y: 1, w: 2, h: 1 }}>
          <img
            src={
              "https://media1.tenor.com/images/48d0355da1b5b8ebd414323806ac2a7f/tenor.gif?itemid=13271320"
            }
            alt={"damn"}
            height="100%"
            draggable="false"
          />
        </div>
        <div key="e" data-grid={{ i: "e", x: 1, y: 2, w: 2, h: 1 }}>
          <img
            src={"https://data.whicdn.com/images/286894498/original.gif"}
            alt={"scarce"}
            height="100%"
            draggable="false"
          />
          <p>hey whats up guys its scarce here</p>
        </div>
        <div key="f" data-grid={{ i: "f", x: 2, y: 3, w: 2, h: 1 }}>
          <iframe
            width="100%"
            height="100%"
            title="embed2"
            src="https://www.youtube.com/embed/G7RgN9ijwE4?color=white"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>hey this is pretty cool</p>
        </div>
        <div key="g" data-grid={{ i: "g", x: 0, y: 0, w: 1, h: 3 }}>
          <iframe
            width="100%"
            height="100%"
            title="embed3"
            src="https://open.spotify.com/embed/playlist/1nvxlaARYE1MMzeEfKgm1R"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
          <p>hey this is pretty cool</p>
        </div>
        <div key="h" data-grid={{ i: "h", x: 1, y: 0, w: 1, h: 1 }}>
          <img
            src={process.env.PUBLIC_URL + "/images/what.gif"}
            alt={"bruhmoment"}
            width={width}
            draggable="false"
          />
        </div>
        <div key="i" data-grid={{ i: "i", x: 2, y: 0, w: 3, h: 1 }}>
          <h1> Welcome to My Page! </h1>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
          </p>
        </div>
        <div key="gj" data-grid={{ i: "j", x: 0, y: 0, w: 1, h: 3 }}>
          <iframe
            width="100%"
            height="100%"
            title="embed4"
            src="https://embed.music.apple.com/au/album/future-nostalgia/1495799403"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
          <p>hey this is pretty cool</p>
        </div>
      </ReactGridLayout>
  );
}

function Calvin() {

  const widgets = [
    {
      public_id: "ce8f4405-7da8-4892-8af3-64b781908b63",
      type: "image",
      location: [2, 1, 1, 0],
      data: {
        image_url:
          "https://media.discordapp.net/attachments/198751173967216640/767647617462173736/Picture_2.png",
      },
    },
    {
      public_id: "aeabb5d9-daa2-4381-ae00-7f21a3351654",
      type: "about",
      location: [1, 1, 0, 0],
      data: {
        about:
          '{"blocks":[{"key":"fsk7q","text":"Calvin","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2ea43","text":"Developer at FiveCent Software Systems 💻","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":12,"length":27,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"dst4u","text":"He/Him ♂️","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":7,"length":2,"key":0}],"data":{}},{"key":"4cdrj","text":"21 years old  🔞","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"blk1i","text":"3rd year university student ✨","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4uqhk","text":"Leo ♌","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://emojipedia.org/male-sign/","url":"https://emojipedia.org/male-sign/"}}}}',
      },
    },
    {
      public_id: "58e27e33-6e6b-4a08-9060-c4306202a58c",
      type: "about",
      location: [1, 1, 3, 0],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"Likes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1lt1e","text":"Essendon 🔴⚫","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"59o5l","text":"Rain 🌧","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fnnhj","text":"Blue Cheese 🧀","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cog2m","text":"Dislikes ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"68hn8","text":"Summer ☀","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"acgt6","text":"Seafood 🦞","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9jhjb","text":"Fabrice 🙅‍♂️","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "7b188eb2-a1c4-4468-95ad-15554e3caa94",
      type: "embed",
      location: [1, 2, 0, 1],
      data: {
        external_url:
          "https://open.spotify.com/embed/album/5WpDQt6EbpzXbqo9g9P0L6",
      },
    },
    {
      public_id: "5996fea4-a010-4dec-8a9b-afee9d9f8ec6",
      type: "embed",
      location: [2, 1, 2, 1],
      data: {
        external_url: "https://www.youtube.com/embed/dGcsHMXbSOA",
      },
    },
    {
      public_id: "7778cb18-263e-4b5d-a205-4bfe700c8621",
      type: "image",
      location: [2, 1, 1, 2],
      data: {
        image_url: "https://i.giphy.com/media/vXeeHUPxgBtp6/giphy.webp",
      },
    },
    {
      public_id: "b9612117-061e-465b-8598-1dadd150b5f9",
      type: "about",
      location: [1, 1, 1, 1],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"                                     ↑","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ns4m","text":"                                    Me","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"16h20","text":"<--- Album I was listening to making this portfolio","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e3mbs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6ncc0","text":"This guy showed me how to write this program ---> ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"113da","text":"I wish I could retire, boy that\'d be sweet. ","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6g41k","text":"                                      ↓","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "154e06c2-e6f3-43b9-97c9-2a263455a194",
      type: "about",
      location: [1, 1, 3, 2],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dvf2u","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1hpm9","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5623p","text":"The man who moves a mountain begins by carring small stones.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3ut8j","text":"- Calvin :)","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
  ];

  return (
      <ReactGridLayout
        className="layout"
        rowHeight={height}
        width={columns * width}
        margin={[10, 10]}
        compactType={null}
        isDraggable={false}
        isResizable={false}
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
            <MotherWidget widget={widget} />
          </div>
        ))}
      </ReactGridLayout>
  );
}

function Team() {

  const widgets = [
    {
      public_id: "99a00e59-edfe-4e9a-8a3e-9a8db73bda5e",
      type: "image",
      location: [1, 1, 1, 1],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/198751173967216640/767647617462173736/Picture_2.png",
      },
    },
    {
      public_id: "77dc2309-1ccc-4b50-9ecc-a18568541c18",
      type: "image",
      location: [1, 1, 2, 1],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/198751173967216640/767647241804447744/23012007.jpg",
      },
    },
    {
      public_id: "786749a9-3e34-4cef-9fc1-b8a061d30784",
      type: "image",
      location: [1, 1, 4, 1],
      data: {
        image_url:
          "https://scontent.fmel7-1.fna.fbcdn.net/v/t1.0-9/530510_302333113218573_660232513_n.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=YS-FBOydiHIAX87ARSh&_nc_ht=scontent.fmel7-1.fna&oh=0648eab25585b31ab70f8c4b745a24d5&oe=5FB6A98D",
      },
    },
    {
      public_id: "986420b4-5eeb-46d2-82f3-6a923af588dd",
      type: "about",
      location: [1, 1, 4, 0],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fdtbd","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d6v6k","text":"           Fraser","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "5c2b5781-2a5c-41aa-88e8-6778b06bb9ed",
      type: "about",
      location: [1, 1, 3, 0],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"97for","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4r312","text":"         Marcus","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "27938ff1-ec1f-45f3-9abc-1e7def3ac134",
      type: "about",
      location: [1, 1, 2, 0],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"av1vp","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"281j6","text":"         Fabrice","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "d35c35c7-333f-4fc8-baae-44c0d84de46e",
      type: "about",
      location: [1, 1, 1, 0],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8tb6c","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"59jcj","text":"          Calvin","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "563e5611-ab2f-4a34-9465-2103165de799",
      type: "about",
      location: [1, 1, 0, 0],
      data: {
        about:
          '{"blocks":[{"key":"fsk7q","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c4q15","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"197q0","text":"         Nathan","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "634aa341-2032-4049-a53c-6fdc8730759f",
      type: "image",
      location: [1, 1, 0, 1],
      data: {
        image_url:
          "https://lh3.googleusercontent.com/5Cs4eIvfdilsa41Y-mY0L3yIRLEkVZ1bTGAlNfzi9_AUigbtjqGH3T9qibydd_u1ojabUr5cZ1bNfmDNLYrVlYbyjWZlO_m55WqTejKsmP80Cwo5ztsNIs6v8hGjKfpQnlvJb2ln0VIHyCvcmsJjLgiSPkQA7e4FrBY3rlHHrxzPQRRSAqFXQDnGXFKG41cDKPJctjAzd3SjTjX74inhWG02vtuLY5ZMUc7cv4OW0tZ7CtRn0qWg9I0EquHwiQ1ha35yvfEfbvXnQdyNCQDypGPf5qLu76IN0xZVnKGu6PN8ZBTna-D5C8DB-Pe7PFF8LiFXTIgUUI0pO2JuJYw1rpsLHv2DpdsIYuSUKQ1DXdgIsUiBmbQVRTDZ3AUP9dVEmudQVFde_dIA-PYKEULFG9WDIGOeyOusmAAyQtQNVAg13ZyVslUsOD3oZIs-zJTy8Wp_8sfR2Z1A7oS5aFoCppts08ukZx06b1BIJ6cCKuWPB-KEjFzTpM7KozXYuPZWbU72Du9bizyX6zRfNxXYUQLtxXo_VtZYEi1XsXxHOUhuvOlqAlAKtsdY4H0A-fIAapr74tYdEdup9bJWoxz-U4TjOv75k3xWsfcifsY58_mmAMK1NANZO5N_TEFCCcvHPeYvIOrUjJUZIDITEMAjipTGuTjMvodX-gFFNZXt5Olna5DigwqGo7n7RsHvWA=w1258-h943-no?authuser=0",
      },
    },
    {
      public_id: "313b7018-dcb3-4c78-85ea-fd8b6136045e",
      type: "about",
      location: [1, 1, 0, 2],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"Roles","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"b1f29","text":"Frontend 💻","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5nbdf","text":"GitMaster 🔰","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fcnjd","text":"Graphic Designer ✏","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"97b5","text":"Likes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"eurj7","text":"Pancakes 🥞","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aclo4","text":"Dislikes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"c7g8r","text":"Hedgehogs 🦔","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "1b4baa78-2059-4461-8a5d-bc53a197f15b",
      type: "about",
      location: [1, 1, 2, 2],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"Roles","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"7nfql","text":"Frontend 💻","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5rvqv","text":"CSS guy 🅱","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"31dj1","text":"Accountant 🤑","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5n2l","text":"Likes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1nu0o","text":"Watermelon 🍉","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5hf6q","text":"Dislikes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"e732f","text":"CSS  🖕","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":1,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://emojipedia.org/middle-finger/","url":"https://emojipedia.org/middle-finger/"}}}}',
      },
    },
    {
      public_id: "c361a3a2-9c9e-4cd6-b5b1-844130dfd7bc",
      type: "about",
      location: [1, 1, 3, 2],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"Roles","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"86n9p","text":"Backend 💾","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3vg6g","text":"Testing ⭕","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1f3ho","text":"Sound Design 🎚","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6tluu","text":"Likes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"34o3h","text":"The Stone Roses 🎶","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d1147","text":"Dislikes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fvgre","text":"Pointers 👉","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "4ab1aa43-0641-4087-ba62-eac0ffeb9b76",
      type: "about",
      location: [1, 1, 4, 2],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"Roles","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"543vv","text":"Backend 💾","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3njfr","text":"Deployment 📤","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"rsap","text":"Code Monkey 🙈","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5btar","text":"Likes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"dd2ik","text":"Tennis 🎾","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"mnhc","text":"Dislikes ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5icou","text":"Cricket 🏏","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "a345aa8d-066e-4e97-9f7d-393e734703a6",
      type: "about",
      location: [1, 1, 1, 2],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"Roles","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"bri79","text":"Frontend 💻","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dgj2j","text":"ScrumMaster 🏉","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"62iah","text":"Client Contact 🤡","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fv4vr","text":"Likes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"auu4j","text":"Winter ⛄","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f2a4t","text":"Dislikes","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"6t9c1","text":"Presentations 🥺","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "215124a5-ab6a-4012-b4ac-f220b233d031",
      type: "image",
      location: [1, 1, 3, 1],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/198751173967216640/769096707161980968/unknown.png",
      },
    },
    {
      public_id: "9026a10e-e0b0-4dcf-bed0-463b517320e2",
      type: "about",
      location: [5, 1, 0, 3],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dm9il","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f1kba","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bgenk","text":"                                                                Our Client and Requirements","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "b7918b40-41c0-425c-92fe-3709f728407d",
      type: "about",
      location: [3, 1, 1, 4],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cga73","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1tvu2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8361p","text":"A tool which can encapsulate one’s skills, experiences and ideas 💡","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"621p6","text":"Self expressive, more casual than professional 🤠","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eei2d","text":"Multiple portfolios, each with different purposes 🌌","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1udil","text":"Shareable to friends, family, employers, etc 👨‍👩‍👧‍👦","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"534st","text":"Intuitive, concise, secure, refined, epic ✨","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "47ed6828-5cfd-4229-8ecf-9b4dd419a216",
      type: "image",
      location: [1, 1, 0, 4],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/462586268165996546/769912641723301899/Artboard_2.png",
      },
    },
    {
      public_id: "6dbd53a3-c0ae-4b9c-ad34-b27449acc09a",
      type: "image",
      location: [1, 1, 4, 4],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/462586268165996546/769912646241353768/Artboard_2_1.png",
      },
    },
    {
      public_id: "c459545a-7213-4c0b-8876-e0afea64550b",
      type: "image",
      location: [5, 4, 0, 5],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/462586268165996546/769913474310340628/unknown.png",
      },
    },
    {
      public_id: "7fd3a137-9c79-4069-bd07-10ceacc2950d",
      type: "about",
      location: [5, 1, 0, 9],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2t4bo","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"79ac6","text":"                       ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1l1tf","text":"                                                                        Technologies Used","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "48ad35fe-b885-4d65-8396-3bb02fafff09",
      type: "image",
      location: [5, 2, 0, 10],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/462586268165996546/769914201849200650/unknown.png",
      },
    },
    {
      public_id: "something-b885-4d65-8396-3bb02fafff09",
      type: "image",
      location: [5, 2, 0, 12],
      data: {
        image_url:
          "https://lh5.googleusercontent.com/uM9IpsPIXeDsRWYs0sbYp_P6tyYNMSz2YtcWZPrr4KqqGyR8QwE3MK5qy30fHzXGX8MLP6Gq_WTUlKBFJpgvSADIG1eQQ4rPpSYi-7QcKZAEKs_islmdYWOXlJYxh8J17giVCWn_778",
      },
    },
    {
      public_id: "5b56d016-1b79-45e7-953d-cdcb5156c7dc",
      type: "about",
      location: [3, 1, 1, 14],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"etsu7","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"46ui7","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d95e0","text":"                                     Collaboration Tools ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "71653798-d64c-45e5-b4b5-094348b3e36b",
      type: "about",
      location: [1, 1, 0, 14],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"         ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5s9gc","text":"             Slack","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e2c87","text":"Main communication tool","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cde5o","text":"Conversations split into required channels  ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "a5af8be5-d7c4-49c3-9b27-360294372d31",
      type: "about",
      location: [1, 1, 4, 14],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2ak6m","text":"            Zoom","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dl0hr","text":"Major meetings ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d0p40","text":"Meetings with client ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "80b056df-bc60-41a0-b2c3-c7424d7973ce",
      type: "about",
      location: [1, 1, 0, 15],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fa4fs","text":"         Discord","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"72hdh","text":"For quick collaborations ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ff97c","text":"Voice calls ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "a213a84f-9908-42af-847a-b82035ca392d",
      type: "about",
      location: [1, 1, 1, 15],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bchoj","text":"            Trello","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"50ao1","text":"See backlog and progress","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"32ul","text":"Assign tasks","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "497b8509-21d4-42d8-8fed-28461ba0ceec",
      type: "about",
      location: [1, 1, 2, 15],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9snmg","text":"      Google Drive","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9kk3b","text":"Collection of documentation and artifacts","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4iqne","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "05d63a75-e08a-4c3c-a024-f0aae744e486",
      type: "about",
      location: [1, 1, 3, 15],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ajgv","text":"          GitHub","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fu26o","text":"Code repository ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3ko9v","text":"Issues and bugs documentation","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8k7b8","text":"Automatic testing","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "f98a0507-4c0e-40c3-9098-1108cd1a25d0",
      type: "about",
      location: [1, 1, 4, 15],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fui3o","text":"          FunRetro","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fevjk","text":"Retrospectives for sprint reviews ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"85vrj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "fc8490b1-c7d0-4177-8ee4-e7962eff6415",
      type: "about",
      location: [5, 1, 0, 16],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"46j1c","text":"                                 ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"agrh3","text":"                                                                                  Challenges ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "355c33d3-3b1e-495c-a8fe-303508e54786",
      type: "image",
      location: [1, 1, 2, 17],
      data: {
        image_url:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/tired-face_1f62b.png",
      },
    },
    {
      public_id: "f5c1545c-d8cf-44b1-a4de-1551bffe5d93",
      type: "about",
      location: [2, 1, 0, 17],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"                                                   Technical ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":61,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"3p5pi","text":"Adding deployment architecture after creating other architecture 🏠","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3k8ha","text":"Refactoring after new libraries were found 📚","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3fgbl","text":"Learning from scratch 📝","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7bhu0","text":"Code merges and reviews 🤔","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2fp1g","text":"Dependency management 👨‍💼","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5iopa","text":"Bug tracking 🐛","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8gvtl","text":"Automatic testing suddenly broke 😳","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "2eda70e8-29d8-45d9-a160-de34e7e75c66",
      type: "about",
      location: [5, 1, 0, 18],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"lqe2","text":"                          ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9mi7k","text":"                                                                                   Lessons","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "ef95d301-749a-449d-aad9-c18c217a5fe8",
      type: "about",
      location: [2, 1, 3, 17],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"                                         Logistical ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":52,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"donne","text":"Knowing priority of what to do in earlier sprints 🏃‍♀️💨","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9fq53","text":"Some of our workflows took practice and weren’t as laid out until sprint 3 〰","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3fj7u","text":"Communication between teams 💬","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7qqiv","text":"Some client suggestions were out of our scope 🔎","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5pbiu","text":"Time constraints w/ other commitments ⏳","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"pd6a","text":"Working from home 💻","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5mnfq","text":"Negative cash flow 📉","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2st80","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "92d7f969-8963-4f29-b7e9-d9059ee77de1",
      type: "about",
      location: [3, 1, 1, 19],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6g6v1","text":"Wait longer to start coding, more research and planning 📃","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bemkf","text":"Document extensively from the start ✍","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ed8bk","text":"Create a CI/CD pipeline in week one. Look into Dev/Ops a lot more 👀","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dvatp","text":"Create conceptual designs to give us an idea of the final product 💭","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2vb3o","text":"Git conventions took a while to grasp 😓","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"37brr","text":"Use tools to full extent, i.e. Github functions 🛠","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3nvr0","text":"Make tests before implementation ✔","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9nb37","text":"Camera on in tutes 📸","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "4e175480-d36e-4029-b280-b9652f3c0819",
      type: "image",
      location: [1, 1, 0, 20],
      data: {
        image_url:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/grinning-face-with-star-eyes_1f929.png",
      },
    },
    {
      public_id: "1d964a4e-348c-4806-92c0-7ea36cc7de44",
      type: "about",
      location: [3, 1, 1, 20],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8dbdo","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"995ri","text":"                                              Highlights","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"96l4a","text":"                                                    and","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6mest","text":"                                           Cool Features","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "c270d8fe-2dc3-4730-a1c1-8f785fb02982",
      type: "image",
      location: [1, 1, 4, 20],
      data: {
        image_url:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/smiling-face-with-sunglasses_1f60e.png",
      },
    },
    {
      public_id: "ef59f89f-4101-47c6-bf82-2b5bf12d6095",
      type: "about",
      location: [2, 1, 0, 21],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"               Highlights","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":25,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"br6lp","text":"Team cooperation 🤝","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"412n3","text":"Good clients 🥂","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b9hu6","text":"Effective use of tools 🔬","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f4cs6","text":"Documentation 📄","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k1ue","text":"Highly motivated team 💪","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"au00s","text":"Feature workflow 📊","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ibr1","text":"Productive weekly meetings 👨‍❤️‍👨","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2pp1j","text":"Use of labels 🅱","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "dd21b6c3-23a1-495b-9ad3-3c5a76758ba4",
      type: "about",
      location: [2, 1, 3, 21],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"                     Features","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":29,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"chf8q","text":"Drag and drop ⚡","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3cp8k","text":"Resize to any dimension ✂","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4ien1","text":"Rich text editing 🤑","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f59qp","text":"Custom background 😮","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"as942","text":"Secure sharing 🔐","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8bi27","text":"Social media integration 😉🤳","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":25,"length":2,"key":0}],"data":{}},{"key":"5c6eu","text":"Entertainment integration 🎥","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://scoutdigitaltraining.com.au/social-media/emoji-guide-2019/","url":"https://scoutdigitaltraining.com.au/social-media/emoji-guide-2019/"}}}}',
      },
    },
    {
      public_id: "a497ea09-2937-4c3f-837d-0414e8b689ec",
      type: "about",
      location: [5, 1, 0, 22],
      data: {
        about:
          '{"blocks":[{"key":"vg3v","text":"            ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8gfg6","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7kjvh","text":"                                                                    THANKS FOR WATCHING ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    {
      public_id: "8b8d538c-2235-4439-bdf6-11c4e4e38b79",
      type: "image",
      location: [1, 1, 3, 23],
      data: {
        image_url:
          "https://media.tenor.com/images/81282e976a7f44e8fe8308e4c7270d3b/tenor.gif",
      },
    },
    {
      public_id: "f07dedc6-e3c5-436b-a620-cf3a45bde910",
      type: "image",
      location: [1, 1, 4, 23],
      data: {
        image_url:
          "https://media.tenor.com/images/0ad48dccd47d7dccb16f7ec67b102a94/tenor.gif",
      },
    },
    {
      public_id: "87c5f268-9566-4648-8622-4067701c16fb",
      type: "image",
      location: [1, 1, 2, 23],
      data: {
        image_url:
          "https://media.tenor.com/images/0ad48dccd47d7dccb16f7ec67b102a94/tenor.gif",
      },
    },
    {
      public_id: "ca7b93ab-f458-4344-9f87-ff7412f7801b",
      type: "image",
      location: [1, 1, 0, 23],
      data: {
        image_url:
          "https://media.tenor.com/images/0ad48dccd47d7dccb16f7ec67b102a94/tenor.gif",
      },
    },
    {
      public_id: "037345eb-83be-435a-9c32-b668869df3a6",
      type: "image",
      location: [1, 1, 1, 23],
      data: {
        image_url:
          "https://media.tenor.com/images/0ad48dccd47d7dccb16f7ec67b102a94/tenor.gif",
      },
    },
    {
      public_id: "ec004666-6a34-464f-9a18-e0d349165689",
      type: "image",
      location: [1, 1, 2, 21],
      data: {
        image_url:
          "https://cdn.discordapp.com/attachments/462586268165996546/769930066590302221/unknown.png",
      },
    },
    {
      public_id: "4e9827fb-9752-49c6-a058-93873cfc05ab",
      type: "image",
      location: [1, 1, 0, 19],
      data: {
        image_url:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/memo_1f4dd.png",
      },
    },
    {
      public_id: "c26ab7fb-973b-46aa-94a0-2f2cd9e0b737",
      type: "image",
      location: [1, 1, 4, 19],
      data: {
        image_url:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/memo_1f4dd.png",
      },
    },
  ];

  return (
      <ReactGridLayout
        className="layout"
        rowHeight={height}
        width={columns * width}
        margin={[10, 10]}
        compactType={null}
        isDraggable={false}
        isResizable={false}
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
            <MotherWidget widget={widget} />
          </div>
        ))}
      </ReactGridLayout>
  );
}

function Tutorial() {

  return (
      <ReactGridLayout
        className="layout"
        rowHeight={height}
        width={columns * width}
        margin={[10, 10]}
        compactType="horizontal"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
      >
        <div key="a" data-grid={{ i: "a", x: 0, y: 0, w: 1, h: 1 }}>
          <h1> tutorial page </h1> <p>sooper mahreo in riel loife </p>
          <iframe
            width="100%"
            height="100%"
            title="embed1"
            src="https://www.youtube.com/embed/8EQ17_B7kug"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div key="b" data-grid={{ i: "b", x: 1, y: 0, w: 1, h: 1 }}>
          <h1> tutorial video goes here </h1>
        </div>
      </ReactGridLayout>
  );
}
