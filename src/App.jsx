// App.jsx

import './Styles/App.css';
import "./Styles/AppStyles.css";
import "./Styles/Card.css";
import { useState } from "react";
import RenderListAndDict from "./NewCompos/Render/RenderListAndDict";
import VideoBackground from "./VideoBackground";

// 👉 custom hook fetch backend
import useCardpacks from "./NewCompos/hooks/useCardpacks";

// 👉 Lobby đã tách riêng
import CardPackLobby from "./NewCompos/displays/Lobby";

function App() {
  const { cardpacks, loading, error } = useCardpacks();

  // 🎮 Game-level state (App quản lý)
  const [rollResult, setRollResult] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [hideContent, setHideContent] = useState("show");
  const [SelectedDeck, setSelectedDeck] = useState(null);

  // 📊 Global accumulated result
  const [totalDict, setTotalDict] = useState({});
  const [total_packopened, settotal_packopened] = useState(0);

  // ❌ Không render lobby khi load / error
  if (loading) {
    return <div style={{ color: "white", textAlign: "center" }}>Loading card packs...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>Failed to load card packs</div>;
  }

  return (
    <div>
      <div className="full-background" />

      <div
        className={`main-content ${hideContent}`}
        style={hideContent === "hide"
          ? { "--cardpack-effect": SelectedDeck?.Effect }
          : {}
        }
      >
        <div
          style={{
            fontSize: "4em",
            color: "#fff700",
            WebkitTextStroke: "2px #0000ff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          River of Cards
        </div>

        {/* 👉 Lobby chỉ nhận data + callback */}
        <CardPackLobby
          cardpacks={cardpacks}
          totalDict={totalDict}
          total_packopened={total_packopened}
          onRoll={(card, result) => {
            // ⬇️ Toàn bộ logic sau khi roll giữ ở App
            setSelectedDeck(card);
            setRollResult(result);
            setPlayVideo(true);
            setVideoEnded(false);
            setHideContent("hide");
            settotal_packopened(prev => prev + 1);

            setTotalDict(prev => {
              const newDict = { ...prev };
              Object.entries(result.dict).forEach(([key, value]) => {
                newDict[key] = (newDict[key] || 0) + value;
              });
              return newDict;
            });
          }}
        />
      </div>

      {playVideo && SelectedDeck && (
        <VideoBackground
          onEarlyEnd={() => setVideoEnded(true)}
          onEnded={() => {
            setHideContent("show");
            setPlayVideo(false);
          }}
          IntroVideo={SelectedDeck.Intro.replace(/ /g, "%20")}
        />
      )}

      {rollResult && videoEnded && (
        <RenderListAndDict
          list={rollResult.list}
          dict={rollResult.dict}
          unpackList={rollResult.list}
          onClose={() => {
            setRollResult(null);
            setHideContent("appear");
          }}
        />
      )}
    </div>
  );
}

export default App;
